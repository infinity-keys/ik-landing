import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { Headers } from '@nestjs/common';
import { IWebhook } from '@moralisweb3/streams-typings';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  streamListener(
    @Body() streamListenerDto: IWebhook,
    @Headers() headers: Record<string, string>[],
  ) {
    return this.appService.streamListener(streamListenerDto, headers);
  }

  @Get()
  hasUserCalledFunction(): Promise<boolean> {
    return this.appService.hasUserCalledFunction();
  }
}
