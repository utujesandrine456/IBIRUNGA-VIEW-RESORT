import { Controller, Get } from '@nestjs/common';
import { ContentService } from './content.service';

@Controller('content')
export class PublicContentController {
  constructor(private content: ContentService) {}

  @Get()
  getAll() {
    return this.content.getPublicContent();
  }
}
