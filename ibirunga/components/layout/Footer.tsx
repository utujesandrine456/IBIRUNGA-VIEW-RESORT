"use client";

import { motion } from "framer-motion";
import {
  FacebookIcon,
  InstagramIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
  YoutubeIcon,
} from "@/components/ui/Icons";
import { ImigongoFooterArt } from "@/components/ui/ImigongoPattern";
import { MotionItem, MotionStagger } from "@/components/ui/Motion";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import { handleSectionNav } from "@/lib/scroll";
import { useCmsContent } from "@/components/providers/ContentProvider";

const socialLinks = [
  { Icon: FacebookIcon, label: "Facebook" },
  { Icon: YoutubeIcon, label: "YouTube" },
  { Icon: InstagramIcon, label: "Instagram" },
] as const;

export function Footer() {
  const { site, navLinks, footerServices, footer } = useCmsContent();
  return (
    <footer className="relative mt-16 overflow-hidden bg-footer text-white md:mt-20">
      <ImigongoFooterArt className="pointer-events-none absolute inset-0" />

      <MotionStagger
        className="relative z-10 mx-auto grid max-w-7xl gap-12 px-4 py-16 md:grid-cols-2 md:px-6 lg:grid-cols-4"
        stagger={staggerContainer}
      >
        <MotionItem variants={fadeInUp}>
          <h3 className="mb-5 text-2xl font-bold">{site?.name ?? "Ibirunga View Resort"}</h3>
          <ul className="space-y-3 text-sm text-white/70">
            <li className="flex items-start gap-3">
              <MapPinIcon className="mt-0.5 h-4 w-4 shrink-0 text-brown" />
              {site?.address}
            </li>
            <li className="flex items-start gap-3">
              <PhoneIcon className="mt-0.5 h-4 w-4 shrink-0 text-brown" />
              {site?.phone}
            </li>
            <li className="flex items-start gap-3">
              <MailIcon className="mt-0.5 h-4 w-4 shrink-0 text-brown" />
              {site?.email}
            </li>
          </ul>
        </MotionItem>

        <MotionItem variants={fadeInUp}>
          <h4 className="mb-5 text-lg font-bold">Quick Links</h4>
          <ul className="space-y-2.5 text-sm text-white/70">
            {navLinks.map((link) => (
              <li key={link.href}>
                <motion.a
                  href={link.href}
                  className="inline-block"
                  whileHover={{ x: 4, color: "#ffffff" }}
                  onClick={(e) => handleSectionNav(e, link.href)}
                >
                  {link.label}
                </motion.a>
              </li>
            ))}
          </ul>
        </MotionItem>

        <MotionItem variants={fadeInUp}>
          <h4 className="mb-5 text-lg font-bold">Services</h4>
          <ul className="space-y-2.5 text-sm text-white/70">
            {footerServices.map((service) => (
              <li key={service}>{service}</li>
            ))}
          </ul>
        </MotionItem>

        <MotionItem variants={fadeInUp}>
          <h4 className="mb-5 text-lg font-bold">Newsletter</h4>
          <p className="mb-4 text-sm leading-relaxed text-white/70">
            {footer.newsletterDescription ??
              "Subscribe for stay offers, dining news, and seasonal updates from the resort."}
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
            <motion.button
              type="submit"
              className="bg-brown px-4 text-sm font-semibold uppercase tracking-wider text-white!"
              whileHover={{ backgroundColor: "#54341a", scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              →
            </motion.button>
          </form>
        </MotionItem>
      </MotionStagger>

      <motion.div
        className="relative z-10 border-t border-white/10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-5 text-sm text-white/55 md:flex-row md:px-6">
          <p>© {new Date().getFullYear()} {site?.name ?? "Ibirunga View Resort"}. All rights reserved.</p>
          <div className="flex items-center gap-5">
            {socialLinks.map(({ Icon, label }) => (
              <motion.a
                key={label}
                href="#"
                aria-label={label}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5"
                whileHover={{ scale: 1.12, backgroundColor: "rgba(255,255,255,0.12)" }}
              >
                <Icon className="h-5 w-5 text-white" />
              </motion.a>
            ))}
          </div>
        </div>
      </motion.div>
    </footer>
  );
}
