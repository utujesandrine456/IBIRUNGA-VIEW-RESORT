import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

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
    email: string;
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
        email: data.email,
        phone: data.phone,
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
}
