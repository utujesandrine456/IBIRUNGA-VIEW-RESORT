"use client";

import Image from "next/image";
import { images } from "@/lib/content";

export function PageBackground() {
  return null;
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
