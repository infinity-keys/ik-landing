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
import { AppService } from './app.service';
import { Headers } from '@nestjs/common';
import { IWebhook } from '@moralisweb3/streams-typings';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/moralis/:contract')
  streamListener(
    @Query('methodIds', new ParseArrayPipe({ items: String, separator: ',' }))
    methodIds: string[],
    @Param('contract') contract: string,
    @Body()
    streamListenerDto: IWebhook,
    @Headers() headers: Record<string, string>[],
    @Res() response: Response,
  ): Promise<Response> {
    return this.appService.streamListener(
      streamListenerDto,
      headers,
      contract,
      methodIds,
      response,
    );
  }

  @Get('/hasUserCalledFunction')
  async hasUserCalledFunction(
    @Query('contractAddress') contractAddress: string,
    @Query('methodIds', new ParseArrayPipe({ items: String, separator: ',' }))
    methodIds: string[],
    @Query('walletAddress') walletAddress: string,
  ): Promise<{ hasUserCalledFunction: boolean[] }> {
    const hasCalled = await this.appService.hasUserCalledFunction(
      contractAddress,
      methodIds,
      walletAddress,
    );
    return { hasUserCalledFunction: hasCalled };
  }
}
