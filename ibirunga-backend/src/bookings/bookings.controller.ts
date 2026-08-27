import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { AdminAuthGuard, JwtAuthGuard } from '../auth/jwt-auth.guard';
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './create-booking.dto';

@Controller('bookings')
export class PublicBookingsController {
  constructor(private bookings: BookingsService) {}

  @Throttle({ default: { limit: 10, ttl: 60_000 } })
  @Post()
  create(@Body() body: CreateBookingDto) {
    return this.bookings.create(body);
  }

  @Throttle({ default: { limit: 20, ttl: 60_000 } })
  @Get('my')
  findMine(@Query('phone') phone?: string, @Query('email') email?: string) {
    if (phone?.trim()) return this.bookings.findByPhone(phone);
    if (email?.trim()) return this.bookings.findByEmail(email);
    return [];
  }

  /** Guest cancels a pending booking they own (phone must match). */
  @Throttle({ default: { limit: 10, ttl: 60_000 } })
  @Patch(':id/cancel')
  cancelMine(@Param('id') id: string, @Body('phone') phone?: string) {
    if (!phone?.trim()) {
      throw new BadRequestException('Phone number is required to cancel a booking.');
    }
    return this.bookings.cancelByGuest(id, phone);
  }
}

@Controller('admin/bookings')
@UseGuards(JwtAuthGuard, AdminAuthGuard)
export class AdminBookingsController {
  constructor(private bookings: BookingsService) {}

  @Get()
  findAll(@Query('status') status?: string) {
    return this.bookings.findAll(status);
  }

  @Get('stats')
  stats() {
    return this.bookings.stats();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookings.findOne(id);
  }

  @Patch(':id/status')
  updateStatus(@Param('id') id: string, @Body('status') status: string) {
    return this.bookings.updateStatus(id, status);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookings.delete(id);
  }
}
