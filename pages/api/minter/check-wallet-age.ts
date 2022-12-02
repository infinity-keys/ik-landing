// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { providerLookup } from "@lib/contractLookup";
import { ethers } from "ethers";
import { IK_ID_COOKIE } from "@lib/constants";
import { verifyToken } from "@lib/jwt";

const etherscanProvider = new ethers.providers.EtherscanProvider(
  undefined,
  process.env.ETHERSCAN_API_KEY
);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { account, chainId } = req.query;

  if (typeof chainId !== "string" || typeof account !== "string") {
    return res
      .setHeader("Cache-Control", "max-age=31536000, public")
      .status(500)
      .end();
  }

  // All responses will have 15 second cache time
  res.setHeader("Cache-Control", "max-age=15, public");

  // checks ik jwt exists
  const jwt = req.cookies[IK_ID_COOKIE];
  if (!jwt) return res.status(401).end();

  // Validate token first, no valid JWT, bail
  try {
    await verifyToken(jwt);
  } catch (e) {
    // Bad token
    return res.status(401).end();
  }

  const chainIdInt = parseInt(chainId, 10);

  const provider = providerLookup[chainIdInt];

  if (!provider) {
    throw new Error("Cannot instantiate provider for some reason.");
  }

  const walletTxCount = await provider.getTransactionCount(account);

  if (walletTxCount < 2) {
    console.log(`Wallet ${account} has less than 2 transactions.`);
    return res.json({ approved: false });
  } // ETH will blow up if 0

  // Trying to work this, but currently only eth has this etherscan provider
  // that can be called to get history, and check the oldest block of account
  if (chainIdInt === 1) {
    const oldestTransaction = (await etherscanProvider.getHistory(account))[0]
      .blockNumber;
    const currentBlock = await provider.getBlockNumber();
    const age = oldestTransaction ? currentBlock - oldestTransaction : 0;

    return res.json({ approved: age > 5760 });
  }

  return res.json({ approved: walletTxCount > 1 });
}
