"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AdminCard, AdminPanel } from "@/components/admin/AdminUi";
import { api } from "@/lib/api";

export default function AdminDashboardPage() {
  const [counts, setCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    api.admin.dashboard().then((res) => setCounts(res.counts)).catch(console.error);
  }, []);

  const cards = [
    { label: "Bookings", value: counts.bookings ?? 0, href: "/admin/bookings" },
    { label: "Pending", value: counts.pendingBookings ?? 0, href: "/admin/bookings" },
    { label: "Rooms", value: counts.rooms ?? 0, href: "/admin/rooms" },
    { label: "Amenities", value: counts.amenities ?? 0, href: "/admin/amenities" },
    { label: "Testimonials", value: counts.testimonials ?? 0, href: "/admin/testimonials" },
    { label: "Blog Posts", value: counts.blogPosts ?? 0, href: "/admin/blog" },
  ];

  return (
    <AdminPanel title="Dashboard" description="Manage every section of the Ibirunga homepage and bookings.">
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {cards.map((card) => (
          <Link key={card.label} href={card.href}>
            <AdminCard>
              <p className="text-sm font-semibold text-muted">{card.label}</p>
              <p className="mt-2 text-4xl font-bold text-brown">{card.value}</p>
            </AdminCard>
          </Link>
        ))}
      </div>
    </AdminPanel>
  );
}
