import { SiteHeader } from "@/components/layout/Header";
import { PromoBanner } from "@/components/layout/PromoBanner";
import { PageBackground } from "@/components/layout/PageBackground";
import { ContentProvider } from "@/components/providers/ContentProvider";
import { AboutSection } from "@/components/sections/AboutSection";
import { AmenitiesSection } from "@/components/sections/AmenitiesSection";
import { BlogSection } from "@/components/sections/BlogSection";
import { BookingBar } from "@/components/sections/BookingBar";
import { BookingFormSection } from "@/components/sections/BookingFormSection";
import { Hero } from "@/components/sections/Hero";
import { RoomsSection } from "@/components/sections/RoomsSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { VideoTourSection } from "@/components/sections/VideoTourSection";
import { Footer } from "@/components/layout/Footer";
import { getContent } from "@/lib/getContent";

export default async function Home() {
  const content = await getContent();

  return (
    <ContentProvider content={content}>
      <PageBackground />
      <div className="relative z-10">
        <PromoBanner />
        <SiteHeader />
        <Hero />
        <BookingBar />
        <AboutSection />
        <AmenitiesSection />
        <RoomsSection />
        <TestimonialsSection />
        <BookingFormSection />
        <VideoTourSection />
        <BlogSection />
        <Footer />
      </div>
    </ContentProvider>
  );
}
