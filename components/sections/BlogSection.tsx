"use client";

import { BlogCard } from "@/components/ui/Cards";
import { MotionItem, MotionStagger } from "@/components/ui/Motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import { images } from "@/lib/content";

export function BlogSection() {
  return (
    <section id="blog" className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <SectionHeader
          eyebrow="Our Blog"
          title="Latest Blog & News"
          description="Stories from the terrace, the rooms, and the warm service that defines Ibirunga View Resort."
        />
        <MotionStagger className="grid gap-7 md:grid-cols-2 lg:grid-cols-3" stagger={staggerContainer}>
          {images.blog.map((post) => (
            <MotionItem key={post.title} variants={fadeInUp}>
              <BlogCard {...post} />
            </MotionItem>
          ))}
        </MotionStagger>
      </div>
    </section>
  );
}
