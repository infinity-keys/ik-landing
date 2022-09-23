// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { avalancheChain, chainRPCLookup } from "@lib/walletConstants";
import { ethers } from "ethers";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { account, chainId } = req.query;

  if (typeof chainId !== "string" || typeof account !== "string")
    return res.status(500).end();

  const chainIdInt = parseInt(chainId, 10);

  const rpcURL = chainRPCLookup[chainIdInt];

  const provider = new ethers.providers.JsonRpcProvider(rpcURL);
  const walletTxCount = await provider.getTransactionCount(account);
  if (walletTxCount === 0) return res.json({ approved: false }); // ETH will blow up if 0

  let approved;
  // Trying to work this, but currently only eth has this etherscan provider
  // that can be called to get history, and check the oldest block of account
  if (chainIdInt === 1) {
    const etherscanProvider = new ethers.providers.EtherscanProvider(
      undefined,
      process.env.ETHERSCAN_API_KEY
    );
    const oldestTransaction = (await etherscanProvider.getHistory(account))[0]
      .blockNumber;
    const currentBlock = await provider.getBlockNumber();
    const age = oldestTransaction ? currentBlock - oldestTransaction : 0;

    approved = age > 5760 ? true : false;
  } else {
    approved = walletTxCount > 1;
  }

  res.json({ approved });
}
