"use client";

import { motion, AnimatePresence } from "framer-motion";
import { SpaIcon, XIcon } from "@/components/ui/Icons";
import { createContext, useContext, useState } from "react";

const PromoContext = createContext<{ bannerVisible: boolean }>({ bannerVisible: false });

export function usePromoBanner() {
  return useContext(PromoContext);
}

export function PromoProvider({ children }: { children: React.ReactNode }) {
  const [visible, setVisible] = useState(true);

  return (
    <PromoContext.Provider value={{ bannerVisible: visible }}>
      <AnimatePresence>
        {visible && (
          <motion.div
            className="fixed top-0 inset-x-0 z-100 bg-[#e8a317] px-4 py-3 shadow-[0_4px_18px_rgba(180,100,0,0.35)]"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="mx-auto flex max-w-7xl items-center justify-between gap-3">
              <div className="flex flex-1 flex-wrap items-center justify-center gap-x-3 gap-y-1 text-center">
                <span className="inline-flex items-center rounded-md bg-[#2a1d14] px-2.5 py-1 text-[10px] font-bold tracking-[0.14em] text-[#e8a317] uppercase">
                  Limited Offer
                </span>
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#2a1d14]">
                  <SpaIcon className="h-4 w-4 text-[#2a1d14]" />
                  Sauna Services — From{" "}
                  <span className="line-through opacity-60">4,000 Frw</span>
                  <span className="font-bold text-[#2a1d14]">3,000 Frw</span>
                </span>
                <span className="rounded-md border border-[#2a1d14]/35 px-2 py-0.5 text-[11px] font-medium text-[#2a1d14]">
                  Ends September
                </span>
              </div>
              <button
                type="button"
                onClick={() => setVisible(false)}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#2a1d14]/15 text-[#2a1d14] transition-colors hover:bg-[#2a1d14]/25"
                aria-label="Close promotion"
              >
                <XIcon className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {children}
    </PromoContext.Provider>
  );
}
