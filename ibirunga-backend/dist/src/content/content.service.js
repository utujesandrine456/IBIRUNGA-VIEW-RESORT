"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
function parseJson(value) {
    return JSON.parse(value);
}
function mapExtraService(item) {
    return {
        ...item,
        features: parseJson(item.features),
    };
}
let ContentService = class ContentService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getPublicContent() {
        const [site, navLinks, sections, amenities, rooms, extraServices, testimonials, blogPosts, footerServices,] = await Promise.all([
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
        const sectionMap = Object.fromEntries(sections.map((s) => [s.id, parseJson(s.data)]));
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
    async getSection(id) {
        const section = await this.prisma.sectionContent.findUnique({ where: { id } });
        if (!section)
            throw new common_1.NotFoundException(`Section ${id} not found`);
        return { id: section.id, ...parseJson(section.data) };
    }
    async updateSection(id, data) {
        return this.prisma.sectionContent.upsert({
            where: { id },
            update: { data: JSON.stringify(data) },
            create: { id, data: JSON.stringify(data) },
        });
    }
    getSite() {
        return this.prisma.siteSetting.findUnique({ where: { id: 'default' } });
    }
    updateSite(data) {
        return this.prisma.siteSetting.upsert({
            where: { id: 'default' },
            update: data,
            create: { id: 'default', ...data },
        });
    }
    listNavLinks() {
        return this.prisma.navLink.findMany({ orderBy: { sortOrder: 'asc' } });
    }
    createNavLink(data) {
        return this.prisma.navLink.create({ data });
    }
    updateNavLink(id, data) {
        return this.prisma.navLink.update({ where: { id }, data });
    }
    deleteNavLink(id) {
        return this.prisma.navLink.delete({ where: { id } });
    }
    listAmenities(includeUnpublished = false) {
        return this.prisma.amenity.findMany({
            where: includeUnpublished ? undefined : { published: true },
            orderBy: { sortOrder: 'asc' },
        });
    }
    createAmenity(data) {
        return this.prisma.amenity.create({ data });
    }
    updateAmenity(id, data) {
        return this.prisma.amenity.update({ where: { id }, data });
    }
    deleteAmenity(id) {
        return this.prisma.amenity.delete({ where: { id } });
    }
    listRooms(includeUnpublished = false) {
        return this.prisma.room.findMany({
            where: includeUnpublished ? undefined : { published: true },
            orderBy: { sortOrder: 'asc' },
        });
    }
    createRoom(data) {
        return this.prisma.room.create({ data });
    }
    updateRoom(id, data) {
        return this.prisma.room.update({ where: { id }, data });
    }
    deleteRoom(id) {
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
    createExtraService(data) {
        return this.prisma.extraService.create({
            data: { ...data, features: JSON.stringify(data.features) },
        }).then(mapExtraService);
    }
    async updateExtraService(id, data) {
        const payload = { ...data };
        if (data.features)
            payload.features = JSON.stringify(data.features);
        const updated = await this.prisma.extraService.update({
            where: { id },
            data: payload,
        });
        return mapExtraService(updated);
    }
    deleteExtraService(id) {
        return this.prisma.extraService.delete({ where: { id } });
    }
    listTestimonials(includeUnpublished = false) {
        return this.prisma.testimonial.findMany({
            where: includeUnpublished ? undefined : { published: true },
            orderBy: { sortOrder: 'asc' },
        });
    }
    createTestimonial(data) {
        return this.prisma.testimonial.create({ data });
    }
    updateTestimonial(id, data) {
        return this.prisma.testimonial.update({ where: { id }, data });
    }
    deleteTestimonial(id) {
        return this.prisma.testimonial.delete({ where: { id } });
    }
    listBlogPosts(includeUnpublished = false) {
        return this.prisma.blogPost.findMany({
            where: includeUnpublished ? undefined : { published: true },
            orderBy: { sortOrder: 'asc' },
        });
    }
    createBlogPost(data) {
        return this.prisma.blogPost.create({ data });
    }
    updateBlogPost(id, data) {
        return this.prisma.blogPost.update({ where: { id }, data });
    }
    deleteBlogPost(id) {
        return this.prisma.blogPost.delete({ where: { id } });
    }
    listFooterServices() {
        return this.prisma.footerService.findMany({ orderBy: { sortOrder: 'asc' } });
    }
    createFooterService(data) {
        return this.prisma.footerService.create({ data });
    }
    updateFooterService(id, data) {
        return this.prisma.footerService.update({ where: { id }, data });
    }
    deleteFooterService(id) {
        return this.prisma.footerService.delete({ where: { id } });
    }
};
exports.ContentService = ContentService;
exports.ContentService = ContentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ContentService);
//# sourceMappingURL=content.service.js.map