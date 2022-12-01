import type { NextApiRequest, NextApiResponse } from "next";
import { gqlApiSdk } from "@lib/server";

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
  res
    // Cache response for 10 minutes
    .setHeader("Cache-Control", "max-age=600, public")
    .json(nft_metadata_by_pk?.data);
}
