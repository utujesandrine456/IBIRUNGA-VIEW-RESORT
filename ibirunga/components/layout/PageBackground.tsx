"use client";

import Image from "next/image";
import { images } from "@/lib/content";

export function PageBackground() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      <p className="absolute top-[18%] left-1/2 -translate-x-1/2 -rotate-[22deg] whitespace-nowrap text-[clamp(3.5rem,11vw,9rem)] font-bold tracking-[0.12em] text-brown uppercase select-none opacity-[0.045]">
        IBIRUNGA VIEW RESORT
      </p>
      <p className="absolute top-[58%] left-1/2 -translate-x-1/2 -rotate-[22deg] whitespace-nowrap text-[clamp(3.5rem,11vw,9rem)] font-bold tracking-[0.08em] text-brown uppercase select-none opacity-[0.03]">
        IBIRUNGA VIEW RESORT
      </p>
    </div>
  );
}

export function LogoDecor({
  className,
  rotate = "-18deg",
}: {
  className?: string;
  rotate?: string;
}) {
  return (
    <div
      className={className}
      style={{ transform: `rotate(${rotate})` }}
      aria-hidden="true"
    >
      <Image
        src={images.logo}
        alt=""
        width={280}
        height={280}
        className="h-full w-full object-contain"
        draggable={false}
      />
    </div>
  );
}

/** @deprecated Use LogoDecor instead */
export const GorillaDecor = LogoDecor;
