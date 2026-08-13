"use client";

import { useEffect, useState } from "react";
import { RoomCard } from "@/components/ui/Cards";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { images } from "@/lib/content";

export function RoomsSection() {
  const rooms = images.rooms;
  const [index, setIndex] = useState(0);
  const [perView, setPerView] = useState(1);

  useEffect(() => {
    const update = () => {
      if (window.innerWidth >= 1024) setPerView(3);
      else if (window.innerWidth >= 768) setPerView(2);
      else setPerView(1);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const maxIndex = Math.max(0, rooms.length - perView);

  useEffect(() => {
    setIndex((current) => Math.min(current, maxIndex));
  }, [maxIndex]);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((current) => (current >= maxIndex ? 0 : current + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, [maxIndex]);

  return (
    <section id="rooms" className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <SectionHeader
          eyebrow="Accommodation"
          title="Rooms & Suites"
          description="Choose from thoughtfully prepared rooms designed for rest after a day exploring Musanze."
        />

        <div className="relative overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{
              width: `${(rooms.length / perView) * 100}%`,
              transform: `translateX(-${(index * 100) / rooms.length}%)`,
            }}
          >
            {rooms.map((room) => (
              <div
                key={room.title}
                className="px-3"
                style={{ width: `${100 / rooms.length}%` }}
              >
                <RoomCard {...room} />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 flex items-center justify-center gap-3">
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to rooms slide ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`h-2.5 rounded-full transition-all ${
                i === index ? "w-8 bg-brown" : "w-2.5 bg-brown/25 hover:bg-brown/40"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
