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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminContentController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const bookings_service_1 = require("../bookings/bookings.service");
const content_service_1 = require("./content.service");
let AdminContentController = class AdminContentController {
    content;
    bookings;
    constructor(content, bookings) {
        this.content = content;
        this.bookings = bookings;
    }
    async dashboard() {
        const [amenities, rooms, testimonials, blogPosts, extraServices, bookingList] = await Promise.all([
            this.content.listAmenities(true),
            this.content.listRooms(true),
            this.content.listTestimonials(true),
            this.content.listBlogPosts(true),
            this.content.listExtraServices(true),
            this.bookings.findAll(),
        ]);
        return {
            counts: {
                amenities: amenities.length,
                rooms: rooms.length,
                testimonials: testimonials.length,
                blogPosts: blogPosts.length,
                extraServices: extraServices.length,
                bookings: bookingList.length,
                pendingBookings: bookingList.filter((b) => b.status === 'pending').length,
            },
            recentActivities: bookingList.slice(0, 8).map((booking) => ({
                id: booking.id,
                type: 'booking',
                title: booking.guestName,
                description: `${booking.roomType ?? 'Room'} · ${booking.adults} adult(s)`,
                status: booking.status,
                date: booking.createdAt,
            })),
        };
    }
    getSite() {
        return this.content.getSite();
    }
    updateSite(body) {
        return this.content.updateSite(body);
    }
    getSection(id) {
        return this.content.getSection(id);
    }
    updateSection(id, body) {
        return this.content.updateSection(id, body);
    }
    listNavLinks() {
        return this.content.listNavLinks();
    }
    createNavLink(body) {
        return this.content.createNavLink(body);
    }
    updateNavLink(id, body) {
        return this.content.updateNavLink(id, body);
    }
    deleteNavLink(id) {
        return this.content.deleteNavLink(id);
    }
    listAmenities() {
        return this.content.listAmenities(true);
    }
    createAmenity(body) {
        return this.content.createAmenity(body);
    }
    updateAmenity(id, body) {
        return this.content.updateAmenity(id, body);
    }
    deleteAmenity(id) {
        return this.content.deleteAmenity(id);
    }
    listRooms() {
        return this.content.listRooms(true);
    }
    createRoom(body) {
        return this.content.createRoom(body);
    }
    updateRoom(id, body) {
        return this.content.updateRoom(id, body);
    }
    deleteRoom(id) {
        return this.content.deleteRoom(id);
    }
    listExtraServices() {
        return this.content.listExtraServices(true);
    }
    createExtraService(body) {
        return this.content.createExtraService(body);
    }
    updateExtraService(id, body) {
        return this.content.updateExtraService(id, body);
    }
    deleteExtraService(id) {
        return this.content.deleteExtraService(id);
    }
    listTestimonials() {
        return this.content.listTestimonials(true);
    }
    createTestimonial(body) {
        return this.content.createTestimonial(body);
    }
    updateTestimonial(id, body) {
        return this.content.updateTestimonial(id, body);
    }
    deleteTestimonial(id) {
        return this.content.deleteTestimonial(id);
    }
    listBlogPosts() {
        return this.content.listBlogPosts(true);
    }
    createBlogPost(body) {
        return this.content.createBlogPost(body);
    }
    updateBlogPost(id, body) {
        return this.content.updateBlogPost(id, body);
    }
    deleteBlogPost(id) {
        return this.content.deleteBlogPost(id);
    }
    listFooterServices() {
        return this.content.listFooterServices();
    }
    createFooterService(body) {
        return this.content.createFooterService(body);
    }
    updateFooterService(id, body) {
        return this.content.updateFooterService(id, body);
    }
    deleteFooterService(id) {
        return this.content.deleteFooterService(id);
    }
};
exports.AdminContentController = AdminContentController;
__decorate([
    (0, common_1.Get)('dashboard'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminContentController.prototype, "dashboard", null);
__decorate([
    (0, common_1.Get)('site'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AdminContentController.prototype, "getSite", null);
__decorate([
    (0, common_1.Put)('site'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AdminContentController.prototype, "updateSite", null);
__decorate([
    (0, common_1.Get)('sections/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AdminContentController.prototype, "getSection", null);
__decorate([
    (0, common_1.Put)('sections/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], AdminContentController.prototype, "updateSection", null);
__decorate([
    (0, common_1.Get)('nav-links'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AdminContentController.prototype, "listNavLinks", null);
__decorate([
    (0, common_1.Post)('nav-links'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AdminContentController.prototype, "createNavLink", null);
__decorate([
    (0, common_1.Patch)('nav-links/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], AdminContentController.prototype, "updateNavLink", null);
__decorate([
    (0, common_1.Delete)('nav-links/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AdminContentController.prototype, "deleteNavLink", null);
__decorate([
    (0, common_1.Get)('amenities'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AdminContentController.prototype, "listAmenities", null);
__decorate([
    (0, common_1.Post)('amenities'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AdminContentController.prototype, "createAmenity", null);
__decorate([
    (0, common_1.Patch)('amenities/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], AdminContentController.prototype, "updateAmenity", null);
__decorate([
    (0, common_1.Delete)('amenities/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AdminContentController.prototype, "deleteAmenity", null);
__decorate([
    (0, common_1.Get)('rooms'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AdminContentController.prototype, "listRooms", null);
__decorate([
    (0, common_1.Post)('rooms'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AdminContentController.prototype, "createRoom", null);
__decorate([
    (0, common_1.Patch)('rooms/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], AdminContentController.prototype, "updateRoom", null);
__decorate([
    (0, common_1.Delete)('rooms/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AdminContentController.prototype, "deleteRoom", null);
__decorate([
    (0, common_1.Get)('extra-services'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AdminContentController.prototype, "listExtraServices", null);
__decorate([
    (0, common_1.Post)('extra-services'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AdminContentController.prototype, "createExtraService", null);
__decorate([
    (0, common_1.Patch)('extra-services/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], AdminContentController.prototype, "updateExtraService", null);
__decorate([
    (0, common_1.Delete)('extra-services/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AdminContentController.prototype, "deleteExtraService", null);
__decorate([
    (0, common_1.Get)('testimonials'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AdminContentController.prototype, "listTestimonials", null);
__decorate([
    (0, common_1.Post)('testimonials'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AdminContentController.prototype, "createTestimonial", null);
__decorate([
    (0, common_1.Patch)('testimonials/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], AdminContentController.prototype, "updateTestimonial", null);
__decorate([
    (0, common_1.Delete)('testimonials/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AdminContentController.prototype, "deleteTestimonial", null);
__decorate([
    (0, common_1.Get)('blog-posts'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AdminContentController.prototype, "listBlogPosts", null);
__decorate([
    (0, common_1.Post)('blog-posts'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AdminContentController.prototype, "createBlogPost", null);
__decorate([
    (0, common_1.Patch)('blog-posts/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], AdminContentController.prototype, "updateBlogPost", null);
__decorate([
    (0, common_1.Delete)('blog-posts/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AdminContentController.prototype, "deleteBlogPost", null);
__decorate([
    (0, common_1.Get)('footer-services'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AdminContentController.prototype, "listFooterServices", null);
__decorate([
    (0, common_1.Post)('footer-services'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AdminContentController.prototype, "createFooterService", null);
__decorate([
    (0, common_1.Patch)('footer-services/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], AdminContentController.prototype, "updateFooterService", null);
__decorate([
    (0, common_1.Delete)('footer-services/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AdminContentController.prototype, "deleteFooterService", null);
exports.AdminContentController = AdminContentController = __decorate([
    (0, common_1.Controller)('admin'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [content_service_1.ContentService,
        bookings_service_1.BookingsService])
], AdminContentController);
//# sourceMappingURL=admin-content.controller.js.map