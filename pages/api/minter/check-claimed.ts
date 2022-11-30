// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { gqlApiSdk } from "@lib/server";
import { IK_ID_COOKIE } from "@lib/constants";
import { verifyToken } from "@lib/jwt";
import { IKAchievementABI__factory } from "@lib/generated/ethers-contract";
import { ethers } from "ethers";
import { AVAX_RPC, ETH_RPC, OPTIMISM_RPC, POLYGON_RPC } from "@lib/rpc";
import {
  AVAX_CHAIN_ID,
  CONTRACT_ADDRESS_POLYGON,
  POLYGON_CHAIN_ID,
  CONTRACT_ADDRESS_AVAX,
  CONTRACT_ADDRESS_ETH,
  ETH_CHAIN_ID,
  CONTRACT_ADDRESS_OPTIMISM,
  OPTIMISM_CHAIN_ID,
} from "@lib/walletConstants";

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
    const polygonContract = IKAchievementABI__factory.connect(
      CONTRACT_ADDRESS_POLYGON,
      new ethers.providers.JsonRpcProvider(POLYGON_RPC)
    );
    const polygonClaim = await polygonContract.checkIfClaimed(tokenId, account);
    if (polygonClaim)
      return res.json({
        claimed: polygonClaim,
        chainClaimed: POLYGON_CHAIN_ID,
      });

    //AVAX
    const avaxContract = IKAchievementABI__factory.connect(
      CONTRACT_ADDRESS_AVAX,
      new ethers.providers.JsonRpcProvider(AVAX_RPC)
    );
    const avaxClaim = await avaxContract.checkIfClaimed(tokenId, account);
    if (avaxClaim)
      return res.json({ claimed: avaxClaim, chainClaimed: AVAX_CHAIN_ID });

    //ETH
    const ethContract = IKAchievementABI__factory.connect(
      CONTRACT_ADDRESS_ETH,
      new ethers.providers.JsonRpcProvider(ETH_RPC)
    );
    const ethClaim = await ethContract.checkIfClaimed(tokenId, account);
    if (ethClaim)
      return res.json({ claimed: ethClaim, chainClaimed: ETH_CHAIN_ID });

    //Optimism
    const optContract = IKAchievementABI__factory.connect(
      CONTRACT_ADDRESS_OPTIMISM,
      new ethers.providers.JsonRpcProvider(OPTIMISM_RPC)
    );
    const optClaim = await optContract.checkIfClaimed(tokenId, account);
    if (optClaim)
      return res.json({ claimed: optClaim, chainClaimed: OPTIMISM_CHAIN_ID });

    return res.json({ claimed: false, chainClaimed: 0 });
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }
}
