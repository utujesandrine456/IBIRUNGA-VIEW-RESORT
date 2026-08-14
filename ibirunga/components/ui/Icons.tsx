import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

export function PhoneIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <path d="M6.5 4.5h3l1.5 4-2 1.5a12 12 0 0 0 5.5 5.5l1.5-2 4 1.5v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4.5 6.7 2 2 0 0 1 6.5 4.5Z" />
    </svg>
  );
}

export function MailIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <rect x="3.5" y="5.5" width="17" height="13" rx="1.5" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  );
}

export function MapPinIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <path d="M12 21s6.5-5.2 6.5-10.2A6.5 6.5 0 0 0 5.5 10.8C5.5 15.8 12 21 12 21Z" />
      <circle cx="12" cy="10.5" r="2.2" />
    </svg>
  );
}

export function FacebookIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M14.5 8.5H16V5.8c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3V12H7v3h2.3v7h3.2v-7H15l.5-3h-2.5V10c0-.9.2-1.5 1.5-1.5Z" />
    </svg>
  );
}

export function TwitterIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M18.2 7.3c.5-.3.9-.8 1.1-1.3-.5.3-1 .5-1.6.6A2.2 2.2 0 0 0 12 8.4c0 .2 0 .3.1.5A6.3 6.3 0 0 1 7 7c-.2.4-.3.8-.3 1.2 0 .8.4 1.5 1 1.9-.4 0-.7-.1-1-.3v.1c0 1.1.8 2 1.8 2.2-.2.1-.4.1-.6.1-.1 0-.3 0-.4-.1.3 1 1.2 1.7 2.3 1.7A4.5 4.5 0 0 1 6 15.6 6.3 6.3 0 0 0 9.4 16.6c4.1 0 6.4-3.4 6.4-6.4v-.3c.4-.3.8-.7 1.1-1.2-.4.2-.9.3-1.3.4-.1-.1-.2-.2-.4-.2Z" />
    </svg>
  );
}

export function InstagramIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1.25" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function LinkedInIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M7.2 9.3H4.4V19h2.8V9.3Zm.2-3.1a1.6 1.6 0 1 1-3.2 0 1.6 1.6 0 0 1 3.2 0ZM19.6 19h-2.8v-5.1c0-1.2-.4-2-1.5-2-.8 0-1.3.5-1.5 1.1-.1.2-.1.5-.1.8V19h-2.8s0-8.4 0-9.7h2.8v1.4c.4-.6 1.1-1.5 2.7-1.5 2 0 3.4 1.3 3.4 4.1V19Z" />
    </svg>
  );
}

export function CheckIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" {...props}>
      <path d="m5 12 5 5 9-10" />
    </svg>
  );
}

export function SearchIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16.5 16.5 4 4" />
    </svg>
  );
}

export function PlayIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M8.5 6.8v10.4L18 12 8.5 6.8Z" />
    </svg>
  );
}

export function YoutubeIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31.4 31.4 0 0 0 0 12a31.4 31.4 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31.4 31.4 0 0 0 24 12a31.4 31.4 0 0 0-.5-5.8ZM9.7 15.5V8.5L15.8 12 9.7 15.5Z" />
    </svg>
  );
}

export function WifiIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M2.5 9.5a13.5 13.5 0 0 1 19 0" />
      <path d="M5.5 12.5a9.5 9.5 0 0 1 13 0" />
      <path d="M8.5 15.5a5.5 5.5 0 0 1 7 0" />
      <circle cx="12" cy="19" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function TvIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="2.5" y="5.5" width="19" height="12" rx="2" />
      <path d="M8 21h8" />
      <path d="M12 17.5V21" />
    </svg>
  );
}

export function CoffeeIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M5 9h10v5.5a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4V9Z" />
      <path d="M15 10h2a2.5 2.5 0 0 1 0 5H15" />
      <path d="M6 20h8" />
      <path d="M8 5V7M12 4V7M16 5V7" />
    </svg>
  );
}

export function BedIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M3 18V10a2.5 2.5 0 0 1 2.5-2.5H9a2 2 0 0 1 2 2v1" />
      <path d="M3 14h18" />
      <path d="M3 18h18" />
      <path d="M5 18v2M19 18v2" />
    </svg>
  );
}

export function ShowerIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M6 4h8a3 3 0 0 1 3 3v3H9" />
      <path d="M9 10v2.5" />
      <path d="M7.5 15.5v1M10.5 15.5v1M13.5 15.5v1M7.5 18.5v1M10.5 18.5v1M13.5 18.5v1" />
    </svg>
  );
}

export function ArrowRightIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function QuoteIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M10.5 8.5C8.2 8.5 6.3 10 6 12.5h3.2V18H4v-5.2C4 8.8 6.8 6 10.5 6v2.5Zm9.5 0C17.7 8.5 15.8 10 15.5 12.5H18.7V18H13.5v-5.2C13.5 8.8 16.3 6 20 6v2.5Z" />
    </svg>
  );
}

export function StarIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="m12 3.5 2.4 4.9 5.4.8-3.9 3.8.9 5.4L12 15.8 7.2 18.4l.9-5.4-3.9-3.8 5.4-.8L12 3.5Z" />
    </svg>
  );
}

export function GymIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" {...props}>
      <path d="M4 9v6M7 7v10M17 7v10M20 9v6M7 12h10" />
    </svg>
  );
}

export function PoolIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" {...props}>
      <path d="M4 16c1.5-1 3-1 4.5 0s3 1 4.5 0 3-1 4.5 0 3 1 4.5 0" />
      <path d="M8 8v6M16 6v8M8 8c2 1 4 1 8-2" />
    </svg>
  );
}

export function SpaIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" {...props}>
      <path d="M12 20c4-3.5 6-6.5 6-9.5A6 6 0 0 0 6 10.5C6 13.5 8 16.5 12 20Z" />
      <path d="M12 11.5c.8-1.4 1.2-2.4 1.2-3.2a1.2 1.2 0 0 0-2.4 0c0 .8.4 1.8 1.2 3.2Z" />
    </svg>
  );
}

export function DiningIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" {...props}>
      <path d="M7 4v7M5 4v4a2 2 0 0 0 4 0V4M7 11v9M16 4v16M14 4c0 3 2 4 2 7" />
    </svg>
  );
}

export function ConciergeIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" {...props}>
      <path d="M6 18h12M8 18V9a4 4 0 0 1 8 0v9M10 9h4" />
      <path d="M12 5V3.5" />
    </svg>
  );
}

export function CalendarIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" {...props}>
      <rect x="3.5" y="5" width="17" height="15" rx="1.5" />
      <path d="M8 3.5v3M16 3.5v3M3.5 9.5h17" />
    </svg>
  );
}

export function UserIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" {...props}>
      <circle cx="12" cy="8" r="3.2" />
      <path d="M5.5 19.5c1.4-3.2 3.6-4.8 6.5-4.8s5.1 1.6 6.5 4.8" />
    </svg>
  );
}

export function UsersIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" {...props}>
      <circle cx="9" cy="8" r="2.8" />
      <circle cx="16.5" cy="9" r="2.2" />
      <path d="M3.8 19c1.2-2.8 3-4.2 5.2-4.2S12.8 16.2 14 19" />
      <path d="M14.2 14.2c1.4-.4 2.7-.2 4 1.1.7.7 1.3 1.7 1.8 3.7" />
    </svg>
  );
}

export function RoomDoorIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" {...props}>
      <path d="M6 20V5.5A1.5 1.5 0 0 1 7.5 4H16a1.5 1.5 0 0 1 1.5 1.5V20" />
      <path d="M4.5 20h15" />
      <circle cx="14.2" cy="12" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function BeachIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
      <path d="M7 14c0-3 1.5-6 3.5-8" />
      <path d="M10.5 6c1.2 1.8 2 4 2 6.5" />
      <path d="M14 13.5c0-2.2.8-4.2 2-6" />
      <path d="M16 7.5c.9 1.4 1.4 3 1.4 4.8" />
      <circle cx="18.5" cy="6" r="1.6" />
      <path d="M4 17.5c2-.9 4-.9 6 0s4 .9 6 0 4-.9 6 0" />
      <path d="M4 20c2-.8 4-.8 6 0s4 .8 6 0 4-.8 6 0" />
    </svg>
  );
}

export function HotelBuildingIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
      <path d="M4 20V8l8-4 8 4v12" />
      <path d="M9 20v-5h6v5" />
      <path d="M8 10h.01M12 10h.01M16 10h.01M8 13.5h.01M12 13.5h.01M16 13.5h.01" />
      <path d="m8.5 5.5.8-1.5.8 1.5M12 4.2l.7-1.3.7 1.3M15.5 5.5l.8-1.5.8 1.5" />
    </svg>
  );
}

export function SpaBowlIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
      <path d="M5 14c0 3.5 3.1 5.5 7 5.5s7-2 7-5.5H5Z" />
      <path d="M7 14c.5-2.5 2.2-4 5-4s4.5 1.5 5 4" />
      <path d="M12 10V7.5" />
      <path d="M12 7.5c1.2-1.5 2.8-2 4-1.5" />
      <path d="M10.5 6.2c.4-1.2 1.2-2 2.2-2.2" />
    </svg>
  );
}

export function BarIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
      <path d="M5 18h14" />
      <path d="M6 18V10h12v8" />
      <path d="M8 10V7.5M12 10V6M16 10V7" />
      <path d="M9.5 14h2M14 14h2" />
      <circle cx="10.5" cy="14" r="0.7" fill="currentColor" stroke="none" />
      <circle cx="15" cy="14" r="0.7" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function OfferBadgeIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
      <path d="M12 3.5 14 6l3-.4-1.2 2.8 2.2 2.2-2.8 1.2.4 3-2.6-1.2L12 16.5l-1 2.9-2.6-1.2.4-3-2.8-1.2 2.2-2.2L6.9 5.6 10 6l2-2.5Z" />
      <path d="M10.2 11.2 13.8 14.8M13.8 11.2 10.2 14.8" />
    </svg>
  );
}

export function CircleCheckIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="m8.5 12.2 2.4 2.4 4.6-5" />
    </svg>
  );
}

export function CoffeeMillIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 120 140" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <rect x="28" y="8" width="64" height="28" rx="3" />
      <path d="M40 22h40" />
      <path d="M60 8V3" />
      <circle cx="60" cy="3" r="2.5" fill="currentColor" stroke="none" />
      <path d="M36 36h48v18H36z" />
      <path d="M44 44h32M44 50h24" />
      <path d="M42 54c0 10 4 18 18 26 14-8 18-16 18-26" />
      <path d="M48 68c4 6 8 10 12 12 4-2 8-6 12-12" />
      <rect x="34" y="90" width="52" height="42" rx="4" />
      <path d="M42 102h36M42 112h28M42 122h20" />
      <circle cx="60" cy="78" r="5" />
    </svg>
  );
}
