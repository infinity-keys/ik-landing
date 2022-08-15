// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { ethers } from "ethers";
import castArray from "lodash/castArray";
import {
  ETH_RPC,
  AVAX_RPC,
  POLYGON_RPC,
  CONTRACT_ADDRESS_AVAX,
  CONTRACT_ADDRESS_ETH,
  CONTRACT_ADDRESS_POLYGON,
  AVAX_CHAIN_ID,
  ETH_CHAIN_ID,
  POLYGON_CHAIN_ID,
} from "@lib/walletConstants";

import { IKAchievementABI__factory } from "@lib/generated/ethers-contract/factories/IKAchievementABI__factory";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { account, tokenids, chainId } = req.query;

  if (typeof account !== "string" || typeof chainId !== "string" || !tokenids)
    return res.status(500).end();

  const tokenIds = castArray(tokenids);

  const chainIdAsNumber = parseInt(chainId, 10);

  // @TODO: move this to a helper util
  const contractLookup: {
    [key: number]: ReturnType<typeof IKAchievementABI__factory.connect>;
  } = {
    [AVAX_CHAIN_ID]: IKAchievementABI__factory.connect(
      CONTRACT_ADDRESS_AVAX,
      new ethers.providers.JsonRpcProvider(AVAX_RPC)
    ),
    [ETH_CHAIN_ID]: IKAchievementABI__factory.connect(
      CONTRACT_ADDRESS_ETH,
      new ethers.providers.JsonRpcProvider(ETH_RPC)
    ),
    [POLYGON_CHAIN_ID]: IKAchievementABI__factory.connect(
      CONTRACT_ADDRESS_POLYGON,
      new ethers.providers.JsonRpcProvider(POLYGON_RPC)
    ),
  };

  const contract = contractLookup[chainIdAsNumber];
  if (!contract) return res.status(500).end();
  const contractAVAX = contractLookup[AVAX_CHAIN_ID];

  // faster call on avax than eth..
  const numTokens = (await contractAVAX.totalSupplyAll()).length;

  // check if token Ids exist
  const validIds = tokenIds.every((t) => parseInt(t, 10) < numTokens);

  if (!validIds || !contract) return res.status(500).end();

  const accountArray = Array(tokenIds.length).fill(account);

  //returns type ethers.BigNumber
  const balances = await contract?.balanceOfBatch(accountArray, tokenIds);
  //check every balance of every tokenId- if 0 for any of them return false
  const claimed = !balances?.every((b) => b.toNumber() === 0);

  res.json({ claimed });
}
