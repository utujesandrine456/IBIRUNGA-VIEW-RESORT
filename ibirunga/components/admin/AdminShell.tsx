"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { clearToken, getToken } from "@/lib/api";

type NavItem = { href: string; label: string; icon: string };

const mainNav: NavItem[] = [
  { href: "/admin", label: "Dashboard", icon: "dashboard" },
  { href: "/admin/bookings", label: "Bookings", icon: "bookings" },
];

const contentNav: NavItem[] = [
  { href: "/admin/site", label: "Site Settings", icon: "site" },
  { href: "/admin/hero", label: "Hero", icon: "hero" },
  { href: "/admin/about", label: "About", icon: "about" },
  { href: "/admin/amenities", label: "Amenities", icon: "amenities" },
  { href: "/admin/rooms", label: "Rooms", icon: "rooms" },
  { href: "/admin/extra-services", label: "Extra Services", icon: "services" },
  { href: "/admin/testimonials", label: "Testimonials", icon: "testimonials" },
  { href: "/admin/blog", label: "Blog", icon: "blog" },
  { href: "/admin/video", label: "Video Tour", icon: "video" },
  { href: "/admin/footer", label: "Footer", icon: "footer" },
  { href: "/admin/booking-form", label: "Booking Form", icon: "form" },
];

function NavIcon({ name }: { name: string }) {
  const cls = "h-[18px] w-[18px]";
  switch (name) {
    case "dashboard":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={cls}>
          <rect x="3" y="3" width="8" height="8" rx="1.5" />
          <rect x="13" y="3" width="8" height="5" rx="1.5" />
          <rect x="13" y="10" width="8" height="11" rx="1.5" />
          <rect x="3" y="13" width="8" height="8" rx="1.5" />
        </svg>
      );
    case "bookings":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={cls}>
          <rect x="4" y="5" width="16" height="15" rx="2" />
          <path d="M8 3v4M16 3v4M4 10h16" />
        </svg>
      );
    case "site":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={cls}>
          <circle cx="12" cy="12" r="3" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
        </svg>
      );
    case "hero":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={cls}>
          <path d="M4 19h16M6 19V9l6-5 6 5v10" />
          <path d="M10 19v-4h4v4" />
        </svg>
      );
    case "about":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={cls}>
          <circle cx="12" cy="8" r="4" />
          <path d="M6 20v-1a6 6 0 0112 0v1" />
        </svg>
      );
    case "amenities":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={cls}>
          <path d="M12 3l2.5 5 5.5.8-4 3.9.9 5.5L12 16l-4.9 2.2.9-5.5-4-3.9 5.5-.8L12 3z" />
        </svg>
      );
    case "rooms":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={cls}>
          <path d="M4 14h16M4 18h16M6 14V9h12v5" />
        </svg>
      );
    case "services":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={cls}>
          <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
        </svg>
      );
    case "testimonials":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={cls}>
          <path d="M8 10a3 3 0 105.5 2M16 10a3 3 0 105.5 2" />
          <path d="M4 18c1.5-2 3.5-3 6-3s4.5 1 6 3" />
        </svg>
      );
    case "blog":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={cls}>
          <path d="M6 4h12v16H6z" />
          <path d="M9 8h6M9 12h6M9 16h4" />
        </svg>
      );
    case "video":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={cls}>
          <rect x="3" y="6" width="14" height="12" rx="2" />
          <path d="M17 10l4-2v8l-4-2" />
        </svg>
      );
    case "footer":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={cls}>
          <path d="M4 18h16M6 14h12M8 10h8M10 6h4" />
        </svg>
      );
    case "form":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={cls}>
          <rect x="4" y="3" width="16" height="18" rx="2" />
          <path d="M8 8h8M8 12h8M8 16h5" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={cls}>
          <circle cx="12" cy="12" r="3" />
          <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
        </svg>
      );
  }
}

function NavLink({ item, pathname }: { item: NavItem; pathname: string }) {
  const active = pathname === item.href;
  return (
    <Link
      href={item.href}
      className={`flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition ${
        active
          ? "bg-[#6b4423] !text-white shadow-[0_4px_14px_rgba(107,68,35,0.35)]"
          : "text-white hover:bg-white/8"
      }`}
    >
      <NavIcon name={item.icon} />
      {item.label}
    </Link>
  );
}

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
      <div className="flex min-h-screen items-center justify-center bg-[#f4f1eb]">
        <div className="flex items-center gap-3 text-brown">
          <span className="h-5 w-5 animate-spin rounded-full border-2 border-brown/20 border-t-brown" />
          Loading workspace...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f4f1eb]">
      <div className="flex min-h-screen">
        <aside className="flex w-[280px] shrink-0 flex-col border-r border-[#2a2118] bg-[#14110e]">
          <div className="border-b border-white/8 px-6 py-6">
            <div className="flex items-center gap-3">
              <Image src="/logo.png" alt="" width={40} height={40} className="brightness-0 invert" />
              <div>
                <p className="text-[11px] font-semibold tracking-[0.22em] text-[#c19a6b] uppercase">
                  Ibirunga CMS
                </p>
                <p className="text-sm font-semibold text-white">Admin Portal</p>
              </div>
            </div>
          </div>

          <nav className="flex-1 space-y-6 overflow-y-auto px-4 py-5">
            <div>
              <p className="mb-2 px-3 text-[11px] font-semibold tracking-[0.18em] text-white/35 uppercase">
                Overview
              </p>
              <div className="space-y-1">
                {mainNav.map((item) => (
                  <NavLink key={item.href} item={item} pathname={pathname} />
                ))}
              </div>
            </div>

            <div>
              <p className="mb-2 px-3 text-[11px] font-semibold tracking-[0.18em] text-white/35 uppercase">
                Website Content
              </p>
              <div className="space-y-1">
                {contentNav.map((item) => (
                  <NavLink key={item.href} item={item} pathname={pathname} />
                ))}
              </div>
            </div>
          </nav>

          <div className="border-t border-white/8 p-4">
            <button
              type="button"
              onClick={() => {
                clearToken();
                router.push("/admin/login");
              }}
              className="flex w-full items-center justify-center gap-2 rounded-md border border-white/12 bg-white/5 px-3 py-2.5 text-sm font-medium text-white transition hover:bg-white/10"
            >
              Sign out
            </button>
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-20 border-b border-[#e5e1d8] bg-white/90 px-8 py-4 backdrop-blur-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-[#9a9a9a]">Ibirunga View Resort</p>
                <p className="text-sm font-semibold text-[#2a1d14]">Content Management Workspace</p>
              </div>
              <Link
                href="/"
                target="_blank"
                className="rounded-lg border border-[#e5e1d8] bg-white px-4 py-2 text-xs font-semibold text-brown transition hover:border-brown/30 hover:bg-cream"
              >
                View website →
              </Link>
            </div>
          </header>
          <main className="flex-1 px-8 py-8">{children}</main>
        </div>
      </div>
    </div>
  );
}
