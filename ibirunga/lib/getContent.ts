import * as staticContent from './content';
import type { CmsContent } from './cms-types';

function staticFallback(): CmsContent {
  return {
    site: {
      name: staticContent.site.name,
      tagline: staticContent.site.tagline,
      phone: staticContent.site.phone,
      phoneAlt: staticContent.site.phoneAlt,
      email: staticContent.site.email,
      address: staticContent.site.address,
      logoUrl: staticContent.images.logo,
    },
    navLinks: staticContent.navLinks.map((link, i) => ({
      id: String(i),
      ...link,
      sortOrder: i,
      published: true,
    })),
    hero: {
      headline: 'Enjoy A Luxury Experience',
      subtext:
        'Nestled in the heart of Musanze with breathtaking volcano views, Ibirunga View Resort offers refined comfort, warm hospitality, and unforgettable stays.',
      ctaLabel: 'Discover',
      ctaUrl: '#about',
      backgroundImage: staticContent.images.hero,
    },
    about: {
      eyebrow: 'About Us',
      title: 'Most Safe & Rated Hotel In Musanze.',
      paragraphs: [
        'Ibirunga View Resort blends modern comfort with the natural beauty of Rwanda\'s volcanic highlands.',
        'Whether you are here for gorilla trekking, hillside calm, or a family getaway, our team ensures a welcoming stay.',
      ],
      mainImage: staticContent.images.aboutMain,
      sideImage: staticContent.images.aboutSide,
      features: staticContent.aboutFeatures,
      ctaLabel: 'Learn More',
      ctaUrl: '#rooms',
    },
    amenitiesMeta: {
      eyebrow: 'Explore',
      title: 'The Hotel',
      description:
        'Everything you need for a calm, comfortable stay — rooms, dining, wellness, and open-air spaces with hillside views.',
    },
    roomsMeta: {
      eyebrow: 'Accommodation',
      title: 'Rooms & Suites',
      description:
        'Choose from thoughtfully designed rooms and suites with hillside views, fresh linens, and warm hospitality.',
    },
    extraMeta: {
      eyebrow: 'Best Prices',
      title: 'Extra Services',
      paragraphs: [
        'Make your visit smoother with dining packages, room care, and thoughtful extras planned around your schedule.',
        'From welcome drinks to daily refresh options, choose what fits your stay.',
      ],
    },
    testimonialsMeta: {
      eyebrow: 'Testimonial',
      title: 'What Our Clients Say',
    },
    bookingForm: {
      title: 'Book A Room',
      image: staticContent.images.booking,
    },
    video: {
      title: 'Take A Tour Of Luxury',
      backgroundImage: staticContent.images.video,
      youtubeUrl: '',
    },
    blogMeta: {
      eyebrow: 'Our Blog',
      title: 'Latest News & Updates',
      description: 'Stories, tips, and updates from Ibirunga View Resort.',
    },
    footer: {
      newsletterDescription:
        'Subscribe for stay offers, dining news, and seasonal updates from the resort.',
    },
    amenities: staticContent.amenities.map((item, i) => ({
      id: String(i),
      ...item,
      sortOrder: i,
      published: true,
    })),
    rooms: staticContent.images.rooms.map((room, i) => ({
      id: String(i),
      title: room.title,
      category: room.category,
      price: room.price,
      description:
        'Spacious comfort with fresh linens, thoughtful details, and a calm atmosphere for your stay.',
      image: room.src,
      src: room.src,
      sortOrder: i,
      published: true,
    })),
    extraServices: staticContent.extraServices.map((item, i) => ({
      id: String(i),
      ...item,
      sortOrder: i,
      published: true,
    })),
    testimonials: staticContent.testimonials.map((item, i) => ({
      id: String(i),
      ...item,
      sortOrder: i,
      published: true,
    })),
    blog: staticContent.images.blog.map((post, i) => ({
      id: String(i),
      title: post.title,
      excerpt: post.excerpt,
      date: post.date,
      image: post.src,
      src: post.src,
      sortOrder: i,
      published: true,
    })),
    footerServices: [
      'Restaurant & Bar',
      'Spa & Massage',
      'Coffee Shop',
      'Airport Transfer',
      'Garden Terrace',
      'Meeting Room',
    ],
  };
}

export async function getContent(): Promise<CmsContent> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001/api';

  try {
    const res = await fetch(`${apiUrl}/content`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return staticFallback();
    return (await res.json()) as CmsContent;
  } catch {
    return staticFallback();
  }
}
