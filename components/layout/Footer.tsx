"use client";

import {
  FacebookIcon,
  InstagramIcon,
  LinkedInIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
  TwitterIcon,
} from "@/components/ui/Icons";
import { navLinks, site } from "@/lib/content";

const services = [
  "Restaurant & Bar",
  "Spa & Massage",
  "Coffee Shop",
  "Airport Transfer",
  "Garden Terrace",
  "Meeting Room",
];

export function Footer() {
  return (
    <footer className="bg-footer text-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 md:grid-cols-2 md:px-6 lg:grid-cols-4">
        <div>
          <h3 className="mb-5 text-2xl font-bold">{site.name}</h3>
          <ul className="space-y-3 text-sm text-white/70">
            <li className="flex items-start gap-3">
              <MapPinIcon className="mt-0.5 h-4 w-4 shrink-0 text-brown" />
              {site.address}
            </li>
            <li className="flex items-start gap-3">
              <PhoneIcon className="mt-0.5 h-4 w-4 shrink-0 text-brown" />
              {site.phone}
            </li>
            <li className="flex items-start gap-3">
              <MailIcon className="mt-0.5 h-4 w-4 shrink-0 text-brown" />
              {site.email}
            </li>
          </ul>
        </div>

        <div>
          <h4 className="mb-5 text-lg font-bold">Quick Links</h4>
          <ul className="space-y-2.5 text-sm text-white/70">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="transition-colors hover:text-white">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-5 text-lg font-bold">Services</h4>
          <ul className="space-y-2.5 text-sm text-white/70">
            {services.map((service) => (
              <li key={service}>{service}</li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-5 text-lg font-bold">Newsletter</h4>
          <p className="mb-4 text-sm leading-relaxed text-white/70">
            Subscribe for stay offers, dining news, and seasonal updates from the resort.
          </p>
          <form
            className="flex overflow-hidden border border-white/15"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="Your email"
              className="min-w-0 flex-1 bg-transparent px-4 py-3 text-sm text-white outline-none placeholder:text-white/40"
            />
            <button
              type="submit"
              className="bg-brown px-4 text-sm font-semibold uppercase tracking-wider text-white transition-colors hover:bg-brown-dark"
            >
              →
            </button>
          </form>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-5 text-sm text-white/55 md:flex-row md:px-6">
          <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="#" aria-label="Facebook" className="hover:text-white">
              <FacebookIcon className="h-4 w-4" />
            </a>
            <a href="#" aria-label="Twitter" className="hover:text-white">
              <TwitterIcon className="h-4 w-4" />
            </a>
            <a href="#" aria-label="Instagram" className="hover:text-white">
              <InstagramIcon className="h-4 w-4" />
            </a>
            <a href="#" aria-label="LinkedIn" className="hover:text-white">
              <LinkedInIcon className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
