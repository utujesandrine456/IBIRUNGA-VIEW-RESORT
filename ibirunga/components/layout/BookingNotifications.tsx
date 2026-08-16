"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState, useCallback } from "react";
import { BellIcon, XIcon, CheckIcon, CalendarIcon } from "@/components/ui/Icons";
import { api } from "@/lib/api";
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
  type: "approved" | "rejected";
};

const STORAGE_KEY = "ibirunga_booking_email";
const SEEN_KEY = "ibirunga_seen_statuses";

function statusStyle(status: string) {
  if (status === "confirmed" || status === "approved")
    return { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200", label: "Approved" };
  if (status === "rejected" || status === "cancelled")
    return { bg: "bg-red-50", text: "text-red-700", border: "border-red-200", label: "Rejected" };
  return { bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200", label: "Pending" };
}

function fmt(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

export function BookingNotifications() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [bookings, setBookings] = useState<MyBooking[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [toasts, setToasts] = useState<Toast[]>([]);
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
      const isDecided = b.status === "confirmed" || b.status === "approved" ||
        b.status === "rejected" || b.status === "cancelled";

      if (isDecided && prevStatus !== b.status) {
        const type = b.status === "confirmed" || b.status === "approved" ? "approved" : "rejected";
        newToasts.push({
          id: `${b.id}-${b.status}-${Date.now()}`,
          bookingId: b.id,
          message: type === "approved"
            ? `Your booking for ${fmt(b.checkIn)} has been approved!`
            : `Your booking for ${fmt(b.checkIn)} was declined.`,
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
    }
  }, []);

  const fetchBookings = useCallback(async (addr: string, silent = false) => {
    if (!addr) return;
    if (!silent) setLoading(true);
    setError("");
    try {
      const data = await api.getMyBookings(addr);
      setBookings(data);
      checkNewStatuses(data);
    } catch {
      if (!silent) setError("Could not load bookings. Check your email and try again.");
    } finally {
      if (!silent) setLoading(false);
    }
  }, [checkNewStatuses]);

  // Restore saved email on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setEmail(saved);
      setInputEmail(saved);
      fetchBookings(saved, true);
    }
  }, [fetchBookings]);

  // Poll every 30s when email is set
  useEffect(() => {
    if (!email) return;
    pollRef.current = setInterval(() => fetchBookings(email, true), 30_000);
    return () => { if (pollRef.current) clearInterval(pollRef.current); };
  }, [email, fetchBookings]);

  // Close panel on outside click
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
    const addr = inputEmail.trim().toLowerCase();
    if (!addr) return;
    setEmail(addr);
    localStorage.setItem(STORAGE_KEY, addr);
    await fetchBookings(addr);
  }

  function handleClear() {
    setEmail("");
    setInputEmail("");
    setBookings([]);
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(SEEN_KEY);
  }

  const unreadCount = bookings.filter((b) => {
    const raw = localStorage.getItem(SEEN_KEY);
    const seen: Record<string, string> = raw ? JSON.parse(raw) : {};
    return !seen[b.id] && (b.status === "confirmed" || b.status === "approved" || b.status === "rejected" || b.status === "cancelled");
  }).length;

  return (
    <>
      {/* Toast stack */}
      <div className="fixed bottom-6 right-6 z-[200] flex flex-col gap-3 pointer-events-none">
        <AnimatePresence>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              className={`pointer-events-auto flex items-start gap-3 rounded-lg px-4 py-3 shadow-xl border max-w-sm ${
                t.type === "approved"
                  ? "bg-emerald-600 border-emerald-500 text-white"
                  : "bg-red-600 border-red-500 text-white"
              }`}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              transition={{ duration: 0.35, ease }}
            >
              <span className="mt-0.5 shrink-0">
                {t.type === "approved"
                  ? <CheckIcon className="h-5 w-5" />
                  : <XIcon className="h-5 w-5" />}
              </span>
              <p className="flex-1 text-sm font-medium leading-snug">{t.message}</p>
              <button
                onClick={() => dismissToast(t.id)}
                className="shrink-0 opacity-70 hover:opacity-100"
                aria-label="Dismiss"
              >
                <XIcon className="h-4 w-4" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Bell button + panel */}
      <div className="relative" ref={panelRef}>
        <motion.button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="relative inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/30 text-white transition-colors hover:border-white/60"
          aria-label="My booking status"
          whileTap={{ scale: 0.92 }}
        >
          <BellIcon className="h-[18px] w-[18px]" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#c19a6b] text-[9px] font-bold text-white">
              {unreadCount}
            </span>
          )}
          {toasts.length > 0 && unreadCount === 0 && (
            <span className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full bg-[#c19a6b] ring-2 ring-[rgba(28,22,18,0.9)]" />
          )}
        </motion.button>

        <AnimatePresence>
          {open && (
            <motion.div
              className="absolute right-0 top-12 z-50 w-80 rounded-xl border border-white/10 bg-[#1c1612] shadow-2xl overflow-hidden"
              initial={{ opacity: 0, y: -8, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.97 }}
              transition={{ duration: 0.25, ease }}
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
                <span className="text-sm font-semibold text-white">My Booking Status</span>
                <button onClick={() => setOpen(false)} className="text-white/50 hover:text-white">
                  <XIcon className="h-4 w-4" />
                </button>
              </div>

              {/* Email form */}
              {!email ? (
                <form onSubmit={handleSubmit} className="px-4 py-4 space-y-3">
                  <p className="text-xs text-white/60 leading-relaxed">
                    Enter the email you used when booking to check your reservation status.
                  </p>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={inputEmail}
                    onChange={(e) => setInputEmail(e.target.value)}
                    required
                    className="w-full rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-sm text-white placeholder-white/40 outline-none focus:border-[#c19a6b] transition-colors"
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-lg bg-[#c19a6b] py-2 text-sm font-semibold text-white hover:bg-[#a8834f] transition-colors disabled:opacity-60"
                  >
                    {loading ? "Checking…" : "Check Status"}
                  </button>
                  {error && <p className="text-xs text-red-400">{error}</p>}
                </form>
              ) : (
                <div>
                  {/* Logged-in state header */}
                  <div className="flex items-center justify-between px-4 pt-3 pb-2">
                    <span className="truncate text-xs text-white/50">{email}</span>
                    <button
                      onClick={handleClear}
                      className="text-xs text-[#c19a6b] hover:text-[#d4aa7d] transition-colors"
                    >
                      Change
                    </button>
                  </div>

                  {/* Bookings list */}
                  <div className="max-h-72 overflow-y-auto px-3 pb-3 space-y-2">
                    {loading && (
                      <div className="py-6 text-center text-xs text-white/40">Loading…</div>
                    )}
                    {!loading && bookings.length === 0 && (
                      <div className="py-6 text-center text-xs text-white/40">
                        No bookings found for this email.
                      </div>
                    )}
                    {!loading && bookings.map((b) => {
                      const s = statusStyle(b.status);
                      return (
                        <div
                          key={b.id}
                          className={`rounded-lg border p-3 ${s.bg} ${s.border}`}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex-1 min-w-0">
                              <p className="truncate text-xs font-semibold text-[#2a1f14]">
                                {b.guestName}
                              </p>
                              <div className="mt-1 flex items-center gap-1 text-[11px] text-[#5a3e28]">
                                <CalendarIcon className="h-3 w-3 shrink-0" />
                                <span>{fmt(b.checkIn)} – {fmt(b.checkOut)}</span>
                              </div>
                              {b.roomType && (
                                <p className="mt-0.5 text-[11px] text-[#5a3e28]">{b.roomType}</p>
                              )}
                            </div>
                            <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${s.text} ${s.bg} border ${s.border}`}>
                              {s.label}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {error && <p className="px-4 pb-3 text-xs text-red-400">{error}</p>}

                  {/* Refresh */}
                  <div className="border-t border-white/10 px-4 py-2">
                    <button
                      onClick={() => fetchBookings(email)}
                      disabled={loading}
                      className="w-full text-center text-xs text-white/40 hover:text-white/70 transition-colors disabled:opacity-40"
                    >
                      {loading ? "Refreshing…" : "↻ Refresh"}
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
