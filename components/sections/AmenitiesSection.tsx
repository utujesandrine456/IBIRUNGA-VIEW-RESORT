import { ServiceCard } from "@/components/ui/Cards";
import { CoffeeMillIcon } from "@/components/ui/Icons";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { amenities } from "@/lib/content";

export function AmenitiesSection() {
  return (
    <section id="amenities" className="relative overflow-hidden bg-cream py-20 md:py-28">
      <CoffeeMillIcon
        className="pointer-events-none absolute -left-10 top-8 h-[320px] w-[260px] -rotate-[18deg] text-[#d8d2c8] opacity-50 md:left-0"
        aria-hidden="true"
      />
      <CoffeeMillIcon
        className="pointer-events-none absolute -right-8 bottom-4 h-[280px] w-[230px] rotate-[16deg] text-[#d8d2c8] opacity-45"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-6">
        <SectionHeader
          eyebrow="Explore"
          title="The Hotel"
          description="Everything you need for a calm, comfortable stay — rooms, dining, wellness, and open-air spaces with hillside views."
        />
        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {amenities.map((item, index) => (
            <ServiceCard
              key={item.title}
              title={item.title}
              description={item.description}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
