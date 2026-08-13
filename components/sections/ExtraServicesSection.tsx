import { PricingCard } from "@/components/ui/Cards";
import { CoffeeMillIcon } from "@/components/ui/Icons";
import { extraServices } from "@/lib/content";

export function ExtraServicesSection() {
  return (
    <section id="extra" className="relative overflow-hidden bg-white py-20 md:py-28">
      <CoffeeMillIcon
        className="pointer-events-none absolute -left-6 top-10 h-75 w-62.5 rotate-[-15deg] text-[#ddd6cc] opacity-45 md:left-4"
        aria-hidden="true"
      />
      <CoffeeMillIcon
        className="pointer-events-none absolute -right-10 bottom-6 h-65 w-55 rotate-18 text-[#ddd6cc] opacity-40"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 px-4 md:px-6 lg:grid-cols-[0.95fr_1.15fr] lg:gap-16">
        <div className="relative max-w-lg py-6">
          <p className="mb-4 text-[15px] font-semibold text-[#b08d6a]">Best Prices</p>
          <h2 className="mb-6 text-4xl font-bold leading-[1.1] text-black md:text-5xl lg:text-[3.4rem]">
            Extra Services
          </h2>
          <p className="mb-5 max-w-md text-[15px] leading-7 text-[#8a8a8a]">
            Make your visit smoother with dining packages, room care, and thoughtful
            extras planned around your schedule at Ibirunga View Resort.
          </p>
          <p className="max-w-md text-[15px] leading-7 text-[#8a8a8a]">
            From welcome drinks to daily refresh options, choose what fits your stay
            and enjoy warm hospitality with every detail handled for you.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          {extraServices.map((service) => (
            <PricingCard key={service.title} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
}
