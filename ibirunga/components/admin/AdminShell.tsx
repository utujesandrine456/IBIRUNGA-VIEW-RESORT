"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { clearToken, getToken } from "@/lib/api";

const nav = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/site", label: "Site Settings" },
  { href: "/admin/hero", label: "Hero" },
  { href: "/admin/about", label: "About" },
  { href: "/admin/amenities", label: "Amenities" },
  { href: "/admin/rooms", label: "Rooms" },
  { href: "/admin/extra-services", label: "Extra Services" },
  { href: "/admin/testimonials", label: "Testimonials" },
  { href: "/admin/blog", label: "Blog" },
  { href: "/admin/video", label: "Video Tour" },
  { href: "/admin/footer", label: "Footer" },
  { href: "/admin/booking-form", label: "Booking Form" },
  { href: "/admin/bookings", label: "Bookings" },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (pathname === "/admin/login") {
      setReady(true);
      return;
    }
    if (!getToken()) {
      router.replace("/admin/login");
      return;
    }
    setReady(true);
  }, [pathname, router]);

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f7f5f0] text-brown">
        Loading admin...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f5f0]">
      <div className="flex min-h-screen">
        <aside className="w-64 shrink-0 border-r border-[#e5e1d8] bg-[#1a1612] text-white">
          <div className="border-b border-white/10 px-6 py-6">
            <p className="text-xs font-semibold tracking-[0.2em] text-[#c19a6b] uppercase">
              Ibirunga CMS
            </p>
            <h1 className="mt-1 text-lg font-bold">Admin Portal</h1>
          </div>
          <nav className="space-y-1 p-4">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`block rounded-lg px-3 py-2.5 text-sm transition ${
                  pathname === item.href
                    ? "bg-brown text-white"
                    : "text-white/70 hover:bg-white/10 hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="border-t border-white/10 p-4">
            <button
              type="button"
              onClick={() => {
                clearToken();
                router.push("/admin/login");
              }}
              className="w-full rounded-lg border border-white/15 px-3 py-2 text-sm text-white/70 hover:bg-white/10"
            >
              Sign out
            </button>
          </div>
        </aside>
        <main className="min-w-0 flex-1 p-8">{children}</main>
      </div>
    </div>
  );
}
