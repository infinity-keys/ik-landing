// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { ethers } from "ethers";
import {
  AVAX_CHAIN_ID,
  CONTRACT_ADDRESS_AVAX,
  CONTRACT_ADDRESS_ETH,
  ETH_CHAIN_ID,
} from "@lib/constants";

const privateKey = process.env.PRIVATE_KEY_VERIFY;
const secret = process.env.MINT_SECRET_VERIFY;

const wallet = new ethers.Wallet(privateKey || "");

type Signature = {
  signature: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Signature>
) {
  const { account, puzzleId, chainId } = req.query;
  if (!account || !puzzleId || !chainId || !wallet)
    return res.status(500).end();

  if (
    typeof puzzleId === "object" ||
    typeof account === "object" ||
    typeof chainId === "object"
  )
    return res.status(500).end();

  const chainIdAsNumber = parseInt(chainId, 10);

  const contractAddress =
    chainIdAsNumber === AVAX_CHAIN_ID
      ? CONTRACT_ADDRESS_AVAX
      : chainIdAsNumber === ETH_CHAIN_ID
      ? CONTRACT_ADDRESS_ETH
      : undefined;
  if (!contractAddress) return res.status(500).end();

  const hash = ethers.utils.solidityKeccak256(
    ["address", "address", "string", "string"],
    [contractAddress, account, puzzleId, secret]
  );

  const signature = await wallet.signMessage(ethers.utils.arrayify(hash));

  res.status(200).json({ signature: signature });
}
