"use client";

import { motion, AnimatePresence } from "framer-motion";
import { XIcon } from "@/components/ui/Icons";
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
            className="fixed top-0 inset-x-0 z-[100] bg-[#c8102e] px-4 py-2.5 shadow-lg"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
              <div className="flex-1 text-center">
                <p className="text-sm font-semibold text-white">
                  <span className="inline-block rounded-sm bg-white px-2 py-0.5 text-[10px] font-black uppercase tracking-widest text-[#c8102e] mr-3">
                    Limited Offer
                  </span>
                  🧖 Sauna Service Special — From{" "}
                  <span className="line-through opacity-70">4,000 Frw</span>{" "}
                  to{" "}
                  <span className="font-black text-yellow-300 text-base">3,000 Frw</span>
                  <span className="ml-3 rounded-full border border-white/50 px-2 py-0.5 text-[11px] text-white/90">
                    Ends September
                  </span>
                </p>
              </div>
              <button
                onClick={() => setVisible(false)}
                className="shrink-0 text-white/80 hover:text-white transition-colors"
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
