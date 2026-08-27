"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { CmsImage } from "@/components/ui/CmsImage";
import {
  CalendarIcon,
  PhoneIcon,
  RoomDoorIcon,
  UserIcon,
  UsersIcon,
} from "@/components/ui/Icons";
import { ease, fadeInLeft, fadeInRight } from "@/lib/motion";
import { useCmsContent } from "@/components/providers/ContentProvider";
import { usePromoBanner } from "@/components/layout/PromoBanner";
import { api } from "@/lib/api";
import { ROOM_BOOKING_OPTIONS } from "@/lib/room-options";
import { normalizePhoneInput } from "@/lib/phone";

const fieldControl =
  "w-full cursor-pointer rounded-md border border-[#e6e1d8] bg-[#faf9f7] px-3 py-2.5 text-[15px] text-[#2c2c2c] outline-none transition placeholder:text-[#a8a29a] focus:border-brown focus:bg-white focus:ring-2 focus:ring-brown/15";

function Field({
  label,
  type = "text",
  options,
  placeholder,
  icon,
  value,
  onChange,
  required,
  min,
  emptyLabel,
}: {
  label: string;
  type?: string;
  options?: string[];
  placeholder?: string;
  icon: ReactNode;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  min?: string;
  emptyLabel?: string;
}) {
  return (
    <label className="block min-w-0 cursor-pointer">
      <span className="mb-1.5 flex items-center gap-1.5 text-[11px] font-semibold tracking-[0.06em] text-[#6b635a] uppercase">
        <span className="text-brown/70">{icon}</span>
        {label}
      </span>
      {options ? (
        <select
          className={fieldControl}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
        >
          <option value="" disabled>
            {emptyLabel ?? `Select ${label.toLowerCase()}`}
          </option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          className={`${fieldControl}${type === "text" || type === "tel" ? " cursor-text" : ""}`}
          placeholder={placeholder ?? label}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          min={min}
          autoComplete="off"
        />
      )}
    </label>
  );
}

function todayIso() {
  return new Date().toISOString().slice(0, 10);
}

export function Hero() {
  const { hero } = useCmsContent();
  const { bannerVisible } = usePromoBanner();
  const [form, setForm] = useState({
    checkIn: "",
    checkOut: "",
    adults: "",
    children: "",
    roomType: "",
    guestName: "",
    phone: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const ctaLabel = (hero.ctaLabel || "Discover").trim() || "Discover";
  /* Only add banner offset when the promo is open — no leftover gap when closed */
  const contentPadTop = bannerVisible ? "pt-[13rem]" : "pt-36";

  function update(field: keyof typeof form, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.checkIn || !form.checkOut || !form.adults || !form.children || !form.roomType) {
      setStatus("error");
      setMessage("Please fill in all booking fields.");
      return;
    }
    if (form.checkOut <= form.checkIn) {
      setStatus("error");
      setMessage("Check-out date must be after check-in.");
      return;
    }
    if (form.phone.trim().replace(/\D/g, "").length < 9) {
      setStatus("error");
      setMessage("Please enter a valid phone number.");
      return;
    }

    setStatus("loading");
    setMessage("");
    try {
      await api.createBooking({
        checkIn: form.checkIn,
        checkOut: form.checkOut,
        adults: Number(form.adults),
        children: Number(form.children),
        roomType: form.roomType,
        guestName: form.guestName.trim(),
        phone: normalizePhoneInput(form.phone),
        source: "hero-form",
      });
      const savedPhone = normalizePhoneInput(form.phone);
      if (savedPhone) {
        localStorage.setItem("ibirunga_booking_phone", savedPhone);
      }
      setStatus("success");
      setMessage("Request sent. We will confirm availability shortly.");
      setForm({
        checkIn: "",
        checkOut: "",
        adults: "",
        children: "",
        roomType: "",
        guestName: "",
        phone: "",
      });
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Could not send request. Please try again.");
    }
  }

  return (
    <section id="home" className="relative h-screen min-h-screen overflow-x-hidden">
      <motion.div
        className="absolute inset-0 overflow-hidden"
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.4, ease }}
      >
        <CmsImage
          src={hero.backgroundImage || "/LUCIMAGES_20.JPG"}
          alt="Ibirunga View Resort terrace dining"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-linear-to-r from-black/70 via-black/50 to-black/30" />
      </motion.div>

      <div
        className={`relative mx-auto flex h-full max-w-7xl flex-col justify-start gap-6 px-4 pb-6 md:px-6 lg:flex-row lg:items-center lg:justify-between lg:gap-10 lg:pb-8 ${contentPadTop}`}
      >
        <motion.div
          className="max-w-xl shrink text-white"
          variants={fadeInLeft}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.8, delay: 0.3, ease }}
        >
          <h1 className="mb-3 text-3xl font-bold leading-[1.1] sm:text-4xl lg:mb-4 lg:text-5xl xl:text-[3.15rem]">
            {hero.headline || "Enjoy A Luxury Experience"}
          </h1>
          <p className="mb-5 max-w-md text-sm leading-relaxed text-white/85 sm:text-base lg:mb-6 lg:text-lg">
            {hero.subtext ||
              "Nestled in the heart of Musanze with breathtaking volcano views, Ibirunga View Resort offers refined comfort, warm hospitality, and unforgettable stays."}
          </p>
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Button
              variant="outlineLight"
              className="min-w-36 rounded-md"
              onClick={() =>
                document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })
              }
            >
              <span className="text-inherit">{ctaLabel}</span>
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          className="w-full max-w-md shrink-0 rounded-md border border-white/40 bg-white/96 p-5 shadow-[0_24px_60px_rgba(0,0,0,0.3)] backdrop-blur-sm sm:p-6"
          variants={fadeInRight}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.8, delay: 0.45, ease }}
        >
          <div className="mb-4 border-b border-[#efeae3] pb-3.5">
            <p className="mb-1 text-[11px] font-semibold tracking-[0.18em] text-brown uppercase">
              Reservations
            </p>
            <h2 className="text-xl font-bold text-[#1a1410] sm:text-2xl">Book a Room</h2>
          </div>

          <form className="space-y-3.5" onSubmit={handleSubmit} autoComplete="off">
            <div className="grid grid-cols-2 gap-3.5">
              <Field
                label="Check In"
                type="date"
                icon={<CalendarIcon className="h-3.5 w-3.5" />}
                value={form.checkIn}
                onChange={(v) => update("checkIn", v)}
                min={todayIso()}
                required
              />
              <Field
                label="Check Out"
                type="date"
                icon={<CalendarIcon className="h-3.5 w-3.5" />}
                value={form.checkOut}
                onChange={(v) => update("checkOut", v)}
                min={form.checkIn || todayIso()}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3.5">
              <Field
                label="Adults"
                options={["1", "2", "3", "4"]}
                emptyLabel="—"
                icon={<UserIcon className="h-3.5 w-3.5" />}
                value={form.adults}
                onChange={(v) => update("adults", v)}
                required
              />
              <Field
                label="Children"
                options={["0", "1", "2", "3"]}
                emptyLabel="—"
                icon={<UsersIcon className="h-3.5 w-3.5" />}
                value={form.children}
                onChange={(v) => update("children", v)}
                required
              />
            </div>

            <Field
              label="Room"
              options={[...ROOM_BOOKING_OPTIONS]}
              emptyLabel="Select a room"
              icon={<RoomDoorIcon className="h-3.5 w-3.5" />}
              value={form.roomType}
              onChange={(v) => update("roomType", v)}
              required
            />

            <div className="grid grid-cols-2 gap-3.5">
              <Field
                label="Full Name"
                type="text"
                placeholder="Guest full name"
                icon={<UserIcon className="h-3.5 w-3.5" />}
                value={form.guestName}
                onChange={(v) => update("guestName", v)}
                required
              />
              <Field
                label="Phone"
                type="tel"
                placeholder="+250 ..."
                icon={<PhoneIcon className="h-3.5 w-3.5" />}
                value={form.phone}
                onChange={(v) => update("phone", v)}
                required
              />
            </div>

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full cursor-pointer rounded-md bg-[#6b4423] px-4 py-3 text-sm font-semibold tracking-[0.14em] text-white uppercase transition hover:bg-[#54341a] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === "loading" ? "Sending..." : "Check Availability"}
            </button>

            {message ? (
              <p className={`text-sm ${status === "success" ? "text-[#6b4423]" : "text-red-600"}`}>
                {message}
              </p>
            ) : null}
          </form>
        </motion.div>
      </div>
    </section>
  );
}
