"use client";

import { motion } from "framer-motion";
import { PricingCard } from "@/components/ui/Cards";
import { MotionItem, MotionStagger } from "@/components/ui/Motion";
import { useCmsContent } from "@/components/providers/ContentProvider";
import { fadeInLeft, fadeInRight, staggerContainer } from "@/lib/motion";

export function ExtraServicesSection() {
  const { extraServices, extraMeta } = useCmsContent();
  const paragraphs = (extraMeta.paragraphs as string[] | undefined) ?? [];

  return (
    <section id="extra" className="relative overflow-hidden bg-white py-20 md:py-28">
      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 px-4 md:px-6 lg:grid-cols-[0.95fr_1.15fr] lg:gap-16">
        <motion.div
          className="relative max-w-lg py-6"
          variants={fadeInLeft}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="mb-4 text-[15px] font-semibold text-[#b08d6a]">
            {(extraMeta.eyebrow as string) ?? "Best Prices"}
          </p>
          <h2 className="mb-6 text-4xl font-bold leading-[1.1] text-black md:text-5xl lg:text-[3.4rem]">
            {(extraMeta.title as string) ?? "Extra Services"}
          </h2>
          {paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 24)} className="mb-5 max-w-md text-[15px] leading-7 text-[#8a8a8a] last:mb-0">
              {paragraph}
            </p>
          ))}
        </motion.div>

        <MotionStagger className="grid gap-6 sm:grid-cols-2" stagger={staggerContainer}>
          {extraServices.map((service) => (
            <MotionItem key={service.id ?? service.title} variants={fadeInRight}>
              <PricingCard {...service} />
            </MotionItem>
          ))}
        </MotionStagger>
      </div>
    </section>
  );
}
