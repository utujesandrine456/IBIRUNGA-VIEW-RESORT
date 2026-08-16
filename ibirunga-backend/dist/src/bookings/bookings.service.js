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
exports.BookingsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let BookingsService = class BookingsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    create(data) {
        return this.prisma.booking.create({
            data: {
                checkIn: new Date(data.checkIn),
                checkOut: new Date(data.checkOut),
                adults: data.adults,
                children: data.children ?? 0,
                roomType: data.roomType,
                roomCount: data.roomCount ?? 1,
                guestName: data.guestName,
                email: data.email,
                phone: data.phone,
                specialRequests: data.specialRequests,
                source: data.source ?? 'website',
            },
        });
    }
    findAll(status) {
        return this.prisma.booking.findMany({
            where: status ? { status } : undefined,
            orderBy: { createdAt: 'desc' },
        });
    }
    async findOne(id) {
        const booking = await this.prisma.booking.findUnique({ where: { id } });
        if (!booking)
            throw new common_1.NotFoundException('Booking not found');
        return booking;
    }
    updateStatus(id, status) {
        return this.prisma.booking.update({ where: { id }, data: { status } });
    }
    delete(id) {
        return this.prisma.booking.delete({ where: { id } });
    }
    findByEmail(email) {
        if (!email)
            return [];
        return this.prisma.booking.findMany({
            where: { email: email.toLowerCase() },
            orderBy: { createdAt: 'desc' },
            select: {
                id: true,
                guestName: true,
                checkIn: true,
                checkOut: true,
                roomType: true,
                adults: true,
                children: true,
                status: true,
                createdAt: true,
            },
        });
    }
    stats() {
        return this.prisma.booking.groupBy({
            by: ['status'],
            _count: { status: true },
        });
    }
};
exports.BookingsService = BookingsService;
exports.BookingsService = BookingsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], BookingsService);
//# sourceMappingURL=bookings.service.js.map