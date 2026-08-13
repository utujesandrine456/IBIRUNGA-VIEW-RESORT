"use client";

import { useState } from "react";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedInIcon,
  MailIcon,
  PhoneIcon,
  TwitterIcon,
} from "@/components/ui/Icons";
import { navLinks, site } from "@/lib/content";

const accent = "#c19a6b";

function LogoMark() {
  return (
    <svg
      viewBox="0 0 48 48"
      className="h-11 w-11 shrink-0 rounded-full sm:h-12 sm:w-12"
      aria-hidden="true"
      style={{ color: accent }}
    >
      <circle cx="24" cy="24" r="22" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M14 30c4-8 8-14 10-16 2 2 6 8 10 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M18 28c2.5-4 4.5-7 6-8.5 1.5 1.5 3.5 4.5 6 8.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <circle cx="24" cy="18" r="1.6" fill="currentColor" />
    </svg>
  );
}

export function TopBar() {
  return (
    <div className="border-b-[3px] border-[#7c5539] bg-[#4b2c14]">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2.5 text-sm md:px-6">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-1" style={{ color: "#ffffff" }}>
          <a
            href={`tel:${site.phone.replace(/\s/g, "")}`}
            className="inline-flex items-center gap-2"
            style={{ color: "#ffffff" }}
          >
            <PhoneIcon className="h-3.5 w-3.5" style={{ color: "#ffffff" }} />
            {site.phone}
          </a>
          <a
            href={`mailto:${site.email}`}
            className="hidden items-center gap-2 sm:inline-flex"
            style={{ color: "#ffffff" }}
          >
            <MailIcon className="h-3.5 w-3.5" style={{ color: "#ffffff" }} />
            {site.email}
          </a>
        </div>
        <div className="flex items-center gap-3">
          {[
            { Icon: FacebookIcon, label: "Facebook" },
            { Icon: TwitterIcon, label: "Twitter" },
            { Icon: InstagramIcon, label: "Instagram" },
            { Icon: LinkedInIcon, label: "LinkedIn" },
          ].map(({ Icon, label }) => (
            <a
              key={label}
              href="#"
              aria-label={label}
              className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white transition-opacity hover:opacity-90"
              style={{ color: "#4b2c14" }}
            >
              <Icon className="h-4 w-4" style={{ color: "#4b2c14", fill: "currentColor" }} />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="absolute inset-x-0 top-0 z-30 border-t-[3px] border-[#c19a6b] bg-[rgba(28,22,18,0.88)] backdrop-blur-[2px]">
      <div className="mx-auto grid max-w-7xl grid-cols-[1fr_auto] items-center gap-4 px-4 py-4 md:px-6 xl:grid-cols-[auto_1fr_auto] xl:gap-8">
        <a href="#home" className="flex min-w-0 items-center gap-3">
          <LogoMark />
          <span className="leading-tight">
            <span
              className="block text-base font-bold tracking-wide whitespace-nowrap sm:text-lg md:text-xl"
              style={{ color: "#ffffff" }}
            >
              IBIRUNGA VIEW RESORT
            </span>
            <span
              className="mt-0.5 block text-[10px] font-medium tracking-[0.28em] uppercase"
              style={{ color: "#ffffff" }}
            >
              Luxury Hotel
            </span>
          </span>
        </a>

        <nav className="hidden items-center justify-center gap-7 xl:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[15px] font-medium whitespace-nowrap transition-colors hover:opacity-80"
              style={{ color: "#ffffff" }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center justify-end gap-3">
          <a
            href="#contact"
            className="hidden px-6 py-3 text-[13px] font-semibold tracking-[0.12em] uppercase transition-colors hover:brightness-95 lg:inline-flex"
            style={{ backgroundColor: accent, color: "#ffffff" }}
          >
            Reservation
          </a>

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/60 xl:hidden"
            style={{ color: "#ffffff" }}
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="text-xl leading-none">{open ? "×" : "☰"}</span>
          </button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-white/10 bg-[rgba(28,22,18,0.96)] px-4 py-5 xl:hidden">
          <nav className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="py-1"
                style={{ color: "#ffffff" }}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              className="mt-2 inline-flex items-center justify-center px-6 py-3 text-[13px] font-semibold tracking-[0.12em] uppercase"
              style={{ backgroundColor: accent, color: "#ffffff" }}
              onClick={() => setOpen(false)}
            >
              Reservation
            </a>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
