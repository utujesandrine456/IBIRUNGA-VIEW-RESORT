import { SiteHeader } from "@/components/layout/Header";
import { PromoProvider } from "@/components/layout/PromoBanner";
import { ContentProvider } from "@/components/providers/ContentProvider";
import { AboutSection } from "@/components/sections/AboutSection";
import { AmenitiesSection } from "@/components/sections/AmenitiesSection";
import { BlogSection } from "@/components/sections/BlogSection";
import { BookingFormSection } from "@/components/sections/BookingFormSection";
import { Hero } from "@/components/sections/Hero";
import { RoomsSection } from "@/components/sections/RoomsSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { VideoTourSection } from "@/components/sections/VideoTourSection";
import { Footer } from "@/components/layout/Footer";
import { getContent } from "@/lib/getContent";

export const dynamic = "force-dynamic";

export default async function Home() {
  const content = await getContent();

  return (
    <ContentProvider content={content}>
      <PromoProvider>
        <div className="relative z-10">
          <SiteHeader />
          <Hero />
          <AboutSection />
          <AmenitiesSection />
          <RoomsSection />
          <TestimonialsSection />
          <BookingFormSection />
          <VideoTourSection />
          <BlogSection />
          <Footer />
        </div>
      </PromoProvider>
    </ContentProvider>
  );
}
