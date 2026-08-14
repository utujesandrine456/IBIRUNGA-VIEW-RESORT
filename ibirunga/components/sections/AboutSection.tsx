"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { CheckIcon } from "@/components/ui/Icons";
import { MotionItem, MotionStagger } from "@/components/ui/Motion";
import { fadeInLeft, fadeInRight, fadeInUp, staggerContainer } from "@/lib/motion";
import { useCmsContent } from "@/components/providers/ContentProvider";

export function AboutSection() {
  const { about } = useCmsContent();
  const paragraphs = (about.paragraphs as string[] | undefined) ?? [];
  const features = (about.features as string[] | undefined) ?? [];
  return (
    <section id="about" className="bg-white py-20 md:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 md:px-6 lg:grid-cols-2 lg:gap-16">
        <motion.div
          className="relative mx-auto w-full max-w-lg pb-14"
          variants={fadeInLeft}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="relative h-80 overflow-hidden sm:h-95 lg:h-100">
            <Image
              src={(about.mainImage as string) ?? "/LUCIMAGES_15.JPG"}
              alt="Resort reception entrance"
              fill
              className="object-cover object-[center_35%]"
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
          </div>
          <motion.div
            className="absolute bottom-0 right-0 w-[52%] overflow-hidden border-8 border-white shadow-xl sm:w-[48%]"
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative aspect-16/11">
              <Image
                src={(about.sideImage as string) ?? "/LUCIMAGES_26.JPG"}
                alt="Comfortable guest room"
                fill
                className="object-cover"
                sizes="280px"
              />
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          variants={fadeInRight}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-brown">
            {(about.eyebrow as string) ?? "About Us"}
          </p>
          <h2 className="mb-5 text-3xl font-bold leading-tight text-brown-deep md:text-4xl">
            {(about.title as string) ?? "Most Safe & Rated Hotel In Musanze."}
          </h2>
          {paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 24)} className="mb-4 text-[15px] leading-relaxed text-muted">
              {paragraph}
            </p>
          ))}

          <MotionStagger
            as="ul"
            className="mb-8 grid list-none gap-3 sm:grid-cols-2"
            stagger={staggerContainer}
          >
            {features.map((feature) => (
              <MotionItem key={feature} as="li" variants={fadeInUp}>
                <span className="flex items-start gap-3 text-[15px] text-foreground">
                  <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brown text-white">
                    <CheckIcon className="h-3 w-3" />
                  </span>
                  {feature}
                </span>
              </MotionItem>
            ))}
          </MotionStagger>

          <div className="flex flex-wrap items-center gap-6">
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Button>{(about.ctaLabel as string) ?? "Learn More"}</Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
