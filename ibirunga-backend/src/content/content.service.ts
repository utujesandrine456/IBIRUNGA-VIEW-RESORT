import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

function parseJson<T>(value: string): T {
  return JSON.parse(value) as T;
}

function mapExtraService(item: {
  id: string;
  title: string;
  subtitle: string;
  price: string;
  features: string;
  sortOrder: number;
  published: boolean;
}) {
  return {
    ...item,
    features: parseJson<string[]>(item.features),
  };
}

@Injectable()
export class ContentService {
  constructor(private prisma: PrismaService) {}

  async getPublicContent() {
    const [
      site,
      navLinks,
      sections,
      amenities,
      rooms,
      extraServices,
      testimonials,
      blogPosts,
      footerServices,
    ] = await Promise.all([
      this.prisma.siteSetting.findUnique({ where: { id: 'default' } }),
      this.prisma.navLink.findMany({
        where: { published: true },
        orderBy: { sortOrder: 'asc' },
      }),
      this.prisma.sectionContent.findMany(),
      this.prisma.amenity.findMany({
        where: { published: true },
        orderBy: { sortOrder: 'asc' },
      }),
      this.prisma.room.findMany({
        where: { published: true },
        orderBy: { sortOrder: 'asc' },
      }),
      this.prisma.extraService.findMany({
        where: { published: true },
        orderBy: { sortOrder: 'asc' },
      }),
      this.prisma.testimonial.findMany({
        where: { published: true },
        orderBy: { sortOrder: 'asc' },
      }),
      this.prisma.blogPost.findMany({
        where: { published: true },
        orderBy: { sortOrder: 'asc' },
      }),
      this.prisma.footerService.findMany({ orderBy: { sortOrder: 'asc' } }),
    ]);

    const sectionMap = Object.fromEntries(
      sections.map((s) => [s.id, parseJson<Record<string, unknown>>(s.data)]),
    );

    return {
      site,
      navLinks,
      hero: sectionMap.hero ?? {},
      about: sectionMap.about ?? {},
      amenitiesMeta: sectionMap['amenities-meta'] ?? {},
      roomsMeta: sectionMap['rooms-meta'] ?? {},
      extraMeta: sectionMap['extra-meta'] ?? {},
      testimonialsMeta: sectionMap['testimonials-meta'] ?? {},
      bookingForm: sectionMap['booking-form'] ?? {},
      video: sectionMap.video ?? {},
      blogMeta: sectionMap['blog-meta'] ?? {},
      footer: sectionMap.footer ?? {},
      amenities,
      rooms: rooms.map((r) => ({ ...r, src: r.image })),
      extraServices: extraServices.map(mapExtraService),
      testimonials,
      blog: blogPosts.map((b) => ({ ...b, src: b.image })),
      footerServices: footerServices.map((s) => s.label),
    };
  }

  async getSection(id: string) {
    const section = await this.prisma.sectionContent.findUnique({ where: { id } });
    if (!section) throw new NotFoundException(`Section ${id} not found`);
    return { id: section.id, ...parseJson<Record<string, unknown>>(section.data) };
  }

  async updateSection(id: string, data: Record<string, unknown>) {
    return this.prisma.sectionContent.upsert({
      where: { id },
      update: { data: JSON.stringify(data) },
      create: { id, data: JSON.stringify(data) },
    });
  }

  getSite() {
    return this.prisma.siteSetting.findUnique({ where: { id: 'default' } });
  }

  updateSite(data: {
    name: string;
    tagline: string;
    phone: string;
    phoneAlt: string;
    email: string;
    address: string;
    logoUrl: string;
  }) {
    return this.prisma.siteSetting.upsert({
      where: { id: 'default' },
      update: data,
      create: { id: 'default', ...data },
    });
  }

  listNavLinks() {
    return this.prisma.navLink.findMany({ orderBy: { sortOrder: 'asc' } });
  }

  createNavLink(data: { label: string; href: string; sortOrder?: number; published?: boolean }) {
    return this.prisma.navLink.create({ data });
  }

  updateNavLink(id: string, data: Partial<{ label: string; href: string; sortOrder: number; published: boolean }>) {
    return this.prisma.navLink.update({ where: { id }, data });
  }

  deleteNavLink(id: string) {
    return this.prisma.navLink.delete({ where: { id } });
  }

  listAmenities(includeUnpublished = false) {
    return this.prisma.amenity.findMany({
      where: includeUnpublished ? undefined : { published: true },
      orderBy: { sortOrder: 'asc' },
    });
  }

  createAmenity(data: { title: string; description: string; image: string; sortOrder?: number; published?: boolean }) {
    return this.prisma.amenity.create({ data });
  }

  updateAmenity(id: string, data: Partial<{ title: string; description: string; image: string; sortOrder: number; published: boolean }>) {
    return this.prisma.amenity.update({ where: { id }, data });
  }

  deleteAmenity(id: string) {
    return this.prisma.amenity.delete({ where: { id } });
  }

  listRooms(includeUnpublished = false) {
    return this.prisma.room.findMany({
      where: includeUnpublished ? undefined : { published: true },
      orderBy: { sortOrder: 'asc' },
    });
  }

  createRoom(data: {
    title: string;
    category: string;
    price: string;
    description?: string;
    image: string;
    sortOrder?: number;
    published?: boolean;
  }) {
    return this.prisma.room.create({ data });
  }

  updateRoom(id: string, data: Partial<{ title: string; category: string; price: string; description: string; image: string; sortOrder: number; published: boolean }>) {
    return this.prisma.room.update({ where: { id }, data });
  }

  deleteRoom(id: string) {
    return this.prisma.room.delete({ where: { id } });
  }

  listExtraServices(includeUnpublished = false) {
    return this.prisma.extraService
      .findMany({
        where: includeUnpublished ? undefined : { published: true },
        orderBy: { sortOrder: 'asc' },
      })
      .then((items) => items.map(mapExtraService));
  }

  createExtraService(data: {
    title: string;
    subtitle: string;
    price: string;
    features: string[];
    sortOrder?: number;
    published?: boolean;
  }) {
    return this.prisma.extraService.create({
      data: { ...data, features: JSON.stringify(data.features) },
    }).then(mapExtraService);
  }

  async updateExtraService(
    id: string,
    data: Partial<{ title: string; subtitle: string; price: string; features: string[]; sortOrder: number; published: boolean }>,
  ) {
    const payload = { ...data } as Record<string, unknown>;
    if (data.features) payload.features = JSON.stringify(data.features);
    const updated = await this.prisma.extraService.update({
      where: { id },
      data: payload,
    });
    return mapExtraService(updated);
  }

  deleteExtraService(id: string) {
    return this.prisma.extraService.delete({ where: { id } });
  }

  listTestimonials(includeUnpublished = false) {
    return this.prisma.testimonial.findMany({
      where: includeUnpublished ? undefined : { published: true },
      orderBy: { sortOrder: 'asc' },
    });
  }

  createTestimonial(data: { name: string; role: string; text: string; image: string; sortOrder?: number; published?: boolean }) {
    return this.prisma.testimonial.create({ data });
  }

  updateTestimonial(id: string, data: Partial<{ name: string; role: string; text: string; image: string; sortOrder: number; published: boolean }>) {
    return this.prisma.testimonial.update({ where: { id }, data });
  }

  deleteTestimonial(id: string) {
    return this.prisma.testimonial.delete({ where: { id } });
  }

  listBlogPosts(includeUnpublished = false) {
    return this.prisma.blogPost.findMany({
      where: includeUnpublished ? undefined : { published: true },
      orderBy: { sortOrder: 'asc' },
    });
  }

  createBlogPost(data: { title: string; excerpt: string; date: string; image: string; sortOrder?: number; published?: boolean }) {
    return this.prisma.blogPost.create({ data });
  }

  updateBlogPost(id: string, data: Partial<{ title: string; excerpt: string; date: string; image: string; sortOrder: number; published: boolean }>) {
    return this.prisma.blogPost.update({ where: { id }, data });
  }

  deleteBlogPost(id: string) {
    return this.prisma.blogPost.delete({ where: { id } });
  }

  listFooterServices() {
    return this.prisma.footerService.findMany({ orderBy: { sortOrder: 'asc' } });
  }

  createFooterService(data: { label: string; sortOrder?: number }) {
    return this.prisma.footerService.create({ data });
  }

  updateFooterService(id: string, data: Partial<{ label: string; sortOrder: number }>) {
    return this.prisma.footerService.update({ where: { id }, data });
  }

  deleteFooterService(id: string) {
    return this.prisma.footerService.delete({ where: { id } });
  }
}
