// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { ethers } from "ethers";
import abi721 from "@nfts/721BalanceOf.json";
import { RPCLookup } from "@lib/walletConstants";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { account, chainId, contractAddress } = req.query;

  if (
    typeof account !== "string" ||
    typeof chainId !== "string" ||
    typeof contractAddress !== "string"
  )
    return res.status(500).end();

  const chainIdAsNumber = parseInt(chainId, 10);

  try {
    const provider = new ethers.providers.JsonRpcProvider(
      RPCLookup[chainIdAsNumber]
    );

    const contract = new ethers.Contract(contractAddress, abi721, provider);

    const balance = parseInt(await contract.balanceOf(account), 10);

    const nftPass = balance > 0;

    return res.json({ nftPass });
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }
}
