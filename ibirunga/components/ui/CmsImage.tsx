"use client";

import Image from "next/image";

type Props = {
  src: string;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  className?: string;
  sizes?: string;
  priority?: boolean;
};

/** Supports public paths, remote URLs, and data: image previews from admin uploads. */
export function CmsImage({
  src,
  alt,
  fill,
  width,
  height,
  className,
  sizes,
  priority,
}: Props) {
  const safeSrc = src || "/logo.png";
  if (safeSrc.startsWith("data:")) {
    if (fill) {
      return (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={safeSrc} alt={alt} className={`absolute inset-0 h-full w-full ${className ?? ""}`} />
      );
    }
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={safeSrc}
        alt={alt}
        width={width}
        height={height}
        className={className}
      />
    );
  }

  return (
    <Image
      src={safeSrc}
      alt={alt}
      fill={fill}
      width={fill ? undefined : width}
      height={fill ? undefined : height}
      className={className}
      sizes={sizes}
      priority={priority}
    />
  );
}
