import Image from "next/image";
import { PlayIcon } from "@/components/ui/Icons";
import { images } from "@/lib/content";

export function VideoTourSection() {
  return (
    <section className="relative flex min-h-105 items-center justify-center overflow-hidden py-24">
      <Image
        src={images.video}
        alt="Resort outdoor dining tour"
        fill
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-black/55" />
      <div className="relative z-10 flex flex-col items-center px-4 text-center text-white">
        <button
          type="button"
          aria-label="Play video tour"
          className="mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-white text-brown shadow-xl transition-transform hover:scale-105"
        >
          <PlayIcon className="ml-1 h-8 w-8" />
        </button>
        <h2 className="text-3xl font-bold md:text-4xl lg:text-5xl">
          Take A Tour Of Luxury
        </h2>
      </div>
    </section>
  );
}
