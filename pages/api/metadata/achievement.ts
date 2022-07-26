import type { NextApiRequest, NextApiResponse } from "next";
import { gqlApiSdk } from "@lib/server";
import { IKAchievementABI__factory } from "@lib/generated/ethers-contract";
import { CONTRACT_ADDRESS_POLYGON, POLYGON_RPC } from "@lib/constants";
import { ethers } from "ethers";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { tokenid } = req.query;

  if (typeof tokenid !== "string") return res.status(500).end();

  const nftId = parseInt(tokenid, 10);

  const contractPolygon = IKAchievementABI__factory.connect(
    CONTRACT_ADDRESS_POLYGON,
    new ethers.providers.JsonRpcProvider(POLYGON_RPC)
  );
  const numTokens = (await contractPolygon.totalSupplyAll()).length;
  //if (nftId >= numTokens) return res.status(500).end();

  const gql = await gqlApiSdk();
  const { nft_metadata_by_pk } = await gql.NftMetadata({
    nftId,
    contractName: "achievement",
  });

  res.json(nft_metadata_by_pk?.data);
}
