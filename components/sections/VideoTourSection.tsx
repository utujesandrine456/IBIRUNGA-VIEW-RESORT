"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { YoutubeIcon } from "@/components/ui/Icons";
import { fadeInUp, scaleIn } from "@/lib/motion";
import { images } from "@/lib/content";

export function VideoTourSection() {
  return (
    <section className="relative flex min-h-105 items-center justify-center overflow-hidden py-24">
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.1 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <Image
          src={images.video}
          alt="Resort outdoor dining tour"
          fill
          className="object-cover"
          sizes="100vw"
        />
      </motion.div>
      <div className="absolute inset-0 bg-black/55" />
      <motion.div
        className="relative z-10 flex flex-col items-center px-4 text-center text-white"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.button
          type="button"
          aria-label="Watch resort tour on YouTube"
          className="mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-xl"
          variants={scaleIn}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <YoutubeIcon className="h-10 w-10" style={{ color: "#FF0000" }} />
        </motion.button>
        <h2 className="text-3xl font-bold md:text-4xl lg:text-5xl">
          Take A Tour Of Luxury
        </h2>
      </motion.div>
    </section>
  );
}
