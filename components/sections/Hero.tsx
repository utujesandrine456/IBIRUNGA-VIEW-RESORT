"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import {
  CalendarIcon,
  RoomDoorIcon,
  UserIcon,
  UsersIcon,
} from "@/components/ui/Icons";
import { ease, fadeInLeft, fadeInRight } from "@/lib/motion";
import { images } from "@/lib/content";

function Field({
  label,
  type = "text",
  options,
  placeholder,
  icon,
}: {
  label: string;
  type?: string;
  options?: string[];
  placeholder?: string;
  icon: ReactNode;
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
        <select className="w-full appearance-none border border-[#d8d8d8] bg-white px-3 py-3 text-sm text-[#6b6b6b] outline-none transition focus:border-brown">
          {options.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          className="w-full border border-[#d8d8d8] bg-white px-3 py-3 text-sm text-[#6b6b6b] outline-none transition focus:border-brown"
          placeholder={placeholder ?? label}
        />
      )}
    </label>
  );
}

export function Hero() {
  return (
    <section id="home" className="relative min-h-[92vh] overflow-hidden">
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.4, ease }}
      >
        <Image
          src={images.hero}
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
            Enjoy A Luxury Experience
          </h1>
          <p className="mb-8 max-w-md text-base leading-relaxed text-white/85 md:text-lg">
            Rest above the hills of Musanze and wake to volcano views, warm hospitality,
            and thoughtfully prepared spaces for every guest.
          </p>
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
            <Button variant="outlineLight">Discover</Button>
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
          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <Field
                label="Check In Date"
                type="date"
                placeholder="mm / dd / yyyy"
                icon={<CalendarIcon className="h-4 w-4" />}
              />
              <Field
                label="Check Out Date"
                type="date"
                placeholder="mm / dd / yyyy"
                icon={<CalendarIcon className="h-4 w-4" />}
              />
            </div>
            <Field
              label="Adults"
              options={["Adults", "1", "2", "3", "4"]}
              icon={<UserIcon className="h-4 w-4" />}
            />
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <Field
                label="Child"
                options={["Child", "0", "1", "2", "3"]}
                icon={<UsersIcon className="h-4 w-4" />}
              />
              <Field
                label="Room"
                options={["Room", "Deluxe", "Standard", "Suite"]}
                icon={<RoomDoorIcon className="h-4 w-4" />}
              />
            </div>
            <motion.button
              type="submit"
              className="mt-1 bg-[#5d4026] px-6 py-3.5 text-[13px] font-semibold tracking-[0.12em] text-white uppercase sm:w-[70%]"
              whileHover={{ scale: 1.03, backgroundColor: "#4a331e" }}
              whileTap={{ scale: 0.97 }}
            >
              Check Availability
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
