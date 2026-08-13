"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { testimonials } from "@/lib/content";

export function TestimonialsSection() {
  const [active, setActive] = useState(0);
  const total = testimonials.length;

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((current) => (current + 1) % total);
    }, 5500);
    return () => clearInterval(timer);
  }, [total]);

  const prev = (active - 1 + total) % total;
  const next = (active + 1) % total;
  const slides = [
    { index: prev, position: "left" as const },
    { index: active, position: "center" as const },
    { index: next, position: "right" as const },
  ];

  return (
    <section className="bg-[#2a1d14] py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <p className="mb-3 text-sm font-semibold tracking-[0.22em] text-[#c19a6b] uppercase">
            Testimonial
          </p>
          <h2 className="text-3xl font-bold text-white md:text-4xl">
            What Our Clients Say
          </h2>
        </div>

        <div className="grid grid-cols-1 items-stretch gap-5 md:grid-cols-3 md:gap-5 lg:gap-6">
          {slides.map(({ index, position }) => {
            const item = testimonials[index];
            const isCenter = position === "center";

            return (
              <button
                key={`${item.name}-${position}`}
                type="button"
                onClick={() => {
                  if (!isCenter) setActive(index);
                }}
                className={`rounded-tl-xl border-t border-l border-white/15 bg-[#1a120c] px-7 py-6 text-left transition-all duration-500 md:px-8 md:py-7 ${
                  isCenter
                    ? "opacity-100 blur-0"
                    : "cursor-pointer opacity-50 blur-[3px] hover:opacity-70"
                }`}
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
              </button>
            );
          })}
        </div>

        <div className="mt-10 flex items-center justify-center gap-2.5">
          {testimonials.map((item, index) => (
            <button
              key={item.name}
              type="button"
              aria-label={`Show testimonial from ${item.name}`}
              onClick={() => setActive(index)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                index === active
                  ? "w-8 bg-[#c19a6b]"
                  : "w-2.5 bg-white/25 hover:bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
