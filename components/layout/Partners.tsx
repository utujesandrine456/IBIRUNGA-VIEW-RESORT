import Image from "next/image";
import { images } from "@/lib/content";

export function PartnersSection() {
  return (
    <section className="border-y border-border bg-cream-dark/60 py-12">
      <div className="mx-auto grid max-w-5xl grid-cols-2 items-center gap-8 px-4 opacity-70 grayscale md:grid-cols-4 md:px-6">
        {images.partners.map((src, index) => (
          <div key={src} className="relative mx-auto h-16 w-36 overflow-hidden rounded-sm">
            <Image
              src={src}
              alt={`Partner highlight ${index + 1}`}
              fill
              className="object-cover"
              sizes="144px"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
