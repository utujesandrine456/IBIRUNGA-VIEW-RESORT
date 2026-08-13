import { Footer } from "@/components/layout/Footer";
import { Navbar, TopBar } from "@/components/layout/Header";
import { AboutSection } from "@/components/sections/AboutSection";
import { AmenitiesSection } from "@/components/sections/AmenitiesSection";
import { BlogSection } from "@/components/sections/BlogSection";
import { BookingBar } from "@/components/sections/BookingBar";
import { BookingFormSection } from "@/components/sections/BookingFormSection";
import { ExtraServicesSection } from "@/components/sections/ExtraServicesSection";
import { Hero } from "@/components/sections/Hero";
import { RoomsSection } from "@/components/sections/RoomsSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { VideoTourSection } from "@/components/sections/VideoTourSection";

export default function Home() {
  return (
    <>
      <TopBar />
      <div className="relative">
        <Navbar />
        <Hero />
      </div>
      <BookingBar />
      <AboutSection />
      <AmenitiesSection />
      <RoomsSection />
      <ExtraServicesSection />
      <TestimonialsSection />
      <BookingFormSection />
      <VideoTourSection />
      <BlogSection />
      <Footer />
    </>
  );
}
