import type { NextApiRequest, NextApiResponse } from "next";
import { gqlApiSdk } from "@lib/server";
import { IKAchievementABI__factory } from "@lib/generated/ethers-contract";
import { CONTRACT_ADDRESS_POLYGON, POLYGON_RPC } from "@lib/walletConstants";
import { ethers } from "ethers";

const ethersJsonRpcProvider = new ethers.providers.JsonRpcProvider(POLYGON_RPC);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { tokenid } = req.query;

  if (typeof tokenid !== "string") return res.status(500).end();

  // Does our contract exist for this tokenid?
  const gql = await gqlApiSdk();
  const { nft_metadata_by_pk } = await gql.NftMetadata({
    nftId: parseInt(tokenid, 10),
    contractName: "achievement",
  });

  if (!nft_metadata_by_pk?.data) return res.status(500).end();

  // Finally, return
  res.json(nft_metadata_by_pk?.data);
}
