// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { ethers } from "ethers";
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
} from "@lib/constants";

import { IKAchievementABI__factory } from "@lib/generated/ethers-contract/factories/IKAchievementABI__factory";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { account, tokenids, chainId } = req.query;

  if (typeof account !== "string" || typeof chainId !== "string")
    return res.status(500).end();

  const tokenIds =
    typeof tokenids === "string"
      ? new Array(tokenids) // if only looking for 1 value make into array
      : typeof tokenids === "object"
      ? tokenids
      : undefined;

  if (!tokenIds) return res.status(500).end();

  const chainIdAsNumber = parseInt(chainId, 10);

  const contractAVAX = IKAchievementABI__factory.connect(
    CONTRACT_ADDRESS_AVAX,
    new ethers.providers.JsonRpcProvider(AVAX_RPC)
  );

  const contractPolygon = IKAchievementABI__factory.connect(
    CONTRACT_ADDRESS_POLYGON,
    new ethers.providers.JsonRpcProvider(POLYGON_RPC)
  );

  const contractETH = IKAchievementABI__factory.connect(
    CONTRACT_ADDRESS_ETH,
    new ethers.providers.JsonRpcProvider(ETH_RPC)
  );

  const contract =
    chainIdAsNumber === AVAX_CHAIN_ID
      ? contractAVAX
      : chainIdAsNumber === ETH_CHAIN_ID
      ? contractETH
      : chainIdAsNumber === POLYGON_CHAIN_ID
      ? contractPolygon
      : undefined;

  // faster call on avax than eth..
  const numTokens = (await contractAVAX.totalSupplyAll()).length;

  const validIds = tokenIds.every(function (e) {
    return parseInt(e, 10) < numTokens;
  });

  if (!validIds) return res.status(500).end();

  const accountArray = Array(tokenIds.length).fill(account);

  //returns type ethers.BigNumber
  const balances = await contract?.balanceOfBatch(accountArray, tokenIds);
  //check every balance of every tokenId- if 0 for any of them return false
  const claimed = !balances?.every(function (e) {
    return e.toNumber() === 0;
  });
  console.log(claimed);

  res.json({ claimed: claimed });
}
