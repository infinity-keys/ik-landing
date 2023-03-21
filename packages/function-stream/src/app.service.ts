import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import Moralis from 'moralis';
import { IWebhook } from '@moralisweb3/streams-typings';

@Injectable()
export class AppService {
  async streamListener(
    streamListenerDto: IWebhook,
    headers: Record<string, string>[],
  ) {
    try {
      Moralis.Streams.verifySignature({
        body: streamListenerDto,
        signature: headers['x-signature'],
      });
    } catch {
      // TODO: log via data dog
      console.error('Invalid Moralis signature');
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    const { txs } = streamListenerDto;

    const filteredTransactions = txs.filter(
      ({ input }) => input.slice(0, 10) === '0x22c67519',
    );

    if (filteredTransactions.length) {
      // @TODO: save to DB
      console.log(JSON.stringify(filteredTransactions, null, 2));
    }
  }

  async hasUserCalledFunction() {
    // @TODO: DB lookup
    return false;
  }
}
