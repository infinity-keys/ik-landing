import type { NextApiRequest, NextApiResponse } from "next";

import { gqlApiSdk } from "@lib/server";
import { verifyToken } from "@lib/jwt";
import { IkJwt } from "@lib/types";
import { IK_CLAIMS_NAMESPACE } from "@lib/constants";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "DELETE") {
    return res.status(405).end();
  }

  const { jwt } = req.body;

  if (!jwt || typeof jwt !== "string") {
    return res.status(400).end();
  }

  const verified = await verifyToken(jwt);
  if (!verified) return res.status(401).end();

  const payload = verified.payload as unknown as IkJwt;

  const { sub: userId } = payload;
  const { email } = payload.claims[IK_CLAIMS_NAMESPACE];

  const gql = await gqlApiSdk();
  try {
    await gql.DeleteUserInfoByUserId({ userId });

    if (email) {
      await gql.DeleteUserInfoByEmail({
        form_email: { email },
        email,
      });
    }
  } catch (e) {
    return res.status(500).end();
  }

  return res.status(200).end();
}
