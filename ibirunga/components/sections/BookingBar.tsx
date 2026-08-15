"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { SearchIcon } from "@/components/ui/Icons";
import { scaleIn } from "@/lib/motion";
import { api } from "@/lib/api";

function InlineField({
  label,
  type = "text",
  options,
  value,
  onChange,
  required,
  min,
}: {
  label: string;
  type?: string;
  options?: string[];
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  min?: string;
}) {
  return (
    <label className="min-w-0 flex-1 border-r border-border px-4 py-3 last:border-r-0">
      <span className="mb-1 block text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
        {label}
      </span>
      {options ? (
        <select
          className="w-full bg-transparent text-sm text-foreground outline-none"
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
          className="w-full bg-transparent text-sm text-foreground outline-none"
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

export function BookingBar() {
  const [form, setForm] = useState({
    checkIn: todayIso(),
    checkOut: tomorrowIso(),
    adults: "2",
    children: "0",
    rooms: "1",
    guestName: "",
    email: "",
    phone: "",
  });
  const [showContact, setShowContact] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  function update(field: keyof typeof form, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!showContact) {
      if (form.checkOut <= form.checkIn) {
        setStatus("error");
        setMessage("Check-out must be after check-in.");
        return;
      }
      setShowContact(true);
      setStatus("idle");
      setMessage("Enter your contact details to complete the request.");
      return;
    }

    if (!form.guestName.trim() || !form.email.trim() || !form.phone.trim()) {
      setStatus("error");
      setMessage("Please fill in name, email, and phone.");
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
        roomCount: Number(form.rooms),
        guestName: form.guestName.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        source: "booking-bar",
      });
      setStatus("success");
      setMessage("Booking request sent. We will contact you soon.");
      setShowContact(false);
      setForm((prev) => ({
        ...prev,
        guestName: "",
        email: "",
        phone: "",
      }));
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Could not send booking request.");
    }
  }

  return (
    <section className="relative z-20 -mt-10 px-4 md:px-6">
      <motion.form
        className="mx-auto max-w-7xl overflow-hidden bg-white shadow-[0_18px_50px_rgba(60,40,20,0.12)]"
        onSubmit={handleSubmit}
        variants={scaleIn}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="flex flex-col lg:flex-row lg:items-stretch">
          <div className="grid flex-1 grid-cols-1 sm:grid-cols-2 lg:flex lg:items-center">
            <InlineField
              label="Check In"
              type="date"
              value={form.checkIn}
              onChange={(v) => update("checkIn", v)}
              min={todayIso()}
              required
            />
            <InlineField
              label="Check Out"
              type="date"
              value={form.checkOut}
              onChange={(v) => update("checkOut", v)}
              min={form.checkIn || todayIso()}
              required
            />
            <InlineField
              label="Adult"
              options={["1", "2", "3", "4"]}
              value={form.adults}
              onChange={(v) => update("adults", v)}
              required
            />
            <InlineField
              label="Children"
              options={["0", "1", "2", "3"]}
              value={form.children}
              onChange={(v) => update("children", v)}
              required
            />
            <InlineField
              label="Rooms"
              options={["1", "2", "3"]}
              value={form.rooms}
              onChange={(v) => update("rooms", v)}
              required
            />
          </div>
          <motion.button
            type="submit"
            disabled={status === "loading"}
            className="inline-flex items-center justify-center gap-2 bg-brown px-8 py-5 text-sm font-semibold uppercase tracking-[0.14em] text-white! disabled:opacity-60"
            whileHover={{ backgroundColor: "#54341a", scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
          >
            <SearchIcon className="h-4 w-4" />
            {status === "loading" ? "Sending..." : showContact ? "Submit" : "Check"}
          </motion.button>
        </div>

        {showContact ? (
          <div className="grid gap-3 border-t border-border bg-cream/50 px-4 py-4 sm:grid-cols-3">
            <input
              type="text"
              placeholder="Full name"
              className="border border-border bg-white px-3 py-3 text-sm outline-none focus:border-brown"
              value={form.guestName}
              onChange={(e) => update("guestName", e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Email"
              className="border border-border bg-white px-3 py-3 text-sm outline-none focus:border-brown"
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              required
            />
            <input
              type="tel"
              placeholder="Phone"
              className="border border-border bg-white px-3 py-3 text-sm outline-none focus:border-brown"
              value={form.phone}
              onChange={(e) => update("phone", e.target.value)}
              required
            />
          </div>
        ) : null}

        {message ? (
          <p
            className={`border-t border-border px-4 py-3 text-sm ${
              status === "success" ? "text-brown" : status === "error" ? "text-red-600" : "text-muted"
            }`}
          >
            {message}
          </p>
        ) : null}
      </motion.form>
    </section>
  );
}
