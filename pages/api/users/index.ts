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

  if (!verified) return res.status(401).end();

  const gql = await gqlApiSdk();

  if (email) {
    // await gql.DeleteUserInfoByEmail({
    //   form_email: JSON.stringify({ email }),
    //   email,
    // });
  } else {
    // await gql.DeleteUserByUserId({ userId });
  }

  return res.status(200).end();
}
