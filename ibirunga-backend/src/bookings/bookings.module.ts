import { Module } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { AdminBookingsController, PublicBookingsController } from './bookings.controller';

@Module({
  controllers: [PublicBookingsController, AdminBookingsController],
  providers: [BookingsService],
  exports: [BookingsService],
})
export class BookingsModule {}
