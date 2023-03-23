import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import Moralis from 'moralis';
import { IWebhook } from '@moralisweb3/streams-typings';
import * as mongo from 'mongodb';
import { InjectDb } from 'nest-mongodb';
import { Response } from 'express';
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
    response: Response,
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

    if (!confirmed || !txs.length)
      return response
        .status(HttpStatus.OK)
        .send({ message: 'No valid transactions present' });

    // Does this request contain any transactions with the methodId we're
    // looking for
    const filteredTransactions = txs.filter(({ input }) =>
      methodIds.includes(input?.slice(0, 10)),
    );

    // Return if there are no valid transactions
    if (!filteredTransactions.length)
      return response
        .status(HttpStatus.OK)
        .send({ message: 'Transaction does not contain monitored methodId' });

    // Get the user's wallet address
    const [{ fromAddress }] = filteredTransactions;
    // Get all the unique methodIds from the list of valid transactions
    const uniqueMethodIds = new Set(
      filteredTransactions.map(({ input }) => input?.slice(0, 10)),
    );

    // Creates the MongoDB query for one or many matching methodIds
    const result = Array.from(uniqueMethodIds).reduce((acc, methodId) => {
      const mongoParams = [contract, methodId, fromAddress].join('.');
      return {
        ...acc,
        [mongoParams]: streamListenerDto,
      };
    }, {});

    try {
      // We only have one document with dynamic fields
      await this.collection.updateOne(
        {},
        {
          $addToSet: result,
        },
        { upsert: true },
      );

      return response
        .status(HttpStatus.CREATED)
        .send({ message: 'Created new field' });
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
