// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { ethers } from "ethers";
import {
  ETH_RPC,
  AVAX_RPC,
  CONTRACT_ADDRESS_AVAX,
  CONTRACT_ADDRESS_ETH,
} from "@lib/constants";
import ContractABI from "../../../future/dev/ContractABI.json";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let claimed: boolean;

  const { account, puzzleId } = req.query;
  if (!account || !puzzleId) return res.status(401).end();

  const contractAVAX = new ethers.Contract(
    CONTRACT_ADDRESS_AVAX,
    ContractABI,
    new ethers.providers.JsonRpcProvider(AVAX_RPC) //AVAX RPC provider
  );

  const avaxStatus: boolean = await contractAVAX.checkIfClaimed(
    puzzleId,
    account
  );
  if (avaxStatus) claimed = true;
  else claimed = false;

  const contractETH = new ethers.Contract(
    CONTRACT_ADDRESS_ETH,
    ContractABI,
    new ethers.providers.JsonRpcProvider(ETH_RPC) //ETH RPC provider
  );

  const ethStatus: boolean = await contractETH.checkIfClaimed(
    puzzleId,
    account
  );
  if (ethStatus) claimed = true;
  else claimed = false;

  res.status(200).json({ claimed: claimed });
}
