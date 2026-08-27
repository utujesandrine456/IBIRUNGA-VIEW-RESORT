import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

/** Digits only, for reliable phone matching across formats. */
function phoneDigits(value: string) {
  return (value ?? '').replace(/\D/g, '');
}

function phonesMatch(a: string, b: string) {
  const da = phoneDigits(a);
  const db = phoneDigits(b);
  if (!da || !db) return false;
  if (da === db) return true;
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

  async updateStatus(id: string, status: string) {
    const next = status.trim().toLowerCase();
    if (!ADMIN_STATUSES.has(next)) {
      throw new BadRequestException(
        'Invalid status. Use pending, confirmed, rejected, or cancelled.',
      );
    }
    await this.findOne(id);
    return this.prisma.booking.update({ where: { id }, data: { status: next } });
  }

  /**
   * Guest cancels their own pending booking (verified by phone).
   * Admin decline uses status "rejected" instead.
   */
  async cancelByGuest(id: string, phone: string) {
    const booking = await this.findOne(id);
    if (!phonesMatch(booking.phone, phone)) {
      throw new BadRequestException('Phone number does not match this booking.');
    }
    if (booking.status.toLowerCase() !== 'pending') {
      throw new BadRequestException('Only pending bookings can be cancelled.');
    }
    return this.prisma.booking.update({
      where: { id },
      data: { status: 'cancelled' },
      select: myBookingSelect,
    });
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

    try {
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

      if (rows.length > 0) return rows;
    } catch {
      /* fall through to Prisma filter */
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
}
