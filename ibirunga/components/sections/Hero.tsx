"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import {
  CalendarIcon,
  MailIcon,
  PhoneIcon,
  RoomDoorIcon,
  UserIcon,
  UsersIcon,
} from "@/components/ui/Icons";
import { ease, fadeInLeft, fadeInRight } from "@/lib/motion";
import { useCmsContent } from "@/components/providers/ContentProvider";
import { api } from "@/lib/api";

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
}) {
  return (
    <label className="block">
      <span className="mb-2 flex items-center gap-2 text-sm font-semibold text-[#2c2c2c]">
        <span className="inline-flex h-5 w-5 items-center justify-center rounded-full text-[#9a9a9a]">
          {icon}
        </span>
        {label}
      </span>
      {options ? (
        <select
          className="w-full appearance-none border border-[#d8d8d8] bg-white px-3 py-3 text-sm text-[#2c2c2c] outline-none transition focus:border-brown"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          className="w-full border border-[#d8d8d8] bg-white px-3 py-3 text-sm text-[#2c2c2c] outline-none transition focus:border-brown"
          placeholder={placeholder ?? label}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          min={min}
        />
      )}
    </label>
  );
}

function todayIso() {
  return new Date().toISOString().slice(0, 10);
}

function tomorrowIso() {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().slice(0, 10);
}

export function Hero() {
  const { hero } = useCmsContent();
  const [form, setForm] = useState({
    checkIn: todayIso(),
    checkOut: tomorrowIso(),
    adults: "1",
    children: "0",
    roomType: "Room 200 — Bisoke Wing ($40)",
    guestName: "",
    email: "",
    phone: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  function update(field: keyof typeof form, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (form.checkOut <= form.checkIn) {
      setStatus("error");
      setMessage("Check-out date must be after check-in.");
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
        email: form.email.trim(),
        phone: form.phone.trim(),
        source: "hero-form",
      });
      setStatus("success");
      setMessage("Request sent. We will confirm availability shortly.");
      setForm((prev) => ({
        ...prev,
        guestName: "",
        email: "",
        phone: "",
      }));
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Could not send request. Please try again.");
    }
  }

  return (
    <section id="home" className="relative min-h-[92vh] overflow-hidden">
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.4, ease }}
      >
        <Image
          src={hero.backgroundImage ?? "/LUCIMAGES_20.JPG"}
          alt="Ibirunga View Resort terrace dining"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      </motion.div>
      <div className="absolute inset-0 bg-linear-to-r from-black/65 via-black/45 to-black/25" />

      <div className="relative mx-auto flex min-h-[92vh] max-w-7xl flex-col justify-center gap-10 px-4 pb-24 pt-44 md:px-6 lg:flex-row lg:items-center lg:justify-between lg:gap-12 lg:pt-48">
        <motion.div
          className="max-w-xl text-white"
          variants={fadeInLeft}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.8, delay: 0.3, ease }}
        >
          <h1 className="mb-5 text-4xl font-bold leading-[1.1] md:text-5xl lg:text-[3.4rem]">
            {hero.headline ?? "Enjoy A Luxury Experience"}
          </h1>
          <p className="mb-8 max-w-md text-base leading-relaxed text-white/85 md:text-lg">
            {hero.subtext ??
              "Rest above the hills of Musanze and wake to volcano views, warm hospitality, and thoughtfully prepared spaces for every guest."}
          </p>
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
            <Button
              variant="outlineLight"
              onClick={() =>
                document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })
              }
            >
              {hero.ctaLabel ?? "Discover"}
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          className="w-full max-w-105 bg-white p-8 shadow-[0_20px_60px_rgba(0,0,0,0.25)] md:p-9"
          variants={fadeInRight}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.8, delay: 0.5, ease }}
        >
          <h2 className="mb-7 text-left text-[1.75rem] font-bold text-black">Book A Room</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field
                label="Check In Date"
                type="date"
                icon={<CalendarIcon className="h-4 w-4" />}
                value={form.checkIn}
                onChange={(v) => update("checkIn", v)}
                min={todayIso()}
                required
              />
              <Field
                label="Check Out Date"
                type="date"
                icon={<CalendarIcon className="h-4 w-4" />}
                value={form.checkOut}
                onChange={(v) => update("checkOut", v)}
                min={form.checkIn || todayIso()}
                required
              />
            </div>
            <Field
              label="Adults"
              options={["1", "2", "3", "4"]}
              icon={<UserIcon className="h-4 w-4" />}
              value={form.adults}
              onChange={(v) => update("adults", v)}
              required
            />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field
                label="Child"
                options={["0", "1", "2", "3"]}
                icon={<UsersIcon className="h-4 w-4" />}
                value={form.children}
                onChange={(v) => update("children", v)}
                required
              />
              <Field
                label="Room"
                options={[
                  "Room 200 — Bisoke Wing ($40)",
                  "Room 201 — Bisoke Wing ($30)",
                  "Room 202 — Bisoke Wing ($30)",
                  "Room 203 — Bisoke Wing ($40)",
                  "Room 204 — Bisoke Wing ($40)",
                  "Room 205 — Sabyinyo Wing ($100)",
                  "Room 206 — Sabyinyo Wing ($40)",
                  "Room 207 — Sabyinyo Wing ($30)",
                  "Room 208 — Sabyinyo Wing ($30)",
                  "Room 209 — Sabyinyo Wing ($40)",
                  "Room 210 — Sabyinyo Wing ($40)",
                  "Room 211 — Karisimbi Wing ($140)",
                  "Room 212 — Karisimbi Wing ($30)",
                  "Room 213 — Karisimbi Wing ($30)",
                  "Apartment I — Gahinga Wing ($50)",
                  "Apartment II — Gahinga Wing ($50)",
                  "Suite Home — Muhabura Wing ($70)",
                  "Room 214 — Muhabura Wing ($50)",
                ]}
                icon={<RoomDoorIcon className="h-4 w-4" />}
                value={form.roomType}
                onChange={(v) => update("roomType", v)}
                required
              />
            </div>
            <Field
              label="Full Name"
              type="text"
              placeholder="Your full name"
              icon={<UserIcon className="h-4 w-4" />}
              value={form.guestName}
              onChange={(v) => update("guestName", v)}
              required
            />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field
                label="Email"
                type="email"
                placeholder="you@email.com"
                icon={<MailIcon className="h-4 w-4" />}
                value={form.email}
                onChange={(v) => update("email", v)}
                required
              />
              <Field
                label="Phone"
                type="tel"
                placeholder="+250 ..."
                icon={<PhoneIcon className="h-4 w-4" />}
                value={form.phone}
                onChange={(v) => update("phone", v)}
                required
              />
            </div>
            <motion.button
              type="submit"
              disabled={status === "loading"}
              className="mt-1 bg-[#6b4423] px-6 py-3.5 text-[13px] font-semibold tracking-[0.12em] text-white! uppercase disabled:opacity-60 sm:w-[70%]"
              whileHover={{ scale: status === "loading" ? 1 : 1.03, backgroundColor: "#54341a" }}
              whileTap={{ scale: 0.97 }}
            >
              {status === "loading" ? "Sending..." : "Check Availability"}
            </motion.button>
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
