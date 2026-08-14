import { Module } from '@nestjs/common';
import { BookingsModule } from '../bookings/bookings.module';
import { ContentService } from './content.service';
import { PublicContentController } from './public-content.controller';
import { AdminContentController } from './admin-content.controller';

@Module({
  imports: [BookingsModule],
  controllers: [PublicContentController, AdminContentController],
  providers: [ContentService],
  exports: [ContentService],
})
export class ContentModule {}
