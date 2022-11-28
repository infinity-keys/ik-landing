// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { chainIds } from "@lib/walletConstants";
import { castArray } from "lodash";
import { contractLookup } from "@lib/contractLookup";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { tokenids } = req.query;

  const tokenIds = castArray(tokenids);

  const contractPromises = chainIds.map((chainId) =>
    contractLookup[chainId].totalSupplyAll()
  );

  const contractClaims = await Promise.all(contractPromises);

  const tokensMinted = tokenIds.map((token) => {
    return contractClaims.flatMap((totalSupply) => {
      const tokenId = parseInt(token, 10);
      return totalSupply[tokenId].toNumber() > 0;
    });
  });

  const returnArray = tokensMinted.map((bools) => bools.some((b) => b));

  res.json({ tokensMinted: returnArray });
}
