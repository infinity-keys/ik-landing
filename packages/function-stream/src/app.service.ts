import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import Moralis from 'moralis';
import * as mongo from 'mongodb';
import { InjectDb } from 'nest-mongodb';
import { IWebhook } from '@moralisweb3/streams-typings';
import { Response } from 'express';
@Injectable()
export class AppService {
  private readonly collection: mongo.Collection;

  constructor(@InjectDb() private readonly db: mongo.Db) {
    this.collection = this.db.collection('contracts');
  }

  async streamListener(
    streamListenerDto: IWebhook,
    headers: Record<string, string>[],
    contract: string,
    methodId: string[],
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

    const formattedMethodId = (id) => id.slice(0, 10).toLowerCase();
    // Does this request contain any transactions with the methodId we're
    // looking for
    const filteredTransactions = txs.filter(({ input }) => {
      const currentMethodId = formattedMethodId(input);
      return methodId.includes(currentMethodId);
    });

    if (!filteredTransactions.length) {
      return response
        .status(HttpStatus.OK)
        .send({ message: 'No valid transactions present' });
    }
    // Get the user's wallet address
    const [{ fromAddress }] = filteredTransactions;
    const userAddress = fromAddress.toLowerCase();

    console.log(`valid tx from ${userAddress}`);

    // Get all the unique methodIds from the list of valid transactions
    const uniqueMethodIds = new Set(
      filteredTransactions.map(({ input }) => formattedMethodId(input)),
    );

    // Creates the MongoDB query for one or many matching methodIds
    const mutationData = Array.from(uniqueMethodIds).map((currentMethodId) => {
      return {
        [contract]: {
          [currentMethodId]: {
            [userAddress]: [streamListenerDto],
          },
        },
      };
    });

    try {
      await this.collection.insertMany(mutationData);

      console.log(`created entry for ${userAddress}`);

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
    methodId: string | string[],
    walletAddress: string,
  ) {
    // @TODO: implement auth header

    const methodIdArray = typeof methodId === 'string' ? [methodId] : methodId;

    const mongoParams = methodIdArray.map((methodId) =>
      [contractAddress, methodId, walletAddress].join('.').toLowerCase(),
    );

    // Checks if we have at least one document that matches
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
