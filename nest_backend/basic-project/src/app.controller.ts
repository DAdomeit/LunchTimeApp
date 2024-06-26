import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  init(): string {
    return 'Our amazing journey with Nest starts now!';
  }
}
