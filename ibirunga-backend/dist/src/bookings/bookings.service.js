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
const client_1 = require("@prisma/client");
const prisma_service_1 = require("../prisma/prisma.service");
function phoneDigits(value) {
    return (value ?? '').replace(/\D/g, '');
}
function phonesMatch(a, b) {
    const da = phoneDigits(a);
    const db = phoneDigits(b);
    if (!da || !db)
        return false;
    if (da === db)
        return true;
    const tail = Math.min(9, da.length, db.length);
    return da.slice(-tail) === db.slice(-tail);
}
const ADMIN_STATUSES = new Set(['pending', 'confirmed', 'rejected', 'cancelled']);
const myBookingSelect = {
    id: true,
    guestName: true,
    checkIn: true,
    checkOut: true,
    roomType: true,
    adults: true,
    children: true,
    status: true,
    createdAt: true,
};
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
                email: (data.email ?? '').trim().toLowerCase(),
                phone: data.phone.trim(),
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
    async updateStatus(id, status) {
        const next = status.trim().toLowerCase();
        if (!ADMIN_STATUSES.has(next)) {
            throw new common_1.BadRequestException('Invalid status. Use pending, confirmed, rejected, or cancelled.');
        }
        await this.findOne(id);
        return this.prisma.booking.update({ where: { id }, data: { status: next } });
    }
    async cancelByGuest(id, phone) {
        const booking = await this.findOne(id);
        if (!phonesMatch(booking.phone, phone)) {
            throw new common_1.BadRequestException('Phone number does not match this booking.');
        }
        if (booking.status.toLowerCase() !== 'pending') {
            throw new common_1.BadRequestException('Only pending bookings can be cancelled.');
        }
        return this.prisma.booking.update({
            where: { id },
            data: { status: 'cancelled' },
            select: myBookingSelect,
        });
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
            select: myBookingSelect,
        });
    }
    async findByPhone(phone) {
        const digits = phoneDigits(phone);
        if (digits.length < 9)
            return [];
        const tail = digits.slice(-9);
        try {
            const rows = await this.prisma.$queryRaw(client_1.Prisma.sql `
        SELECT
          id,
          "guestName",
          "checkIn",
          "checkOut",
          "roomType",
          adults,
          children,
          status,
          "createdAt"
        FROM "Booking"
        WHERE
          regexp_replace(phone, '[^0-9]', '', 'g') = ${digits}
          OR regexp_replace(phone, '[^0-9]', '', 'g') LIKE ${'%' + tail}
        ORDER BY "createdAt" DESC
      `);
            if (rows.length > 0)
                return rows;
        }
        catch {
        }
        const all = await this.prisma.booking.findMany({
            orderBy: { createdAt: 'desc' },
            select: { ...myBookingSelect, phone: true },
        });
        return all
            .filter((b) => {
            const stored = phoneDigits(b.phone);
            return stored === digits || stored.endsWith(tail);
        })
            .map(({ phone: _phone, ...rest }) => rest);
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