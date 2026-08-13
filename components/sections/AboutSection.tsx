import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { CheckIcon } from "@/components/ui/Icons";
import { aboutFeatures, images } from "@/lib/content";

export function AboutSection() {
  return (
    <section id="about" className="bg-white py-20 md:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 md:px-6 lg:grid-cols-2 lg:gap-16">
        <div className="relative mx-auto w-full max-w-lg pb-14">
          <div className="relative h-80 overflow-hidden sm:h-95 lg:h-105">
            <Image
              src={images.aboutMain}  
              alt="Resort reception entrance"
              fill
              className="object-cover object-[center_35%]"
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
          </div>
          <div className="absolute bottom-0 right-0 w-[52%] overflow-hidden border-8 border-white shadow-xl sm:w-[48%]">
            <div className="relative aspect-16/11">
              <Image
                src={images.aboutSide}
                alt="Comfortable guest room"
                fill
                className="object-cover"
                sizes="280px"
              />
            </div>
          </div>
        </div>

        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-brown">
            About Us
          </p>
          <h2 className="mb-5 text-3xl font-bold leading-tight text-brown-deep md:text-4xl">
            Most Safe & Rated Hotel In Musanze.
          </h2>
          <p className="mb-4 text-[15px] leading-relaxed text-muted">
            Ibirunga View Resort welcomes travelers seeking comfort near Rwanda&apos;s
            volcanoes. From reception to rooftop, every space is prepared with care,
            clarity, and genuine hospitality.
          </p>
          <p className="mb-6 text-[15px] leading-relaxed text-muted">
            Whether you are here for gorilla trekking, hillside calm, or a family
            escape, our rooms, dining, and wellness amenities keep your stay easy and
            memorable.
          </p>

          <ul className="mb-8 grid gap-3 sm:grid-cols-2">
            {aboutFeatures.map((feature) => (
              <li key={feature} className="flex items-start gap-3 text-[15px] text-foreground">
                <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brown text-white">
                  <CheckIcon className="h-3 w-3" />
                </span>
                {feature}
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap items-end justify-between gap-6">
            <Button>Learn More</Button>
            <p className="text-3xl font-semibold italic text-brown/40">Ibirunga</p>
          </div>
        </div>
      </div>
    </section>
  );
}
