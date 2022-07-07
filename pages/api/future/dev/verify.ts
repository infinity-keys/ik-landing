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

let wallet: ethers.Wallet;

if (privateKey) {
  wallet = new ethers.Wallet(privateKey);
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { account, puzzleId, chainId } = req.query;
  if (!account || !puzzleId || !chainId || !wallet)
    return res.status(401).end();

  let contract: string;

  if (chainId === String(AVAX_CHAIN_ID)) {
    contract = CONTRACT_ADDRESS_AVAX;
  } else if (chainId === String(ETH_CHAIN_ID)) {
    contract = CONTRACT_ADDRESS_ETH;
  } else return res.status(404).end();

  const hash = ethers.utils.solidityKeccak256(
    ["address", "address", "string", "string"],
    [contract, account, puzzleId, secret]
  );

  const signatureObject = await wallet.signMessage(ethers.utils.arrayify(hash));

  res.status(200).json({ signature: signatureObject });
}
