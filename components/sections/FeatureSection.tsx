import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { images } from "@/lib/content";

export function FeatureSection() {
  return (
    <section className="bg-white">
      <div className="mx-auto grid max-w-7xl lg:grid-cols-2">
        <div className="relative min-h-95 lg:min-h-140">
          <Image
            src={images.feature}
            alt="Featured guest bedroom"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
        <div className="flex items-center bg-cream px-8 py-16 md:px-14 lg:px-16">
          <div className="max-w-lg">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-brown">
              Luxury Hotel & Resort
            </p>
            <h2 className="mb-5 text-3xl font-bold leading-tight text-brown-deep md:text-4xl">
              Pearl Of The Volcanoes.
            </h2>
            <p className="mb-8 text-[15px] leading-relaxed text-muted">
              Settle into rooms dressed with soft linens, warm lighting, and quiet
              details that make every evening feel special. From branded comforts to
              balcony moments, Ibirunga View Resort is your gateway to the volcanoes.
            </p>
            <Button>Explore</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
