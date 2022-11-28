// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { chainIds } from "@lib/walletConstants";
import { contractLookup } from "@lib/contractLookup";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { account, tokenId } = req.query;

  if (typeof tokenId !== "string" || typeof account !== "string")
    return res.status(500).end();

  try {
    const contractPromises = chainIds.map((chainId) =>
      contractLookup[chainId].checkIfClaimed(tokenId, account)
    );

    const contractClaims = await Promise.all(contractPromises);
    const claimed = contractClaims.some(Boolean);

    const chainClaimed = claimed
      ? chainIds[
          contractClaims.flatMap((bool, index) => (bool ? index : []))[0]
        ]
      : 0;

    return res.json({ claimed, chainClaimed });
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }
}
