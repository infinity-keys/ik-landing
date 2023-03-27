import {
  Body,
  Controller,
  Get,
  Param,
  ParseArrayPipe,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { Headers } from '@nestjs/common';
import { AppService } from './app.service';
import { IWebhook } from '@moralisweb3/streams-typings';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/moralis/:contract')
  streamListener(
    @Query('methodId') methodId: string | string[],
    @Param('contract') contract: string,
    @Body()
    streamListenerDto: IWebhook,
    @Headers() headers: Record<string, string>[],
    @Res() response: Response,
  ) {
    return this.appService.streamListener(
      streamListenerDto,
      headers,
      contract,
      methodId,
      response,
    );
  }

  @Get('/hasUserCalledFunction')
  async hasUserCalledFunction(
    @Query('contractAddress') contractAddress: string,
    @Query('methodId') methodId: string | string[],
    @Query('walletAddress') walletAddress: string,
  ): Promise<{ hasUserCalledFunction: boolean[] }> {
    const hasCalled = await this.appService.hasUserCalledFunction(
      contractAddress,
      methodId,
      walletAddress,
    );
    return { hasUserCalledFunction: hasCalled };
  }
}
