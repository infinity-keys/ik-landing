import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import Moralis from 'moralis';
import { IWebhook } from '@moralisweb3/streams-typings';
import * as mongo from 'mongodb';
import { InjectDb } from 'nest-mongodb';

@Injectable()
export class AppService {
  private readonly collection: mongo.Collection;

  constructor(@InjectDb() private readonly db: mongo.Db) {
    this.collection = this.db.collection('demo');
  }

  async streamListener(
    streamListenerDto: IWebhook,
    headers: Record<string, string>[],
    contract: string,
    methodIds: string[],
  ) {
    // Ensures the request is coming from Moralis
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

    // Moralis sends two request, one when the transaction happens and one after
    // it has been confirmed on the blockchain. We only care about confirmed
    const { txs, confirmed } = streamListenerDto;

    if (!confirmed || !txs.length) return;

    // Does this request
    const filteredTransactions = txs.filter(({ input }) =>
      methodIds.includes(input?.slice(0, 10)),
    );

    if (!filteredTransactions.length) return;

    const [firstTransaction] = filteredTransactions;

    try {
      // @TODO: Handle cases where we are monitoring two methodIds and one object
      // comes in with multiple matching transactions. We'll have to write to
      // both methodIds in the DB
      const mongoParams = [
        contract,
        firstTransaction.input.slice(0, 10),
        firstTransaction.fromAddress,
      ].join('.');

      await this.collection.updateOne(
        {},
        {
          $addToSet: {
            [mongoParams]: streamListenerDto,
          },
        },
        { upsert: true },
      );
    } catch (e) {
      console.log(e);
      console.error('Problem adding transaction to DB');
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async hasUserCalledFunction(
    contractAddress: string,
    methodIds: string[],
    walletAddress: string,
  ) {
    // @TODO: implement auth header
    const mongoParams = methodIds.map((methodId) =>
      [contractAddress, methodId, walletAddress].join('.'),
    );

    const results = await Promise.all(
      mongoParams.map((params) =>
        this.collection.countDocuments({
          [params]: {
            $exists: true,
            $ne: [],
          },
        }),
      ),
    );

    return results.map((num) => !!num);
  }
}
