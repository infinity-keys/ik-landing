// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { chainRPCLookup } from "@lib/walletConstants";
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
  if (walletTxCount === 0) res.json({ approved: false });

  if (chainIdInt === 43114) res.json({ approved: true });

  const etherscanProvider = new ethers.providers.EtherscanProvider(
    "homestead",
    process.env.ETHERSCAN_API_KEY
  );

  const oldestTransaction = (await etherscanProvider.getHistory(account))[0]
    .blockNumber;
  const currentBlock = await provider.getBlockNumber();
  const age = oldestTransaction ? currentBlock - oldestTransaction : 0;

  const approved = age > 5760 ? true : false;

  res.json({ approved });
}
