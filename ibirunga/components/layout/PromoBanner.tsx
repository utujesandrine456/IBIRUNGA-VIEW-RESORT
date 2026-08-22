"use client";

import { motion } from "framer-motion";
import { XIcon } from "@/components/ui/Icons";
import { useState } from "react";

export function PromoBanner() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <motion.div
      className="fixed top-0 inset-x-0 z-[100] bg-gradient-to-r from-[#6b4423] to-[#8b5a2b] px-4 py-3 shadow-lg"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      exit={{ y: -100 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        <div className="flex-1 text-center md:text-left">
          <p className="text-sm font-semibold text-white md:text-base">
            <span className="inline-block rounded-full bg-white/20 px-2 py-0.5 text-xs font-bold uppercase tracking-wide mr-2">
              Limited Offer
            </span>
            Sauna Service Special — 25% Off! From 4,000 Frw to{" "}
            <span className="font-bold text-[#ffd700]">3,000 Frw</span>
            <span className="ml-2 text-xs text-white/90">(Ends September)</span>
          </p>
        </div>
        <button
          onClick={() => setVisible(false)}
          className="shrink-0 text-white/80 hover:text-white transition-colors"
          aria-label="Close promotion"
        >
          <XIcon className="h-5 w-5" />
        </button>
      </div>
    </motion.div>
  );
}
