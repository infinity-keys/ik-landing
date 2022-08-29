// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { chainIds, contractLookup } from "@lib/walletConstants";
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
  const totalSupply = await contractLookup[AVAX_CHAIN_ID].totalSupplyAll();
  if (parseInt(tokenId, 10) >= totalSupply.length) return res.status(500).end();

  // let claimed = false;
  // for (let i = 0; i < chainIds.length; i++) {
  //   const contract = contractLookup[chainIds[i]];
  //   if (await contract.checkIfClaimed(tokenId, account)) claimed = true;
  // }
  const contractPromises = chainIds.map((chainId) =>
    contractLookup[chainId].checkIfClaimed(tokenId, account)
  );
  const contractClaims = await Promise.all(contractPromises);
  const claimed = contractClaims.some(Boolean);

  res.json({ claimed });
}
