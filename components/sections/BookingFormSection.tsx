"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { fadeInLeft, fadeInRight } from "@/lib/motion";
import { images } from "@/lib/content";

function Field({
  label,
  type = "text",
  options,
}: {
  label: string;
  type?: string;
  options?: string[];
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.14em] text-muted">
        {label}
      </span>
      {options ? (
        <select className="w-full border border-border bg-white px-3 py-3 text-sm outline-none focus:border-brown">
          {options.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          className="w-full border border-border bg-white px-3 py-3 text-sm outline-none focus:border-brown"
        />
      )}
    </label>
  );
}

export function BookingFormSection() {
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
          <h2 className="mb-8 text-3xl font-bold text-brown-deep">Book A Room</h2>
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Check In" type="date" />
              <Field label="Check Out" type="date" />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Adult" options={["1", "2", "3", "4"]} />
              <Field label="Room Type" options={["Deluxe", "Standard", "Suite"]} />
            </div>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button className="mt-2 w-full">Book Now</Button>
            </motion.div>
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
            src={images.booking}
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
