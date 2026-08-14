"use client";

import { motion } from "framer-motion";
import { defaultTransition, fadeInUp, viewport } from "@/lib/motion";

type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "center" | "left";
  light?: boolean;
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "center",
  light = false,
}: SectionHeaderProps) {
  return (
    <motion.div
      className={`mb-12 max-w-2xl ${align === "center" ? "mx-auto text-center" : "text-left"}`}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={fadeInUp}
      transition={defaultTransition}
    >
      {eyebrow ? (
        <motion.p
          className={`mb-3 text-sm font-semibold tracking-[0.2em] uppercase ${
            light ? "text-white/80" : "text-brown"
          }`}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{ ...defaultTransition, delay: 0.05 }}
        >
          {eyebrow}
        </motion.p>
      ) : null}
      <h2
        className={`text-3xl md:text-4xl lg:text-[2.75rem] font-bold leading-tight ${
          light ? "text-white" : "text-brown-deep"
        }`}
      >
        {title}
      </h2>
      {description ? (
        <motion.p
          className={`mt-4 text-base leading-relaxed ${
            light ? "text-white/75" : "text-muted"
          }`}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewport}
          transition={{ ...defaultTransition, delay: 0.15 }}
        >
          {description}
        </motion.p>
      ) : null}
    </motion.div>
  );
}
