// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import castArray from "lodash/castArray";
import { contractLookup } from "@lib/contractLookup";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { account, tokenids, chainId } = req.query;

  if (typeof account !== "string" || typeof chainId !== "string" || !tokenids) {
    return res
      .setHeader("Cache-Control", "max-age=31536000, public")
      .status(500)
      .end();
  }

  // All responses will have 15 second cache time
  res.setHeader("Cache-Control", "max-age=15, public");

  const tokenIds = castArray(tokenids);

  const chainIdAsNumber = parseInt(chainId, 10);

  const contract = contractLookup[chainIdAsNumber];
  if (!contract) return res.status(500).end();

  const numTokens = (await contract.totalSupplyAll()).length;

  // check if token Ids exist
  const validIds = tokenIds.every((t) => parseInt(t, 10) < numTokens);

  if (!validIds || !contract) return res.status(500).end();

  const accountArray = Array(tokenIds.length).fill(account);

  //returns type ethers.BigNumber
  const balances = await contract?.balanceOfBatch(accountArray, tokenIds);

  //check every balance of every tokenId- if 0 for any of them return false
  const claimedTokens = balances?.map((b) => b.toNumber() > 0);
  // checks if all nft are claimed, returns true if eligible to claim pack nft
  const claimed = claimedTokens?.every((b) => b);

  res.json({ claimed, claimedTokens });
}
