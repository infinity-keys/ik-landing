import {
  Body,
  Controller,
  Get,
  Param,
  ParseArrayPipe,
  Post,
  Query,
} from '@nestjs/common';
import { AppService } from './app.service';
import { Headers } from '@nestjs/common';
import { IWebhook } from '@moralisweb3/streams-typings';

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
  ) {
    return this.appService.streamListener(
      streamListenerDto,
      headers,
      contract,
      methodIds,
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
