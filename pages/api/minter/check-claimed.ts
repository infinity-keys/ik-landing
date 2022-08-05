// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import {
  contractETH,
  contractAVAX,
  contractPolygon,
} from "@lib/contractConstants";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { account, tokenId } = req.query;

  if (typeof tokenId !== "string" || typeof account !== "string")
    return res.status(500).end();

  // faster call on avax than eth.. theoretically should be the same
  // ensure token were checking exists
  if (parseInt(tokenId, 10) >= (await contractAVAX.totalSupplyAll()).length)
    return res.status(500).end();

  const avaxStatus = await contractAVAX.checkIfClaimed(tokenId, account);
  const polygonStatus = await contractPolygon.checkIfClaimed(tokenId, account);
  const ethStatus = await contractETH.checkIfClaimed(tokenId, account);

  const claimed = ethStatus || avaxStatus || polygonStatus;

  res.json({ claimed: claimed });
}
