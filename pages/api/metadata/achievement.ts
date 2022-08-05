import type { NextApiRequest, NextApiResponse } from "next";
import { gqlApiSdk } from "@lib/server";
import { contractPolygon } from "@lib/contractConstants";
import { ethers } from "ethers";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { tokenid } = req.query;

  if (typeof tokenid !== "string") return res.status(500).end();

  const nftId = parseInt(tokenid, 10);

  const numTokens = (await contractPolygon.totalSupplyAll()).length;
  if (nftId >= numTokens) return res.status(500).end();

  const gql = await gqlApiSdk();
  const { nft_metadata_by_pk } = await gql.NftMetadata({
    nftId,
    contractName: "achievement",
  });

  res.json(nft_metadata_by_pk?.data);
}
