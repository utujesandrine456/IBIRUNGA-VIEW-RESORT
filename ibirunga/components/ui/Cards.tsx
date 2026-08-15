"use client";

import { motion } from "framer-motion";
import {
  ArrowRightIcon,
  CircleCheckIcon,
  CoffeeIcon,
  QuoteIcon,
  ShowerIcon,
  StarIcon,
  TvIcon,
  WifiIcon,
  BedIcon,
} from "@/components/ui/Icons";
import Image from "next/image";
import type { ComponentType, SVGProps } from "react";

function ImigongoAccent() {
  return (
    <svg viewBox="0 0 320 8" preserveAspectRatio="none" className="h-2 w-full" aria-hidden="true">
      <path
        d="M0 4 L16 0 L32 4 L48 0 L64 4 L80 0 L96 4 L112 0 L128 4 L144 0 L160 4 L176 0 L192 4 L208 0 L224 4 L240 0 L256 4 L272 0 L288 4 L304 0 L320 4"
        fill="none"
        stroke="#c19a6b"
        strokeWidth="1.5"
        opacity="0.55"
      />
    </svg>
  );
}

export function ServiceCard({
  title,
  description,
  image,
  index,
}: {
  title: string;
  description: string;
  image: string;
  index: number;
}) {
  return (
    <motion.article
      className="group relative flex flex-col overflow-hidden rounded-tl-2xl bg-white shadow-[0_10px_35px_rgba(60,40,20,0.07)]"
      whileHover={{ y: -8, boxShadow: "0 24px 55px rgba(60,40,20,0.14)" }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="relative aspect-5/4 overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute inset-0 bg-linear-to-t from-brown-deep/90 via-brown/25 to-transparent" />
        <div className="absolute inset-0 border border-white/10" />

        <span className="absolute top-4 left-4 rounded-full bg-white/15 px-3 py-1 text-[11px] font-semibold tracking-[0.22em] text-white backdrop-blur-sm">
          {String(index + 1).padStart(2, "0")}
        </span>

        <div className="absolute right-0 bottom-0 left-0 p-6">
          <h3 className="text-xl font-bold text-white md:text-2xl">{title}</h3>
        </div>
      </div>

      <div className="relative flex flex-1 flex-col border-t border-cream-dark px-6 py-5">
        <ImigongoAccent />
        <p className="mt-4 mb-5 flex-1 text-[15px] leading-relaxed text-muted">{description}</p>
        <a
          href="#rooms"
          className="inline-flex items-center gap-2 text-sm font-semibold text-brown transition-colors hover:text-brown-dark"
        >
          Read More
          <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </a>
      </div>

      <span className="pointer-events-none absolute top-0 left-0 h-16 w-16 border-t-2 border-l-2 border-brown/30 rounded-tl-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </motion.article>
  );
}

type FeatureIcon = ComponentType<SVGProps<SVGSVGElement>>;

const roomFeatures: { Icon: FeatureIcon; label: string }[] = [
  { Icon: WifiIcon, label: "WiFi" },
  { Icon: TvIcon, label: "TV" },
  { Icon: CoffeeIcon, label: "Coffee" },
  { Icon: BedIcon, label: "Bed" },
  { Icon: ShowerIcon, label: "Bath" },
];

function RoomFeatureChip({ Icon, label }: { Icon: FeatureIcon; label: string }) {
  return (
    <div className="group/chip flex flex-col items-center gap-2 cursor-pointer">
      <span className="relative inline-flex h-11 w-11 items-center justify-center rounded-full bg-cream shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_4px_14px_rgba(107,68,35,0.1)] ring-1 ring-border transition-all duration-300 group-hover/chip:-translate-y-0.5 group-hover/chip:bg-brown group-hover/chip:shadow-[0_8px_20px_rgba(107,68,35,0.22)] group-hover/chip:ring-brown/30">
        <Icon className="h-5 w-5 text-brown transition-colors duration-300 group-hover/chip:text-white!" />
      </span>
      <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-brown/65 transition-colors group-hover/chip:text-brown">
        {label}
      </span>
    </div>
  );
}


export function RoomCard({
  src,
  title,
  price,
  category,
}: {
  src: string;
  title: string;
  price: string;
  category: string;
}) {
  return (
    <motion.article
      className="group overflow-hidden bg-white shadow-[0_8px_30px_rgba(60,40,20,0.06)]"
      whileHover={{ y: -4, boxShadow: "0 16px 40px rgba(60,40,20,0.12)" }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="relative aspect-4/3 overflow-hidden">
        <Image
          src={src}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute inset-x-0 bottom-0 bg-brown px-5 py-2.5 text-sm font-semibold text-white!">
          From {price} / Night
        </div>
      </div>
      <div className="px-6 py-6">
        <p className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-brown">
          {category}
        </p>
        <h3 className="mb-3 text-xl font-bold text-brown-deep">{title}</h3>
        <p className="mb-5 text-[15px] leading-relaxed text-muted">
          Spacious comfort with fresh linens, thoughtful details, and a calm atmosphere for your stay.
        </p>
        <div className="flex flex-wrap items-end gap-4 border-t border-cream-dark pt-5">
          {roomFeatures.map(({ Icon, label }) => (
            <RoomFeatureChip key={label} Icon={Icon} label={label} />
          ))}
        </div>
      </div>
    </motion.article>
  );
}

export function TestimonialCard({
  name,
  role,
  text,
  image,
}: {
  name: string;
  role: string;
  text: string;
  image: string;
}) {
  return (
    <article className="relative bg-white px-7 py-8 shadow-[0_8px_30px_rgba(60,40,20,0.05)]">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="relative h-12 w-12 overflow-hidden rounded-full">
            <Image
              src={image}
              alt={name}
              fill
              className="object-cover"
              sizes="48px"
            />
          </div>
          <div>
            <h3 className="font-bold text-brown-deep">{name}</h3>
            <p className="text-sm text-muted">{role}</p>
          </div>
        </div>
        <QuoteIcon className="h-8 w-8 rotate-[-8deg] text-brown/35" />
      </div>
      <div className="mb-4 flex gap-1 text-brown">
        {Array.from({ length: 5 }).map((_, i) => (
          <StarIcon key={i} className="h-4 w-4" />
        ))}
      </div>
      <p className="text-[15px] leading-relaxed text-muted">{text}</p>
    </article>
  );
}

export function BlogCard({
  src,
  date,
  title,
  excerpt,
}: {
  src: string;
  date: string;
  title: string;
  excerpt: string;
}) {
  return (
    <motion.article
      className="group overflow-hidden bg-white shadow-[0_8px_30px_rgba(60,40,20,0.05)]"
      whileHover={{ y: -4, boxShadow: "0 16px 40px rgba(60,40,20,0.1)" }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="relative aspect-16/11 overflow-hidden">
        <Image
          src={src}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <span className="absolute bottom-4 left-4 bg-brown px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-white!">
          {date}
        </span>
      </div>
      <div className="px-6 py-6">
        <h3 className="mb-3 text-xl font-bold leading-snug text-brown-deep transition-colors group-hover:text-brown">
          {title}
        </h3>
        <p className="mb-4 text-[15px] leading-relaxed text-muted">{excerpt}</p>
        <a
          href="#blog"
          className="inline-flex items-center gap-2 text-sm font-semibold text-brown"
        >
          Read More
          <ArrowRightIcon className="h-4 w-4" />
        </a>
      </div>
    </motion.article>
  );
}

export function PricingCard({
  title,
  subtitle,
  price,
  features,
}: {
  title: string;
  subtitle: string;
  price: string;
  features: string[];
}) {
  return (
    <motion.article
      className="relative flex flex-col overflow-hidden rounded-md bg-white px-8 py-9 shadow-[0_12px_40px_rgba(60,40,20,0.08)]"
      whileHover={{ y: -5, boxShadow: "0 20px 50px rgba(60,40,20,0.14)" }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      <span className="absolute top-0 right-5 flex h-20 w-7 items-end justify-center bg-[#cfcfcf] pb-3">
        <span className="rotate-180 text-[10px] font-semibold tracking-[0.18em] text-white uppercase [writing-mode:vertical-rl]">
          Monthly
        </span>
      </span>
      <h3 className="mb-1 pr-8 text-xl font-bold text-[#1f1f1f]">{title}</h3>
      <p className="mb-5 text-sm text-muted">{subtitle}</p>
      <p className="mb-4 text-4xl font-bold text-[#5d4037]">{price}</p>
      <div className="mb-6 border-t border-[#ececec]" />
      <ul className="mb-8 space-y-3.5">
        {features.map((feature) => (
          <li key={feature} className="flex items-start gap-3 text-[15px] text-muted">
            <CircleCheckIcon className="mt-0.5 h-5 w-5 shrink-0 text-[#9a9a9a]" />
            {feature}
          </li>
        ))}
      </ul>
      <motion.a
        href="#contact"
        className="mt-auto inline-flex items-center justify-center gap-2 bg-[#5d4037] px-6 py-3.5 text-[13px] font-semibold tracking-[0.12em] uppercase"
        style={{ color: "#ffffff" }}
        whileHover={{ scale: 1.03, backgroundColor: "#4a331e" }}
        whileTap={{ scale: 0.97 }}
      >
        Get Started
        <ArrowRightIcon className="h-4 w-4" style={{ color: "#ffffff" }} />
      </motion.a>
    </motion.article>
  );
}
