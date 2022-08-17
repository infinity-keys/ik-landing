// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import castArray from "lodash/castArray";
import { AVAX_CHAIN_ID } from "@lib/walletConstants";
import { contractLookup } from "@lib/contracts";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { account, tokenids, chainId } = req.query;

  if (typeof account !== "string" || typeof chainId !== "string" || !tokenids)
    return res.status(500).end();

  const tokenIds = castArray(tokenids);

  const chainIdAsNumber = parseInt(chainId, 10);

  const contract = contractLookup[chainIdAsNumber];
  if (!contract) return res.status(500).end();

  // faster call on avax than eth..
  const contractAVAX = contractLookup[AVAX_CHAIN_ID];
  const numTokens = (await contractAVAX.totalSupplyAll()).length;

  // check if token Ids exist
  const validIds = tokenIds.every((t) => parseInt(t, 10) < numTokens);

  if (!validIds || !contract) return res.status(500).end();

  const accountArray = Array(tokenIds.length).fill(account);

  //returns type ethers.BigNumber
  const balances = await contract?.balanceOfBatch(accountArray, tokenIds);
  //check every balance of every tokenId- if 0 for any of them return false
  const claimed = balances?.every((b) => b.toNumber() > 0);

  res.json({ claimed });
}
