import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

/** Digits only, for reliable phone matching across formats. */
function phoneDigits(value: string) {
  return (value ?? '').replace(/\D/g, '');
}

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
} as const;

@Injectable()
export class BookingsService {
  constructor(private prisma: PrismaService) {}

  create(data: {
    checkIn: string;
    checkOut: string;
    adults: number;
    children?: number;
    roomType?: string;
    roomCount?: number;
    guestName: string;
    email?: string;
    phone: string;
    specialRequests?: string;
    source?: string;
  }) {
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

  findAll(status?: string) {
    return this.prisma.booking.findMany({
      where: status ? { status } : undefined,
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const booking = await this.prisma.booking.findUnique({ where: { id } });
    if (!booking) throw new NotFoundException('Booking not found');
    return booking;
  }

  updateStatus(id: string, status: string) {
    return this.prisma.booking.update({ where: { id }, data: { status } });
  }

  delete(id: string) {
    return this.prisma.booking.delete({ where: { id } });
  }

  findByEmail(email: string) {
    if (!email) return [];
    return this.prisma.booking.findMany({
      where: { email: email.toLowerCase() },
      orderBy: { createdAt: 'desc' },
      select: myBookingSelect,
    });
  }

  /**
   * Look up bookings by phone. Matches regardless of spaces/dashes/+
   * by comparing digit-only forms (uses last 9 digits as fallback).
   */
  async findByPhone(phone: string) {
    const digits = phoneDigits(phone);
    if (digits.length < 9) return [];

    const tail = digits.slice(-9);

    // Postgres: strip non-digits then match full or last-9
    const rows = await this.prisma.$queryRaw<
      Array<{
        id: string;
        guestName: string;
        checkIn: Date;
        checkOut: Date;
        roomType: string | null;
        adults: number;
        children: number;
        status: string;
        createdAt: Date;
      }>
    >(Prisma.sql`
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

    return rows;
  }

  stats() {
    return this.prisma.booking.groupBy({
      by: ['status'],
      _count: { status: true },
    });
  }
}
