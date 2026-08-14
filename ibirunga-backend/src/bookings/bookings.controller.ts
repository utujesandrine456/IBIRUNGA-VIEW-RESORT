import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { BookingsService } from './bookings.service';

@Controller('bookings')
export class PublicBookingsController {
  constructor(private bookings: BookingsService) {}

  @Post()
  create(@Body() body: Parameters<BookingsService['create']>[0]) {
    return this.bookings.create(body);
  }
}

@Controller('admin/bookings')
@UseGuards(JwtAuthGuard)
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
