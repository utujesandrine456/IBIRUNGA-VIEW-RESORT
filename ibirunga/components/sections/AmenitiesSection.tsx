"use client";

import { ServiceCard } from "@/components/ui/Cards";
import { MotionItem, MotionStagger } from "@/components/ui/Motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import { useCmsContent } from "@/components/providers/ContentProvider";

export function AmenitiesSection() {
  const { amenities, amenitiesMeta } = useCmsContent();
  return (
    <section id="amenities" className="relative overflow-hidden bg-cream py-20 md:py-28">
      <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-6">
        <SectionHeader
          eyebrow={amenitiesMeta.eyebrow ?? "Explore"}
          title={amenitiesMeta.title ?? "The Hotel"}
          description={
            amenitiesMeta.description ??
            "Everything you need for a calm, comfortable stay — rooms, dining, wellness, and open-air spaces with hillside views."
          }
        />
        <MotionStagger className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3" stagger={staggerContainer}>
          {amenities.map((item, index) => (
            <MotionItem key={item.title} variants={fadeInUp}>
              <ServiceCard
                title={item.title}
                description={item.description}
                image={item.image}
                index={index}
              />
            </MotionItem>
          ))}
        </MotionStagger>
      </div>
    </section>
  );
}
