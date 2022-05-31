import type { NextApiRequest, NextApiResponse } from "next";
import { ethers } from "ethers";

import { gqlApiSdk } from "@lib/server";
import { IK_ID_COOKIE, welcome } from "@lib/constants";
import { verifyToken } from "@lib/jwt";
import { IkJwt } from "@lib/types";
import { nanoid } from "nanoid";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { publicAddress, signature } = req.body;

  if (!publicAddress || !signature) return res.status(401).end();

  const token = req.cookies[IK_ID_COOKIE];
  // Validate token first
  let verified = undefined;
  try {
    verified = await verifyToken(token);
  } catch (e) {
    // Bad token
    return res.status(401).end();
  }
  // Pull payload off the token
  const payload = verified.payload as unknown as IkJwt;

  const gql = await gqlApiSdk();
  const { users } = await gql.UserByPublicAddress({ publicAddress });

  if (!users.length) throw new Error("Cannot find user.");
  const [user] = users;
  const message = `${welcome}\n\n${user.nonce}`;
  const verifiedAddess = ethers.utils.verifyMessage(message, signature);

  if (verifiedAddess === publicAddress) {
    // Change nonce before returning success
    await gql.AddWalletToUser({
      userId: payload.sub,
      publicAddress,
      nonce: nanoid(),
    });
    return res.status(200).end();
  }
  return res.status(403).end();
}
