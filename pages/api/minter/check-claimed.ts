// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { chainIds, contractLookup } from "@lib/contracts";
import { AVAX_CHAIN_ID } from "@lib/walletConstants";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { account, tokenId } = req.query;

  if (typeof tokenId !== "string" || typeof account !== "string")
    return res.status(500).end();

  // faster call on avax than eth.. theoretically should be the same
  // ensure token were checking exists
  //would be dope to move this to database
  if (
    parseInt(tokenId, 10) >=
    (await contractLookup[AVAX_CHAIN_ID].totalSupplyAll()).length
  )
    return res.status(500).end();

  let claimed = false;
  for (let i = 0; i < chainIds.length; i++) {
    const contract = contractLookup[chainIds[i]];
    if (await contract.checkIfClaimed(tokenId, account)) claimed = true;
  }

  res.json({ claimed: claimed });
}
