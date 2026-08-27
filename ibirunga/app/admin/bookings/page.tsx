"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { AdminButton, AdminCard, AdminPanel } from "@/components/admin/AdminUi";
import { api } from "@/lib/api";
import type { Booking } from "@/lib/cms-types";

function formatDate(value: string) {
  return new Date(value).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function StatusBadge({ status }: { status: string }) {
  const s = status.toLowerCase();
  const styles: Record<string, string> = {
    pending: "bg-amber-50 text-amber-800 border-amber-200",
    confirmed: "bg-emerald-50 text-emerald-800 border-emerald-200",
    // Guest cancelled their own pending request
    cancelled: "bg-slate-100 text-slate-700 border-slate-300",
    // Admin declined the request
    rejected: "bg-red-50 text-red-700 border-red-200",
  };
  const labels: Record<string, string> = {
    pending: "Pending",
    confirmed: "Confirmed",
    cancelled: "Cancelled",
    rejected: "Rejected",
  };
  return (
    <span
      className={`rounded-full border px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide ${
        styles[s] ?? "bg-gray-50 text-gray-600 border-gray-200"
      }`}
    >
      {labels[s] ?? status}
    </span>
  );
}

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const data = await api.admin.bookings.list();
      setBookings(data);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Failed to load bookings";
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function updateStatus(id: string, status: string) {
    try {
      await api.admin.bookings.updateStatus(id, status);
      const message =
        status === "confirmed"
          ? "Booking confirmed"
          : status === "rejected"
            ? "Booking rejected"
            : "Booking updated";
      toast.success(message);
      await load();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to update booking");
    }
  }

  async function remove(id: string) {
    if (!confirm("Delete this booking?")) return;
    try {
      await api.admin.bookings.remove(id);
      toast.success("Booking deleted");
      await load();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to delete booking");
    }
  }

  return (
    <AdminPanel title="Bookings" description="View and manage guest booking requests from the website.">
      <AdminCard>
        {loading ? (
          <p className="py-8 text-center text-sm text-muted">Loading bookings...</p>
        ) : error ? (
          <div className="py-6 text-center">
            <p className="text-sm text-red-600">{error}</p>
            <AdminButton type="button" onClick={load}>
              Retry
            </AdminButton>
          </div>
        ) : bookings.length === 0 ? (
          <p className="py-8 text-center text-sm text-muted">No booking requests yet.</p>
        ) : (
          <div className="space-y-4">
            {bookings.map((booking) => (
              <div
                key={booking.id}
                className="rounded-md border border-border bg-[#faf9f7] p-4"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-base font-bold text-brown-deep">{booking.guestName}</h3>
                      <StatusBadge status={booking.status} />
                    </div>
                    <p className="mt-1 text-sm text-muted">
                      {booking.phone}
                    </p>
                  </div>
                  <p className="text-xs text-muted">
                    {formatDate(booking.createdAt)}
                    {booking.source ? ` · ${booking.source}` : ""}
                  </p>
                </div>

                <div className="mt-3 grid gap-2 text-sm text-brown-deep sm:grid-cols-2 lg:grid-cols-4">
                  <p>
                    <span className="text-muted">Check in:</span> {formatDate(booking.checkIn)}
                  </p>
                  <p>
                    <span className="text-muted">Check out:</span> {formatDate(booking.checkOut)}
                  </p>
                  <p>
                    <span className="text-muted">Guests:</span> {booking.adults} adult(s)
                    {booking.children ? `, ${booking.children} child(ren)` : ""}
                  </p>
                  <p>
                    <span className="text-muted">Room:</span>{" "}
                    {booking.roomType ?? "Any"} · {booking.roomCount ?? 1} room(s)
                  </p>
                </div>

                {booking.specialRequests ? (
                  <p className="mt-3 text-sm text-muted">
                    <span className="font-semibold text-brown-deep">Notes:</span>{" "}
                    {booking.specialRequests}
                  </p>
                ) : null}

                <div className="mt-4 flex flex-wrap gap-2">
                  {booking.status === "pending" ? (
                    <>
                      <AdminButton type="button" onClick={() => updateStatus(booking.id, "confirmed")}>
                        Confirm
                      </AdminButton>
                      <AdminButton
                        variant="danger"
                        type="button"
                        onClick={() => updateStatus(booking.id, "rejected")}
                      >
                        Reject
                      </AdminButton>
                    </>
                  ) : null}
                  <AdminButton variant="danger" type="button" onClick={() => remove(booking.id)}>
                    Delete
                  </AdminButton>
                </div>
              </div>
            ))}
          </div>
        )}
      </AdminCard>
    </AdminPanel>
  );
}
