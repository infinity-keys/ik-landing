// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { ethers } from "ethers";
import {
  ETH_RPC,
  AVAX_RPC,
  CONTRACT_ADDRESS_AVAX,
  CONTRACT_ADDRESS_ETH,
} from "@lib/constants";

import { ContractABI__factory } from "../../../../types/ethers-contracts/factories/ContractABI__factory";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let claimed: boolean;

  const { account, puzzleId } = req.query;
  if (!account || !puzzleId) return res.status(401).end();

  if (typeof puzzleId === "object" || typeof account === "object") {
    return res.status(500).end();
  }

  const contractAVAX = ContractABI__factory.connect(
    CONTRACT_ADDRESS_AVAX,
    new ethers.providers.JsonRpcProvider(AVAX_RPC)
  );

  const avaxStatus = await contractAVAX.checkIfClaimed(puzzleId, account);
  if (avaxStatus) claimed = true;
  else claimed = false;

  const contractETH = ContractABI__factory.connect(
    CONTRACT_ADDRESS_ETH,
    new ethers.providers.JsonRpcProvider(ETH_RPC)
  );

  const ethStatus: boolean = await contractETH.checkIfClaimed(
    puzzleId,
    account
  );
  if (ethStatus) claimed = true;
  else claimed = false;

  res.status(200).json({ claimed: claimed });
}
