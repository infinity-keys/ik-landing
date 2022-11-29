// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { chainIds } from "@lib/walletConstants";
import { contractLookup } from "@lib/contractLookup";
import { gqlApiSdk } from "@lib/server";
import { IK_ID_COOKIE } from "@lib/constants";
import { verifyToken } from "@lib/jwt";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { account, tokenId } = req.query;

  if (typeof tokenId !== "string" || typeof account !== "string")
    return res.status(500).end();

  const tokenIdAsInt = parseInt(tokenId, 10);

  const jwtToken = req.cookies[IK_ID_COOKIE];
  if (!jwtToken) return res.status(401).end();

  // Validate token first, no valid JWT, bail
  try {
    await verifyToken(jwtToken);
  } catch (e) {
    // Bad token
    return res.status(401).end();
  }

  // Next gate: check the DB for tokenId in both NFT table AND! pack table
  const gql = await gqlApiSdk();
  const results = await gql.CheckNftOrPackForToken({
    tokenIdInt: tokenIdAsInt,
    tokenIdNum: tokenIdAsInt,
  });

  const existsNfts = results.nfts.some((nft) => !!nft.tokenId);
  const existsPacks = results.packs.some((pack) => !!pack.nftId);

  // The nft token id sent in does not exist in our
  if (!existsNfts && !existsPacks) {
    return res.status(404).end();
  }

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
