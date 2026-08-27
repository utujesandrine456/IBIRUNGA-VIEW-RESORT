"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { BellIcon, XIcon, CheckIcon, CalendarIcon } from "@/components/ui/Icons";
import { api } from "@/lib/api";
import { normalizePhoneInput } from "@/lib/phone";
import { ease } from "@/lib/motion";

type MyBooking = {
  id: string;
  guestName: string;
  checkIn: string;
  checkOut: string;
  roomType: string | null;
  adults: number;
  children: number;
  status: string;
  createdAt: string;
};

type Toast = {
  id: string;
  bookingId: string;
  message: string;
  type: "approved" | "rejected" | "cancelled";
};

const STORAGE_KEY = "ibirunga_booking_phone";
const SEEN_KEY = "ibirunga_seen_statuses";
const PAGE_SIZE = 4;

function isPendingStatus(status: string) {
  return status.toLowerCase() === "pending";
}

function isConfirmedStatus(status: string) {
  const s = status.toLowerCase();
  return s === "confirmed" || s === "approved";
}

function isCancelledStatus(status: string) {
  return status.toLowerCase() === "cancelled";
}

function isRejectedStatus(status: string) {
  return status.toLowerCase() === "rejected";
}

function sortBookingsForDisplay(bookings: MyBooking[]) {
  const byDate = (a: MyBooking, b: MyBooking) =>
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();

  return [
    ...bookings.filter((b) => isPendingStatus(b.status)).sort(byDate),
    ...bookings.filter((b) => isConfirmedStatus(b.status)).sort(byDate),
    ...bookings.filter((b) => isRejectedStatus(b.status)).sort(byDate),
    ...bookings.filter((b) => isCancelledStatus(b.status)).sort(byDate),
  ];
}

function statusStyle(status: string) {
  const s = status.toLowerCase();
  if (s === "confirmed" || s === "approved") {
    return {
      label: "Confirmed",
      pill: "bg-emerald-100 text-emerald-800 border-emerald-200",
      accent: "border-l-emerald-500",
    };
  }
  // Admin declined the request
  if (s === "rejected") {
    return {
      label: "Rejected",
      pill: "bg-red-100 text-red-800 border-red-200",
      accent: "border-l-red-500",
    };
  }
  // Guest cancelled their own pending request
  if (s === "cancelled") {
    return {
      label: "Cancelled",
      pill: "bg-slate-100 text-slate-700 border-slate-300",
      accent: "border-l-slate-400",
    };
  }
  return {
    label: "Pending",
    pill: "bg-amber-100 text-amber-900 border-amber-200",
    accent: "border-l-amber-500",
  };
}

function fmt(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function BookingNotifications() {
  const [open, setOpen] = useState(false);
  const [phone, setPhone] = useState("");
  const [inputPhone, setInputPhone] = useState("");
  const [bookings, setBookings] = useState<MyBooking[]>([]);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [cancellingId, setCancellingId] = useState<string | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const dismissToast = (id: string) =>
    setToasts((t) => t.filter((x) => x.id !== id));

  const checkNewStatuses = useCallback((fresh: MyBooking[]) => {
    const raw = localStorage.getItem(SEEN_KEY);
    const seen: Record<string, string> = raw ? JSON.parse(raw) : {};
    const newToasts: Toast[] = [];

    for (const b of fresh) {
      const prevStatus = seen[b.id];
      const s = b.status.toLowerCase();
      const isDecided =
        s === "confirmed" ||
        s === "approved" ||
        s === "rejected" ||
        s === "cancelled";

      if (isDecided && prevStatus !== b.status) {
        let type: Toast["type"] = "rejected";
        let message = `Your booking for ${fmt(b.checkIn)} was rejected by the resort.`;

        if (s === "confirmed" || s === "approved") {
          type = "approved";
          message = `Your booking for ${fmt(b.checkIn)} is confirmed!`;
        } else if (s === "cancelled") {
          type = "cancelled";
          message = `Your booking for ${fmt(b.checkIn)} was cancelled.`;
        }

        newToasts.push({
          id: `${b.id}-${b.status}-${Date.now()}`,
          bookingId: b.id,
          message,
          type,
        });
        seen[b.id] = b.status;
      } else if (!prevStatus) {
        seen[b.id] = b.status;
      }
    }

    localStorage.setItem(SEEN_KEY, JSON.stringify(seen));
    if (newToasts.length) {
      setToasts((prev) => [...newToasts, ...prev].slice(0, 5));
      for (const t of newToasts) {
        window.setTimeout(() => {
          setToasts((prev) => prev.filter((x) => x.id !== t.id));
        }, 5000);
      }
    }
  }, []);

  const fetchBookings = useCallback(
    async (number: string, silent = false) => {
      const normalized = normalizePhoneInput(number);
      if (!normalized) return;
      if (!silent) setLoading(true);
      setError("");
      try {
        const data = await api.getMyBookings(normalized);
        setBookings(data);
        setVisibleCount(PAGE_SIZE);
        checkNewStatuses(data);
        if (!silent && data.length === 0) {
          setError("No bookings found for this phone number.");
        }
      } catch {
        if (!silent) {
          setError("Could not load bookings. Check your phone number and try again.");
        }
      } finally {
        if (!silent) setLoading(false);
      }
    },
    [checkNewStatuses],
  );

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setPhone(saved);
      setInputPhone(saved);
      fetchBookings(saved, true);
    }
  }, [fetchBookings]);

  useEffect(() => {
    if (!phone) return;
    pollRef.current = setInterval(() => fetchBookings(phone, true), 30_000);
    return () => {
      if (pollRef.current) clearInterval(pollRef.current);
    };
  }, [phone, fetchBookings]);

  useEffect(() => {
    function handle(e: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, [open]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const normalized = normalizePhoneInput(inputPhone);
    if (!normalized) return;
    setPhone(normalized);
    setInputPhone(normalized);
    localStorage.setItem(STORAGE_KEY, normalized);
    await fetchBookings(normalized);
  }

  async function handleCancelBooking(bookingId: string) {
    if (!phone) return;
    if (!confirm("Cancel this pending booking?")) return;
    setCancellingId(bookingId);
    try {
      await api.cancelMyBooking(bookingId, phone);
      await fetchBookings(phone);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not cancel booking.");
    } finally {
      setCancellingId(null);
    }
  }

  function handleClear() {
    setPhone("");
    setInputPhone("");
    setBookings([]);
    setError("");
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(SEEN_KEY);
  }

  const unreadCount = bookings.filter((b) => {
    const raw = localStorage.getItem(SEEN_KEY);
    const seen: Record<string, string> = raw ? JSON.parse(raw) : {};
    const s = b.status.toLowerCase();
    return (
      !seen[b.id] &&
      (s === "confirmed" ||
        s === "approved" ||
        s === "rejected" ||
        s === "cancelled")
    );
  }).length;

  const sortedBookings = useMemo(() => sortBookingsForDisplay(bookings), [bookings]);
  const visibleBookings = sortedBookings.slice(0, visibleCount);
  const hasMore = sortedBookings.length > visibleCount;

  const pendingCount = sortedBookings.filter((b) => isPendingStatus(b.status)).length;
  const confirmedCount = sortedBookings.filter((b) => isConfirmedStatus(b.status)).length;

  return (
    <>
      <div className="pointer-events-none fixed bottom-6 right-6 z-200 flex flex-col gap-3">
        <AnimatePresence>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              className={`pointer-events-auto flex max-w-sm items-start gap-3 rounded-md border px-4 py-3 shadow-xl ${
                t.type === "approved"
                  ? "border-emerald-500 bg-emerald-600 text-white"
                  : t.type === "cancelled"
                    ? "border-slate-500 bg-slate-700 text-white"
                    : "border-red-500 bg-red-600 text-white"
              }`}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              transition={{ duration: 0.35, ease }}
            >
              <span className="mt-0.5 shrink-0">
                {t.type === "approved" ? (
                  <CheckIcon className="h-5 w-5" />
                ) : (
                  <XIcon className="h-5 w-5" />
                )}
              </span>
              <p className="flex-1 text-sm font-medium leading-snug">{t.message}</p>
              <button
                type="button"
                onClick={() => dismissToast(t.id)}
                className="shrink-0 cursor-pointer opacity-70 hover:opacity-100"
                aria-label="Dismiss"
              >
                <XIcon className="h-4 w-4" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="relative" ref={panelRef}>
        <motion.button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="relative inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-white/30 text-white transition-colors hover:border-white/60"
          aria-label="My booking status"
          whileTap={{ scale: 0.92 }}
        >
          <BellIcon className="h-4.5 w-4.5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#c19a6b] text-[9px] font-bold text-white">
              {unreadCount}
            </span>
          )}
        </motion.button>

        <AnimatePresence>
          {open && (
            <motion.div
              className="absolute right-0 top-12 z-50 w-88 overflow-hidden rounded-md border border-[#ebe7df] bg-white shadow-[0_20px_50px_rgba(0,0,0,0.18)]"
              initial={{ opacity: 0, y: -8, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.97 }}
              transition={{ duration: 0.25, ease }}
            >
              <div className="border-b border-[#efeae3] bg-[#faf8f4] px-4 py-3.5">
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <p className="text-[10px] font-semibold tracking-[0.16em] text-[#6b4423] uppercase">
                      Reservations
                    </p>
                    <p className="text-sm font-bold text-[#1a1410]">My Booking Status</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-[#6b635a] transition hover:bg-[#efeae3]"
                    aria-label="Close"
                  >
                    <XIcon className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {!phone ? (
                <form onSubmit={handleSubmit} className="space-y-3 px-4 py-4">
                  <p className="text-sm leading-relaxed text-[#6b635a]">
                    Enter the phone number you used when booking to see pending and confirmed
                    reservations.
                  </p>
                  <input
                    type="tel"
                    placeholder="+250 ..."
                    value={inputPhone}
                    onChange={(e) => setInputPhone(e.target.value)}
                    required
                    className="w-full rounded-md border border-[#e6e1d8] bg-[#faf9f7] px-3 py-2.5 text-sm text-[#2c2c2c] outline-none transition placeholder:text-[#a8a29a] focus:border-[#6b4423] focus:bg-white focus:ring-2 focus:ring-[#6b4423]/15"
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full cursor-pointer rounded-md bg-[#6b4423] py-2.5 text-sm font-semibold text-white transition hover:bg-[#54341a] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {loading ? "Checking…" : "Check Status"}
                  </button>
                  {error ? <p className="text-xs text-red-600">{error}</p> : null}
                </form>
              ) : (
                <div>
                  <div className="flex items-center justify-between gap-2 border-b border-[#efeae3] px-4 py-2.5">
                    <span className="truncate text-xs font-medium text-[#6b635a]">{phone}</span>
                    <button
                      type="button"
                      onClick={handleClear}
                      className="cursor-pointer text-xs font-semibold text-[#6b4423] hover:text-[#54341a]"
                    >
                      Change
                    </button>
                  </div>

                  {sortedBookings.length > 0 ? (
                    <div className="flex gap-2 border-b border-[#efeae3] px-4 py-2.5">
                      <span className="rounded-md bg-amber-100 px-2 py-0.5 text-[10px] font-bold tracking-wide text-amber-900 uppercase">
                        {pendingCount} Pending
                      </span>
                      <span className="rounded-md bg-emerald-100 px-2 py-0.5 text-[10px] font-bold tracking-wide text-emerald-800 uppercase">
                        {confirmedCount} Confirmed
                      </span>
                    </div>
                  ) : null}

                  <div className="max-h-80 space-y-2.5 overflow-y-auto px-3 py-3">
                    {loading ? (
                      <div className="space-y-2.5 py-2">
                        {[1, 2].map((i) => (
                          <div
                            key={i}
                            className="h-20 animate-pulse rounded-md border border-[#efeae3] bg-[#faf8f4]"
                          />
                        ))}
                      </div>
                    ) : null}

                    {!loading && sortedBookings.length === 0 ? (
                      <div className="rounded-md border border-dashed border-[#e6e1d8] bg-[#faf8f4] px-4 py-8 text-center">
                        <p className="text-sm font-medium text-[#6b635a]">No bookings found</p>
                        <p className="mt-1 text-xs text-[#9a948c]">
                          Try the exact number used when booking, including country code.
                        </p>
                      </div>
                    ) : null}

                    {!loading &&
                      visibleBookings.map((b) => {
                        const s = statusStyle(b.status);
                        const canCancel = isPendingStatus(b.status);
                        return (
                          <div
                            key={b.id}
                            className={`rounded-md border border-[#efeae3] border-l-4 bg-white p-3 shadow-sm ${s.accent}`}
                          >
                            <div className="flex items-start justify-between gap-2">
                              <div className="min-w-0 flex-1">
                                <p className="truncate text-sm font-semibold text-[#1a1410]">
                                  {b.guestName}
                                </p>
                                <div className="mt-1.5 flex items-center gap-1.5 text-xs text-[#6b635a]">
                                  <CalendarIcon className="h-3.5 w-3.5 shrink-0 text-[#6b4423]/70" />
                                  <span>
                                    {fmt(b.checkIn)} – {fmt(b.checkOut)}
                                  </span>
                                </div>
                                {b.roomType ? (
                                  <p className="mt-1 text-xs text-[#6b635a]">{b.roomType}</p>
                                ) : null}
                                <p className="mt-1 text-[11px] text-[#9a948c]">
                                  {b.adults} adult{b.adults !== 1 ? "s" : ""}
                                  {b.children > 0
                                    ? ` · ${b.children} child${b.children !== 1 ? "ren" : ""}`
                                    : ""}
                                </p>
                              </div>
                              <span
                                className={`shrink-0 rounded-md border px-2 py-0.5 text-[10px] font-bold tracking-wide uppercase ${s.pill}`}
                              >
                                {s.label}
                              </span>
                            </div>
                            {canCancel ? (
                              <button
                                type="button"
                                onClick={() => handleCancelBooking(b.id)}
                                disabled={cancellingId === b.id}
                                className="mt-3 w-full cursor-pointer rounded-md border border-slate-300 bg-white py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                              >
                                {cancellingId === b.id ? "Cancelling…" : "Cancel booking"}
                              </button>
                            ) : null}
                          </div>
                        );
                      })}
                  </div>

                  {error && sortedBookings.length === 0 ? (
                    <p className="px-4 pb-2 text-xs text-red-600">{error}</p>
                  ) : null}

                  {!loading && hasMore ? (
                    <div className="border-t border-[#efeae3] px-4 py-2.5">
                      <button
                        type="button"
                        onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
                        className="w-full cursor-pointer rounded-md border border-[#e6e1d8] bg-[#faf8f4] py-2.5 text-center text-sm font-semibold text-[#6b4423] transition hover:border-[#6b4423]/30 hover:bg-white"
                      >
                        Load more ({sortedBookings.length - visibleCount} remaining)
                      </button>
                    </div>
                  ) : null}

                  <div className="border-t border-[#efeae3] px-4 py-2.5">
                    <button
                      type="button"
                      onClick={() => fetchBookings(phone)}
                      disabled={loading}
                      className="w-full cursor-pointer rounded-md py-1.5 text-center text-xs font-semibold text-[#6b4423] transition hover:bg-[#faf8f4] disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      {loading ? "Refreshing…" : "↻ Refresh status"}
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
