import {
  ArrowRightIcon,
  BarIcon,
  BeachIcon,
  BedIcon,
  CircleCheckIcon,
  CoffeeIcon,
  HotelBuildingIcon,
  OfferBadgeIcon,
  QuoteIcon,
  ShowerIcon,
  SpaBowlIcon,
  StarIcon,
  TvIcon,
  WifiIcon,
} from "@/components/ui/Icons";
import Image from "next/image";

const amenityIcons = [
  BedIcon,
  BeachIcon,
  HotelBuildingIcon,
  SpaBowlIcon,
  BarIcon,
  OfferBadgeIcon,
];

export function ServiceCard({
  title,
  description,
  index,
}: {
  title: string;
  description: string;
  index: number;
}) {
  const Icon = amenityIcons[index % amenityIcons.length];
  return (
    <article className="group relative overflow-hidden bg-white px-8 py-10 shadow-[0_10px_35px_rgba(60,40,20,0.06)] transition-transform duration-300 hover:-translate-y-1">
      <Icon
        className="pointer-events-none absolute -right-2 top-6 h-28 w-28 text-[#e8e4dc] opacity-70"
        aria-hidden="true"
      />
      <div className="relative mb-6 text-brown">
        <Icon className="h-12 w-12" />
      </div>
      <h3 className="relative mb-3 text-xl font-bold text-[#1f1f1f]">{title}</h3>
      <p className="relative mb-6 text-[15px] leading-relaxed text-muted">{description}</p>
      <a
        href="#rooms"
        className="relative inline-flex items-center gap-2 text-sm font-semibold text-[#1f1f1f] transition-colors hover:text-brown"
      >
        Read More
        <ArrowRightIcon className="h-4 w-4" />
      </a>
    </article>
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
    <article className="group overflow-hidden bg-white shadow-[0_8px_30px_rgba(60,40,20,0.06)]">
      <div className="relative aspect-4/3 overflow-hidden">
        <Image
          src={src}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div
          className="absolute inset-x-0 bottom-0 bg-brown px-5 py-2.5 text-sm font-semibold"
          style={{ color: "#ffffff" }}
        >
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
        <div className="flex items-center gap-4 text-muted/80">
          <WifiIcon className="h-5 w-5" />
          <TvIcon className="h-5 w-5" />
          <CoffeeIcon className="h-5 w-5" />
          <BedIcon className="h-5 w-5" />
          <ShowerIcon className="h-5 w-5" />
        </div>
      </div>
    </article>
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
    <article className="group overflow-hidden bg-white shadow-[0_8px_30px_rgba(60,40,20,0.05)]">
      <div className="relative aspect-16/11 overflow-hidden">
        <Image
          src={src}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <span className="absolute bottom-4 left-4 bg-brown px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-white">
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
    </article>
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
    <article className="relative flex flex-col overflow-hidden rounded-md bg-white px-8 py-9 shadow-[0_12px_40px_rgba(60,40,20,0.08)]">
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
      <a
        href="#contact"
        className="mt-auto inline-flex items-center justify-center gap-2 bg-[#5d4037] px-6 py-3.5 text-[13px] font-semibold tracking-[0.12em] uppercase transition-colors hover:bg-[#4a331e]"
        style={{ color: "#ffffff" }}
      >
        Get Started
        <ArrowRightIcon className="h-4 w-4" style={{ color: "#ffffff" }} />
      </a>
    </article>
  );
}
