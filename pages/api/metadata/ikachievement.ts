import type { NextApiRequest, NextApiResponse } from "next";
import metadata from "@nfts/metadata/IKAchievementMetadata.json";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { puzzleid } = req.query;

  if (!puzzleid || typeof puzzleid === "object") return res.status(500).end();

  const puzzleId = parseInt(puzzleid, 10);

  if (puzzleId >= metadata.length) return res.status(500).end();

  res.status(200).json(metadata[puzzleId]);
}
