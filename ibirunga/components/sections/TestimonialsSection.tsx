"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { ease, fadeInUp } from "@/lib/motion";
import { useCmsContent } from "@/components/providers/ContentProvider";

const offsets = [-1, 0, 1] as const;

function getDirection(from: number, to: number, total: number) {
  const diff = to - from;
  if (diff === 0) return 0;
  if (Math.abs(diff) <= total / 2) return diff > 0 ? 1 : -1;
  return diff > 0 ? -1 : 1;
}

const slideVariants = {
  enter: (dir: number) => ({
    x: dir >= 0 ? 120 : -120,
    opacity: 0,
    filter: "blur(6px)",
    scale: 0.95,
  }),
  center: {
    x: 0,
    opacity: 1,
    filter: "blur(0px)",
    scale: 1,
  },
  side: {
    x: 0,
    opacity: 0.5,
    filter: "blur(3px)",
    scale: 0.97,
  },
  exit: (dir: number) => ({
    x: dir >= 0 ? -120 : 120,
    opacity: 0,
    filter: "blur(6px)",
    scale: 0.95,
  }),
};

export function TestimonialsSection() {
  const { testimonials, testimonialsMeta } = useCmsContent();
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(0);
  const total = testimonials.length;

  const goTo = (index: number) => {
    if (index === active) return;
    setDirection(getDirection(active, index, total));
    setActive(index);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setActive((current) => (current + 1) % total);
    }, 5500);
    return () => clearInterval(timer);
  }, [total]);

  return (
    <section className="bg-[#2a1d14] py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <motion.div
          className="mx-auto mb-14 max-w-2xl text-center"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease }}
        >
          <p className="mb-3 text-sm font-semibold tracking-[0.22em] text-[#c19a6b] uppercase">
            {(testimonialsMeta.eyebrow as string) ?? "Testimonial"}
          </p>
          <h2 className="text-3xl font-bold text-white md:text-4xl">
            {(testimonialsMeta.title as string) ?? "What Our Clients Say"}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 items-stretch gap-5 overflow-hidden md:grid-cols-3 md:gap-5 lg:gap-6">
          {offsets.map((offset) => {
            const index = (active + offset + total) % total;
            const item = testimonials[index];
            const isCenter = offset === 0;

            return (
              <div key={offset} className="relative min-h-50">
                <AnimatePresence mode="popLayout" custom={direction}>
                  <motion.button
                    key={`${index}-${active}`}
                    type="button"
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate={isCenter ? "center" : "side"}
                    exit="exit"
                    onClick={() => {
                      if (!isCenter) goTo(index);
                    }}
                    className={`absolute inset-0 rounded-tl-xl border-t border-l border-white/15 bg-[#1a120c] px-7 py-6 text-left md:px-8 md:py-7 ${
                      isCenter ? "" : "cursor-pointer"
                    }`}
                    transition={{ duration: 0.55, ease }}
                    whileHover={!isCenter ? { opacity: 0.72, scale: 0.98 } : {}}
                    aria-label={
                      isCenter
                        ? `Current testimonial from ${item.name}`
                        : `Show testimonial from ${item.name}`
                    }
                  >
                    <p className="mb-6 text-[15px] leading-7 text-white md:text-base md:leading-7">
                      &ldquo;{item.text}&rdquo;
                    </p>

                    <div className="flex items-center gap-3">
                      <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                          sizes="44px"
                        />
                      </div>
                      <div>
                        <h3 className="font-bold text-white">{item.name}</h3>
                        <p className="text-sm text-white/55">{item.role}</p>
                      </div>
                    </div>
                  </motion.button>
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        <div className="mt-10 flex items-center justify-center gap-2.5">
          {testimonials.map((item, index) => (
            <motion.button
              key={item.name}
              type="button"
              aria-label={`Show testimonial from ${item.name}`}
              onClick={() => goTo(index)}
              className={`h-2.5 rounded-full ${
                index === active ? "bg-[#c19a6b]" : "bg-white/25 hover:bg-white/40"
              }`}
              animate={{ width: index === active ? 36 : 10 }}
              transition={{ duration: 0.35, ease }}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
