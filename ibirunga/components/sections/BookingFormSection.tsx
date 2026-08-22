"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { useCmsContent } from "@/components/providers/ContentProvider";
import { fadeInLeft, fadeInRight } from "@/lib/motion";
import { api } from "@/lib/api";

function Field({
  label,
  type = "text",
  options,
  value,
  onChange,
  required,
}: {
  label: string;
  type?: string;
  options?: string[];
  value?: string;
  onChange?: (value: string) => void;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.14em] text-muted">
        {label}
      </span>
      {options ? (
        <select
          className="w-full border border-border bg-white px-3 py-3 text-sm outline-none focus:border-brown"
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          required={required}
        >
          {options.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          className="w-full border border-border bg-white px-3 py-3 text-sm outline-none focus:border-brown"
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          required={required}
        />
      )}
    </label>
  );
}

export function BookingFormSection() {
  const { bookingForm } = useCmsContent();
  const [form, setForm] = useState({
    guestName: "",
    email: "",
    phone: "",
    checkIn: "",
    checkOut: "",
    adults: "2",
    roomType: "Room 200 — Bisoke Wing ($40)",
    specialRequests: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (form.checkOut && form.checkIn && form.checkOut <= form.checkIn) {
      setStatus("error");
      setMessage("Check-out date must be after check-in.");
      return;
    }
    setStatus("loading");
    setMessage("");
    try {
      await api.createBooking({
        guestName: form.guestName.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        checkIn: form.checkIn,
        checkOut: form.checkOut,
        adults: Number(form.adults),
        roomType: form.roomType,
        specialRequests: form.specialRequests.trim() || undefined,
        source: "contact-form",
      });
      setStatus("success");
      setMessage("Your booking request was sent successfully. We will contact you soon.");
      setForm({
        guestName: "",
        email: "",
        phone: "",
        checkIn: "",
        checkOut: "",
        adults: "2",
        roomType: "Room 200 — Bisoke Wing ($40)",
        specialRequests: "",
      });
    } catch (err) {
      setStatus("error");
      setMessage(
        err instanceof Error
          ? err.message
          : "Could not send booking request. Please try again or call us directly.",
      );
    }
  }

  return (
    <section id="contact" className="scroll-mt-32.5 bg-white py-20 md:py-28">
      <motion.div
        className="mx-auto grid max-w-7xl overflow-hidden shadow-[0_18px_50px_rgba(60,40,20,0.08)] lg:grid-cols-2"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div
          className="bg-cream px-8 py-12 md:px-12"
          variants={fadeInLeft}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="mb-8 text-3xl font-bold text-brown-deep">
            {bookingForm.title ?? "Book A Room"}
          </h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <Field label="Full Name" value={form.guestName} onChange={(v) => setForm({ ...form, guestName: v })} required />
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Email" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} required />
              <Field label="Phone" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} required />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Check In" type="date" value={form.checkIn} onChange={(v) => setForm({ ...form, checkIn: v })} required />
              <Field label="Check Out" type="date" value={form.checkOut} onChange={(v) => setForm({ ...form, checkOut: v })} required />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Adult" options={["1", "2", "3", "4"]} value={form.adults} onChange={(v) => setForm({ ...form, adults: v })} required />
              <Field label="Room Type" options={[
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
              ]} value={form.roomType} onChange={(v) => setForm({ ...form, roomType: v })} required />
            </div>
            <Field label="Special Requests" value={form.specialRequests} onChange={(v) => setForm({ ...form, specialRequests: v })} />
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button className="mt-2 w-full" type="submit" disabled={status === "loading"}>
                {status === "loading" ? "Sending..." : "Book Now"}
              </Button>
            </motion.div>
            {message ? (
              <p className={`text-sm ${status === "success" ? "text-brown" : "text-red-600"}`}>{message}</p>
            ) : null}
          </form>
        </motion.div>
        <motion.div
          className="relative min-h-80"
          variants={fadeInRight}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            src={bookingForm.image ?? "/LUCIMAGES_16.JPG"}
            alt="Resort lounge interior"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
