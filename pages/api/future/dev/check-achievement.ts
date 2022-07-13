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
  const { account, puzzleId } = req.query;

  if (!account || !puzzleId) return res.status(500).end();
  if (typeof puzzleId === "object" || typeof account === "object")
    return res.status(500).end();

  const contractAVAX = ContractABI__factory.connect(
    CONTRACT_ADDRESS_AVAX,
    new ethers.providers.JsonRpcProvider(AVAX_RPC)
  );
  const avaxStatus = await contractAVAX.checkIfClaimed(puzzleId, account);

  const contractETH = ContractABI__factory.connect(
    CONTRACT_ADDRESS_ETH,
    new ethers.providers.JsonRpcProvider(ETH_RPC)
  );
  const ethStatus = await contractETH.checkIfClaimed(puzzleId, account);

  const claimed = ethStatus || avaxStatus;

  res.status(200).json({ claimed: claimed });
}
