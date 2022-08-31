import type { NextApiRequest, NextApiResponse } from "next";

import { gqlApiSdk } from "@lib/server";
import { verifyToken } from "@lib/jwt";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "DELETE") {
    return res.status(405).end();
  }

  const { userId, email, jwt } = req.query;

  if (
    !userId ||
    typeof userId !== "string" ||
    !jwt ||
    typeof jwt !== "string"
  ) {
    return res.status(400).end();
  }

  if (email && typeof email !== "string") {
    return res.status(400).end();
  }

  const verified = await verifyToken(jwt);
  console.log("verified: ", verified);

  console.log(verified.payload.sub);

  // Now go run some fucken graphql and delete user

  return res.json({ hello: "kittens" });
}
