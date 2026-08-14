import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { BookingsService } from '../bookings/bookings.service';
import { ContentService } from './content.service';

@Controller('admin')
@UseGuards(JwtAuthGuard)
export class AdminContentController {
  constructor(
    private content: ContentService,
    private bookings: BookingsService,
  ) {}

  @Get('dashboard')
  async dashboard() {
    const [amenities, rooms, testimonials, blogPosts, extraServices, bookingList] =
      await Promise.all([
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
    };
  }

  @Get('site')
  getSite() {
    return this.content.getSite();
  }

  @Put('site')
  updateSite(@Body() body: Parameters<ContentService['updateSite']>[0]) {
    return this.content.updateSite(body);
  }

  @Get('sections/:id')
  getSection(@Param('id') id: string) {
    return this.content.getSection(id);
  }

  @Put('sections/:id')
  updateSection(@Param('id') id: string, @Body() body: Record<string, unknown>) {
    return this.content.updateSection(id, body);
  }

  @Get('nav-links')
  listNavLinks() {
    return this.content.listNavLinks();
  }

  @Post('nav-links')
  createNavLink(@Body() body: { label: string; href: string; sortOrder?: number; published?: boolean }) {
    return this.content.createNavLink(body);
  }

  @Patch('nav-links/:id')
  updateNavLink(@Param('id') id: string, @Body() body: Record<string, unknown>) {
    return this.content.updateNavLink(id, body);
  }

  @Delete('nav-links/:id')
  deleteNavLink(@Param('id') id: string) {
    return this.content.deleteNavLink(id);
  }

  @Get('amenities')
  listAmenities() {
    return this.content.listAmenities(true);
  }

  @Post('amenities')
  createAmenity(@Body() body: { title: string; description: string; image: string; sortOrder?: number; published?: boolean }) {
    return this.content.createAmenity(body);
  }

  @Patch('amenities/:id')
  updateAmenity(@Param('id') id: string, @Body() body: Record<string, unknown>) {
    return this.content.updateAmenity(id, body);
  }

  @Delete('amenities/:id')
  deleteAmenity(@Param('id') id: string) {
    return this.content.deleteAmenity(id);
  }

  @Get('rooms')
  listRooms() {
    return this.content.listRooms(true);
  }

  @Post('rooms')
  createRoom(@Body() body: Parameters<ContentService['createRoom']>[0]) {
    return this.content.createRoom(body);
  }

  @Patch('rooms/:id')
  updateRoom(@Param('id') id: string, @Body() body: Record<string, unknown>) {
    return this.content.updateRoom(id, body);
  }

  @Delete('rooms/:id')
  deleteRoom(@Param('id') id: string) {
    return this.content.deleteRoom(id);
  }

  @Get('extra-services')
  listExtraServices() {
    return this.content.listExtraServices(true);
  }

  @Post('extra-services')
  createExtraService(@Body() body: { title: string; subtitle: string; price: string; features: string[]; sortOrder?: number; published?: boolean }) {
    return this.content.createExtraService(body);
  }

  @Patch('extra-services/:id')
  updateExtraService(@Param('id') id: string, @Body() body: Record<string, unknown>) {
    return this.content.updateExtraService(id, body as never);
  }

  @Delete('extra-services/:id')
  deleteExtraService(@Param('id') id: string) {
    return this.content.deleteExtraService(id);
  }

  @Get('testimonials')
  listTestimonials() {
    return this.content.listTestimonials(true);
  }

  @Post('testimonials')
  createTestimonial(@Body() body: Parameters<ContentService['createTestimonial']>[0]) {
    return this.content.createTestimonial(body);
  }

  @Patch('testimonials/:id')
  updateTestimonial(@Param('id') id: string, @Body() body: Record<string, unknown>) {
    return this.content.updateTestimonial(id, body);
  }

  @Delete('testimonials/:id')
  deleteTestimonial(@Param('id') id: string) {
    return this.content.deleteTestimonial(id);
  }

  @Get('blog-posts')
  listBlogPosts() {
    return this.content.listBlogPosts(true);
  }

  @Post('blog-posts')
  createBlogPost(@Body() body: Parameters<ContentService['createBlogPost']>[0]) {
    return this.content.createBlogPost(body);
  }

  @Patch('blog-posts/:id')
  updateBlogPost(@Param('id') id: string, @Body() body: Record<string, unknown>) {
    return this.content.updateBlogPost(id, body);
  }

  @Delete('blog-posts/:id')
  deleteBlogPost(@Param('id') id: string) {
    return this.content.deleteBlogPost(id);
  }

  @Get('footer-services')
  listFooterServices() {
    return this.content.listFooterServices();
  }

  @Post('footer-services')
  createFooterService(@Body() body: { label: string; sortOrder?: number }) {
    return this.content.createFooterService(body);
  }

  @Patch('footer-services/:id')
  updateFooterService(@Param('id') id: string, @Body() body: Record<string, unknown>) {
    return this.content.updateFooterService(id, body);
  }

  @Delete('footer-services/:id')
  deleteFooterService(@Param('id') id: string) {
    return this.content.deleteFooterService(id);
  }
}
