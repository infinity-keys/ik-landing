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
} from "@lib/walletConstants";

import { IKAchievementABI__factory } from "@lib/generated/ethers-contract/factories/IKAchievementABI__factory";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { account, tokenids } = req.query;

  if (typeof account !== "string" || !tokenids) return res.status(500).end();

  const tokenIds = castArray(tokenids);

  const contractAvax = IKAchievementABI__factory.connect(
    CONTRACT_ADDRESS_AVAX,
    new ethers.providers.JsonRpcProvider(AVAX_RPC)
  );

  const contractEth = IKAchievementABI__factory.connect(
    CONTRACT_ADDRESS_ETH,
    new ethers.providers.JsonRpcProvider(ETH_RPC)
  );

  const contractPolygon = IKAchievementABI__factory.connect(
    CONTRACT_ADDRESS_POLYGON,
    new ethers.providers.JsonRpcProvider(POLYGON_RPC)
  );

  if (!contractAvax || !contractEth || !contractPolygon)
    return res.status(500).end();

  // faster call on avax than eth..
  const numTokens = (await contractAvax.totalSupplyAll()).length;

  // check if token Ids exist
  const validIds = tokenIds.every((t) => parseInt(t, 10) < numTokens);
  if (!validIds) return res.status(500).end();

  const accountArray = Array(tokenIds.length).fill(account);

  //returns type ethers.BigNumber
  const balancesAvax = await contractAvax?.balanceOfBatch(
    accountArray,
    tokenIds
  );
  const balancesEth = await contractEth?.balanceOfBatch(accountArray, tokenIds);
  const balancesPolygon = await contractPolygon?.balanceOfBatch(
    accountArray,
    tokenIds
  );
  //check every balance of every tokenId- if 0 for any of them return false
  const claimedAvax = !balancesAvax?.every((b) => b.toNumber() === 0);
  const claimedEth = !balancesEth?.every((b) => b.toNumber() === 0);
  const claimedPolygon = !balancesPolygon?.every((b) => b.toNumber() === 0);

  const claimed = claimedAvax || claimedEth || claimedPolygon;

  res.json({ claimed });
}
