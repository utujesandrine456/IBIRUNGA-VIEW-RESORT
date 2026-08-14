export type SiteSettings = {
  name: string;
  tagline: string;
  phone: string;
  phoneAlt: string;
  email: string;
  address: string;
  logoUrl: string;
};

export type NavLink = {
  id: string;
  label: string;
  href: string;
  sortOrder: number;
  published: boolean;
};

export type Amenity = {
  id: string;
  title: string;
  description: string;
  image: string;
  sortOrder: number;
  published: boolean;
};

export type Room = {
  id: string;
  title: string;
  category: string;
  price: string;
  description: string;
  image: string;
  src?: string;
  sortOrder: number;
  published: boolean;
};

export type ExtraService = {
  id: string;
  title: string;
  subtitle: string;
  price: string;
  features: string[];
  sortOrder: number;
  published: boolean;
};

export type Testimonial = {
  id: string;
  name: string;
  role: string;
  text: string;
  image: string;
  sortOrder: number;
  published: boolean;
};

export type BlogPost = {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  image: string;
  src?: string;
  sortOrder: number;
  published: boolean;
};

export type Booking = {
  id: string;
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  roomType: string | null;
  roomCount: number;
  guestName: string;
  email: string;
  phone: string;
  specialRequests: string | null;
  status: string;
  source: string;
  createdAt: string;
};

export type CmsContent = {
  site: SiteSettings | null;
  navLinks: NavLink[];
  hero: Record<string, string>;
  about: Record<string, unknown>;
  amenitiesMeta: Record<string, string>;
  roomsMeta: Record<string, string>;
  extraMeta: Record<string, unknown>;
  testimonialsMeta: Record<string, string>;
  bookingForm: Record<string, string>;
  video: Record<string, string>;
  blogMeta: Record<string, string>;
  footer: Record<string, string>;
  amenities: Amenity[];
  rooms: Room[];
  extraServices: ExtraService[];
  testimonials: Testimonial[];
  blog: BlogPost[];
  footerServices: string[];
};
