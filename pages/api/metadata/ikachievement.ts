import type { NextApiRequest, NextApiResponse } from "next";
import metadata from "@nfts/metadata/IKAchievementMetadata.json";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { tokenid } = req.query;

  if (!tokenid || typeof tokenid === "object") return res.status(500).end();

  const tokenId = parseInt(tokenid, 10);

  if (tokenId >= metadata.length) return res.status(500).end();

  res.status(200).json(metadata[tokenId]);
}
