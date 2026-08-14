"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";

type Activity = {
  id: string;
  type: string;
  title: string;
  description: string;
  status: string;
  date: string;
};

function formatRelativeTime(dateStr: string) {
  const date = new Date(dateStr);
  const diff = Date.now() - date.getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

function StatIcon({ type }: { type: string }) {
  const cls = "h-5 w-5 text-white";
  if (type === "bookings")
    return (
      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/20">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={cls}>
          <rect x="4" y="5" width="16" height="15" rx="2" />
          <path d="M8 3v4M16 3v4M4 10h16" />
        </svg>
      </div>
    );
  if (type === "pending")
    return (
      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/20">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={cls}>
          <circle cx="12" cy="12" r="8" />
          <path d="M12 8v4l3 2" />
        </svg>
      </div>
    );
  if (type === "rooms")
    return (
      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/20">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={cls}>
          <path d="M4 14h16M4 18h16M6 14V9h12v5" />
        </svg>
      </div>
    );
  return (
    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/20">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={cls}>
        <path d="M6 4h12v16H6z" />
        <path d="M9 8h6M9 12h6" />
      </svg>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    pending: "bg-amber-50 text-amber-700 border-amber-200",
    confirmed: "bg-emerald-50 text-emerald-700 border-emerald-200",
    cancelled: "bg-red-50 text-red-600 border-red-200",
  };
  return (
    <span
      className={`rounded-full border px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide ${
        styles[status] ?? "bg-gray-50 text-gray-600 border-gray-200"
      }`}
    >
      {status}
    </span>
  );
}

export default function AdminDashboardPage() {
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function loadDashboard() {
    setLoading(true);
    setError(null);
    try {
      const res = await api.admin.dashboard();
      setCounts(res.counts);
      setActivities(res.recentActivities ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadDashboard();
  }, []);

  const statCards = [
    {
      label: "Total Bookings",
      value: counts.bookings ?? 0,
      href: "/admin/bookings",
      accent: "from-[#6b4423] to-[#8b5a3c]",
      icon: "bookings",
    },
    {
      label: "Pending Requests",
      value: counts.pendingBookings ?? 0,
      href: "/admin/bookings",
      accent: "from-[#b45309] to-[#d97706]",
      icon: "pending",
    },
    {
      label: "Rooms Listed",
      value: counts.rooms ?? 0,
      href: "/admin/rooms",
      accent: "from-[#4b5563] to-[#6b7280]",
      icon: "rooms",
    },
    {
      label: "Blog Posts",
      value: counts.blogPosts ?? 0,
      href: "/admin/blog",
      accent: "from-[#047857] to-[#059669]",
      icon: "blog",
    },
  ];

  const quickActions = [
    { label: "Update Hero Section", href: "/admin/hero" },
    { label: "Manage Rooms", href: "/admin/rooms" },
    { label: "Edit Amenities", href: "/admin/amenities" },
    { label: "Review Bookings", href: "/admin/bookings" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-[#2a1d14]">Dashboard</h1>
        <p className="mt-2 text-sm text-[#6b6b6b]">
          Overview of your resort website content and guest booking activity.
        </p>
      </div>

      {error ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-6 py-5">
          <p className="font-semibold text-red-800">Unable to load dashboard</p>
          <p className="mt-1 text-sm text-red-700">{error}</p>
          <button
            type="button"
            onClick={loadDashboard}
            className="mt-4 rounded-md bg-[#6b4423] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#54341a]"
          >
            Retry
          </button>
        </div>
      ) : null}

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {statCards.map((card) => (
          <Link key={card.label} href={card.href} className="group">
            <div className="overflow-hidden rounded-2xl border border-[#ebe7df] bg-white shadow-[0_8px_30px_rgba(60,40,20,0.05)] transition group-hover:-translate-y-0.5 group-hover:shadow-[0_16px_40px_rgba(60,40,20,0.1)]">
              <div className={`bg-linear-to-r ${card.accent} px-5 py-4`}>
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-white/85">{card.label}</p>
                  <StatIcon type={card.icon} />
                </div>
                <p className="mt-2 text-3xl font-bold text-white">
                  {loading ? "—" : card.value}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.4fr_0.9fr]">
        {/* Recent activities */}
        <div className="rounded-2xl border border-[#ebe7df] bg-white shadow-[0_8px_30px_rgba(60,40,20,0.05)]">
          <div className="flex items-center justify-between border-b border-[#f0ece4] px-6 py-5">
            <div>
              <h2 className="text-lg font-bold text-[#2a1d14]">Recent Activities</h2>
              <p className="mt-1 text-sm text-[#6b6b6b]">Latest booking requests from guests</p>
            </div>
            <Link
              href="/admin/bookings"
              className="text-sm font-semibold text-brown hover:text-brown-dark"
            >
              View all
            </Link>
          </div>

          <div className="divide-y divide-[#f0ece4]">
            {loading ? (
              <div className="px-6 py-12 text-center text-sm text-[#9a9a9a]">Loading activities...</div>
            ) : activities.length === 0 ? (
              <div className="px-6 py-12 text-center">
                <p className="text-sm font-medium text-[#6b6b6b]">No booking activity yet</p>
                <p className="mt-1 text-xs text-[#9a9a9a]">
                  New guest booking requests will appear here.
                </p>
              </div>
            ) : (
              activities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-center justify-between gap-4 px-6 py-4 transition hover:bg-[#faf9f7]"
                >
                  <div className="flex min-w-0 items-center gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f4f1eb] text-brown">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4">
                        <rect x="4" y="5" width="16" height="15" rx="2" />
                        <path d="M8 3v4M16 3v4M4 10h16" />
                      </svg>
                    </div>
                    <div className="min-w-0">
                      <p className="truncate font-semibold text-[#2a1d14]">{activity.title}</p>
                      <p className="truncate text-sm text-[#6b6b6b]">{activity.description}</p>
                    </div>
                  </div>
                  <div className="flex shrink-0 flex-col items-end gap-1.5">
                    <StatusBadge status={activity.status} />
                    <span className="text-xs text-[#9a9a9a]">
                      {formatRelativeTime(activity.date)}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Quick actions + summary */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-[#ebe7df] bg-white p-6 shadow-[0_8px_30px_rgba(60,40,20,0.05)]">
            <h2 className="text-lg font-bold text-[#2a1d14]">Quick Actions</h2>
            <p className="mt-1 text-sm text-[#6b6b6b]">Jump to common management tasks</p>
            <div className="mt-5 space-y-2">
              {quickActions.map((action) => (
                <Link
                  key={action.href}
                  href={action.href}
                  className="flex items-center justify-between rounded-xl border border-[#ebe7df] bg-[#faf9f7] px-4 py-3 text-sm font-medium text-[#2a1d14] transition hover:border-brown/25 hover:bg-white"
                >
                  {action.label}
                  <span className="text-brown">→</span>
                </Link>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-[#ebe7df] bg-white p-6 shadow-[0_8px_30px_rgba(60,40,20,0.05)]">
            <h2 className="text-lg font-bold text-[#2a1d14]">Content Summary</h2>
            <div className="mt-5 space-y-3">
              {[
                { label: "Amenities", value: counts.amenities ?? 0 },
                { label: "Testimonials", value: counts.testimonials ?? 0 },
                { label: "Extra Services", value: counts.extraServices ?? 0 },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between rounded-lg bg-[#faf9f7] px-4 py-3"
                >
                  <span className="text-sm text-[#6b6b6b]">{item.label}</span>
                  <span className="text-sm font-bold text-[#2a1d14]">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
