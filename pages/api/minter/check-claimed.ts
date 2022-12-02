// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { gqlApiSdk } from "@lib/server";
import { IK_ID_COOKIE } from "@lib/constants";
import { jwtHasClaim, verifyToken } from "@lib/jwt";
import {
  AVAX_CHAIN_ID,
  POLYGON_CHAIN_ID,
  ETH_CHAIN_ID,
  OPTIMISM_CHAIN_ID,
} from "@lib/walletConstants";
import { contractLookup } from "@lib/contractLookup";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { account, tokenId, successRoute } = req.query;

  if (
    typeof tokenId !== "string" ||
    typeof account !== "string" ||
    typeof successRoute !== "string"
  ) {
    return res
      .setHeader("Cache-Control", "max-age=31536000, public")
      .status(500)
      .end();
  }

  // All responses will have 15 second cache time
  res.setHeader("Cache-Control", "max-age=15, public");

  const tokenIdAsInt = parseInt(tokenId, 10);

  const jwt = req.cookies[IK_ID_COOKIE];
  if (!jwt) return res.status(401).end();

  // Validate token first, no valid JWT, bail. If not allowed to visit this route
  // then also bail.
  try {
    const canAccess = await jwtHasClaim(jwt, [successRoute]);
    if (!canAccess) return res.status(403).end();
  } catch (e) {
    // Bad token
    console.warn(e);
    return res.status(401).end();
  }

  const gql = await gqlApiSdk();

  // Next gate: check the DB for tokenId in both NFT table AND! pack table
  const results = await gql.CheckNftOrPackForToken({
    tokenIdInt: tokenIdAsInt,
    tokenIdNum: tokenIdAsInt,
  });

  const existsNfts = results.nfts.some((nft) => nft.tokenId >= 0);
  const existsPacks = results.packs.some(
    (pack) => parseInt(pack.nftId, 10) >= 0
  );

  // The nft token id sent in does not exist in our
  if (!existsNfts && !existsPacks) {
    return res.status(404).end();
  }

  try {
    //POLYGON
    const polygonContract = contractLookup[POLYGON_CHAIN_ID];

    const polygonClaim = await polygonContract.checkIfClaimed(tokenId, account);
    if (polygonClaim)
      return res.json({
        claimed: polygonClaim,
        chainClaimed: POLYGON_CHAIN_ID,
      });

    //AVAX
    const avaxContract = contractLookup[AVAX_CHAIN_ID];
    const avaxClaim = await avaxContract.checkIfClaimed(tokenId, account);
    if (avaxClaim)
      return res.json({ claimed: avaxClaim, chainClaimed: AVAX_CHAIN_ID });

    //ETH
    const ethContract = contractLookup[ETH_CHAIN_ID];
    const ethClaim = await ethContract.checkIfClaimed(tokenId, account);
    if (ethClaim)
      return res.json({ claimed: ethClaim, chainClaimed: ETH_CHAIN_ID });

    //Optimism
    const optContract = contractLookup[OPTIMISM_CHAIN_ID];
    const optClaim = await optContract.checkIfClaimed(tokenId, account);
    if (optClaim)
      return res.json({ claimed: optClaim, chainClaimed: OPTIMISM_CHAIN_ID });

    return res.json({ claimed: false, chainClaimed: 0 });
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }
}
