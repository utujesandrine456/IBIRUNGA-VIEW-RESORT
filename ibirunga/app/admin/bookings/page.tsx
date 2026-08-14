"use client";

import { useEffect, useState } from "react";
import { AdminButton, AdminCard, AdminPanel, ResourceTable } from "@/components/admin/AdminUi";
import { api } from "@/lib/api";
import type { Booking } from "@/lib/cms-types";

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);

  async function load() {
    const data = await api.admin.bookings.list();
    setBookings(data);
  }

  useEffect(() => {
    load().catch(console.error);
  }, []);

  async function updateStatus(id: string, status: string) {
    await api.admin.bookings.updateStatus(id, status);
    await load();
  }

  async function remove(id: string) {
    if (!confirm("Delete this booking?")) return;
    await api.admin.bookings.remove(id);
    await load();
  }

  return (
    <AdminPanel title="Bookings" description="View and manage guest booking requests.">
      <AdminCard>
        <ResourceTable
          items={bookings}
          columns={[
            { key: "guestName", label: "Guest" },
            { key: "email", label: "Email" },
            { key: "checkIn", label: "Check in" },
            { key: "status", label: "Status" },
          ]}
          onEdit={() => {}}
          onDelete={remove}
        />
        <div className="mt-6 space-y-3">
          {bookings.map((booking) => (
            <div key={booking.id} className="flex flex-wrap items-center gap-2 border-t border-border pt-3 text-sm">
              <span className="font-semibold text-brown-deep">{booking.guestName}</span>
              <span className="text-muted">{booking.phone}</span>
              <span className="rounded-full bg-cream px-3 py-1 text-xs font-semibold uppercase">{booking.status}</span>
              {booking.status === "pending" ? (
                <>
                  <AdminButton type="button" onClick={() => updateStatus(booking.id, "confirmed")}>
                    Confirm
                  </AdminButton>
                  <AdminButton variant="ghost" type="button" onClick={() => updateStatus(booking.id, "cancelled")}>
                    Cancel
                  </AdminButton>
                </>
              ) : null}
            </div>
          ))}
        </div>
      </AdminCard>
    </AdminPanel>
  );
}
