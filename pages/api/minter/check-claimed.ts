// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { gqlApiSdk } from "@lib/server";
import { IK_ID_COOKIE } from "@lib/constants";
import { jwtHasClaim, jwtHasNoClaims, verifyToken } from "@lib/jwt";
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
  const { account, tokenId } = req.query;

  if (typeof tokenId !== "string" || typeof account !== "string") {
    return res
      .setHeader("Cache-Control", "max-age=31536000, public")
      .status(500)
      .end();
  }

  // All responses will have 15 second cache time
  res.setHeader("Cache-Control", "max-age=15, public");

  // checks if they've solved any puzzles at all
  const jwt = req.cookies[IK_ID_COOKIE];
  if (!jwt) {
    return res
      .status(401)
      .send({ error: "You have not solved the puzzles needed to mint" });
  }

  if (await jwtHasNoClaims(jwt)) {
    return res
      .status(401)
      .send({ error: "You have not solved the puzzles needed to mint" });
  }

  const tokenIdAsInt = parseInt(tokenId, 10);
  // Next gate: check the DB for tokenId in both NFT table AND! pack table
  const gql = await gqlApiSdk();
  const { puzzles, packs } = await gql.GetGatedIdsByNftId({
    nftIdNum: tokenId,
    nftIdInt: tokenIdAsInt,
  });

  if (!puzzles.length && !packs.length) return res.status(400).end();

  // ensures all related puzzles have been solved
  const successRoutes = puzzles.length
    ? puzzles.map(({ success_route }) => success_route)
    : packs[0].pack_puzzles.map(({ puzzle }) => puzzle.success_route);

  const canAccess = await jwtHasClaim(jwt, successRoutes);
  if (!canAccess)
    return res
      .status(403)
      .send({ error: "You have not solved the puzzles needed to mint" });

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
