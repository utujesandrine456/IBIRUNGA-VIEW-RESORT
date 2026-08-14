"use client";

import { motion } from "framer-motion";
import { SearchIcon } from "@/components/ui/Icons";
import { scaleIn } from "@/lib/motion";

function InlineField({
  label,
  type = "text",
  options,
}: {
  label: string;
  type?: string;
  options?: string[];
}) {
  return (
    <label className="min-w-0 flex-1 border-r border-border px-4 py-3 last:border-r-0">
      <span className="mb-1 block text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
        {label}
      </span>
      {options ? (
        <select className="w-full bg-transparent text-sm text-foreground outline-none">
          {options.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          className="w-full bg-transparent text-sm text-foreground outline-none"
        />
      )}
    </label>
  );
}

export function BookingBar() {
  return (
    <section className="relative z-20 -mt-10 px-4 md:px-6">
      <motion.form
        className="mx-auto flex max-w-7xl flex-col overflow-hidden bg-white shadow-[0_18px_50px_rgba(60,40,20,0.12)] lg:flex-row lg:items-stretch"
        onSubmit={(e) => e.preventDefault()}
        variants={scaleIn}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="grid flex-1 grid-cols-1 sm:grid-cols-2 lg:flex lg:items-center">
          <InlineField label="Check In" type="date" />
          <InlineField label="Check Out" type="date" />
          <InlineField label="Adult" options={["1", "2", "3", "4"]} />
          <InlineField label="Children" options={["0", "1", "2", "3"]} />
          <InlineField label="Rooms" options={["1", "2", "3"]} />
        </div>
        <motion.button
          type="submit"
          className="inline-flex items-center justify-center gap-2 bg-brown px-8 py-5 text-sm font-semibold uppercase tracking-[0.14em] text-white"
          whileHover={{ backgroundColor: "#54341a", scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
        >
          <SearchIcon className="h-4 w-4" />
          Check
        </motion.button>
      </motion.form>
    </section>
  );
}
