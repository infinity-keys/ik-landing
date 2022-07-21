// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { ethers } from "ethers";
import {
  ETH_RPC,
  AVAX_RPC,
  CONTRACT_ADDRESS_AVAX,
  CONTRACT_ADDRESS_ETH,
} from "@lib/constants";

import { IKAchievementABI__factory } from "@lib/generated/ethers-contract/factories/IKAchievementABI__factory";
import { jwtHasClaim } from "@lib/jwt";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { account, tokenId } = req.query;

  if (typeof tokenId !== "string" || typeof account !== "string")
    return res.status(500).end();

  const contractAVAX = IKAchievementABI__factory.connect(
    CONTRACT_ADDRESS_AVAX,
    new ethers.providers.JsonRpcProvider(AVAX_RPC)
  );

  const contractETH = IKAchievementABI__factory.connect(
    CONTRACT_ADDRESS_ETH,
    new ethers.providers.JsonRpcProvider(ETH_RPC)
  );

  // faster call on avax than eth.. theoretically should be the same
  // ensure token were checking exists
  if (parseInt(tokenId, 10) >= (await contractAVAX.totalSupplyAll()).length)
    return res.status(500).end();

  const avaxStatus = await contractAVAX.checkIfClaimed(tokenId, account);
  const ethStatus = await contractETH.checkIfClaimed(tokenId, account);

  const claimed = ethStatus || avaxStatus;

  res.json({ claimed: claimed });
}
