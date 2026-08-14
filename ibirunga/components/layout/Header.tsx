"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  FacebookIcon,
  InstagramIcon,
  MailIcon,
  PhoneIcon,
  YoutubeIcon,
} from "@/components/ui/Icons";
import { ease } from "@/lib/motion";
import { handleSectionNav } from "@/lib/scroll";
import { images, navLinks, site } from "@/lib/content";

const accent = "#c19a6b";

const socialLinks = [
  { Icon: FacebookIcon, label: "Facebook" },
  { Icon: YoutubeIcon, label: "YouTube" },
  { Icon: InstagramIcon, label: "Instagram" },
] as const;

function LogoMark() {
  return (
    <Image
      src={images.logo}
      alt="Ibirunga View Resort logo"
      width={52}
      height={52}
      className="h-11 w-11 shrink-0 object-contain brightness-0 invert sm:h-12 sm:w-12"
      priority
    />
  );
}

function TopBar() {
  return (
    <div className="border-b-[3px] border-[#7c5539] bg-[#4b2c14]">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2.5 text-sm md:px-6">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-1" style={{ color: "#ffffff" }}>
          <motion.a
            href={`tel:${site.phone.replace(/\s/g, "")}`}
            className="inline-flex items-center gap-2"
            style={{ color: "#ffffff" }}
            whileHover={{ opacity: 0.85 }}
          >
            <PhoneIcon className="h-3.5 w-3.5" style={{ color: "#ffffff" }} />
            {site.phone}
          </motion.a>
          <motion.a
            href={`mailto:${site.email}`}
            className="hidden items-center gap-2 sm:inline-flex"
            style={{ color: "#ffffff" }}
            whileHover={{ opacity: 0.85 }}
          >
            <MailIcon className="h-3.5 w-3.5" style={{ color: "#ffffff" }} />
            {site.email}
          </motion.a>
        </div>
        <div className="flex items-center gap-3">
          {socialLinks.map(({ Icon, label }, i) => (
            <motion.a
              key={label}
              href="#"
              aria-label={label}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white"
              style={{ color: "#4b2c14" }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + i * 0.05, duration: 0.4, ease }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Icon className="h-5 w-5" style={{ color: "#4b2c14" }} />
            </motion.a>
          ))}
        </div>
      </div>
    </div>
  );
}

function Navbar({ scrolled }: { scrolled: boolean }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      className="border-t-[3px] border-[#c19a6b] backdrop-blur-[2px]"
      animate={{
        backgroundColor: scrolled ? "rgba(28, 22, 18, 0.97)" : "rgba(28, 22, 18, 0.88)",
        boxShadow: scrolled ? "0 8px 32px rgba(0,0,0,0.25)" : "0 0px 0px rgba(0,0,0,0)",
      }}
      transition={{ duration: 0.35, ease }}
    >
      <div className="mx-auto grid max-w-7xl grid-cols-[1fr_auto] items-center gap-4 px-4 py-4 md:px-6 xl:grid-cols-[auto_1fr_auto] xl:gap-8">
        <motion.a
          href="#home"
          className="flex min-w-0 items-center gap-3"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease }}
          onClick={(e) => handleSectionNav(e, "#home")}
        >
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
        </motion.a>

        <nav className="hidden items-center justify-center gap-7 xl:flex">
          {navLinks.map((link, i) => (
            <motion.a
              key={link.href}
              href={link.href}
              className="relative text-[15px] font-medium whitespace-nowrap"
              style={{ color: "#ffffff" }}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.05, duration: 0.5, ease }}
              whileHover={{ opacity: 0.75 }}
              onClick={(e) => handleSectionNav(e, link.href)}
            >
              {link.label}
            </motion.a>
          ))}
        </nav>

        <div className="flex items-center justify-end gap-3">
          <motion.a
            href="#contact"
            className="hidden px-6 py-3 text-[13px] font-semibold tracking-[0.12em] uppercase lg:inline-flex"
            style={{ backgroundColor: accent, color: "#ffffff" }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.5, ease }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={(e) => handleSectionNav(e, "#contact")}
          >
            Reservation
          </motion.a>

          <motion.button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/60 xl:hidden"
            style={{ color: "#ffffff" }}
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            whileTap={{ scale: 0.92 }}
          >
            <span className="text-xl leading-none">{open ? "×" : "☰"}</span>
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            className="border-t border-white/10 bg-[rgba(28,22,18,0.96)] px-4 py-5 xl:hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease }}
          >
            <nav className="flex flex-col gap-3">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  className="py-1"
                  style={{ color: "#ffffff" }}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.3, ease }}
                  onClick={(e) => handleSectionNav(e, link.href, () => setOpen(false))}
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                href="#contact"
                className="mt-2 inline-flex items-center justify-center px-6 py-3 text-[13px] font-semibold tracking-[0.12em] uppercase"
                style={{ backgroundColor: accent, color: "#ffffff" }}
                onClick={(e) => handleSectionNav(e, "#contact", () => setOpen(false))}
                whileHover={{ scale: 1.02 }}
              >
                Reservation
              </motion.a>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.div>
  );
}

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-50"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease }}
    >
      <TopBar />
      <Navbar scrolled={scrolled} />
    </motion.header>
  );
}

// Keep exports for backwards compatibility
export { TopBar, Navbar };
