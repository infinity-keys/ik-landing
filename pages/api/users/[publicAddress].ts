import type { NextApiRequest, NextApiResponse } from "next";
import { nanoid } from "nanoid";

import { gqlApiSdk } from "@lib/server";
import { IK_ID_COOKIE } from "@lib/constants";
import { verifyToken } from "@lib/jwt";
import { IkJwt } from "@lib/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { publicAddress } = req.query;

  if (!publicAddress || typeof publicAddress !== "string") {
    return res.status(400).end();
  }

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

  // No user with this wallet address, ie placeholder user that has not connected yet
  if (!users.length) {
    // Add wallet + nonce to user
    const { user } = await gql.AddWalletToUser({
      userId: payload.sub,
      publicAddress,
      nonce: nanoid(),
    });
    if (!user) throw Error("Wallet could not be added to user");

    return res.json({ nonce: user.nonce });
  }

  if (users.length > 1) {
    // Do something about consolidating mulitple users or something
  }

  const [user] = users;
  console.log(user);
  // User with wallet exists
  if (user?.nonce) {
    // should have nonce, but def check
    return res.json({ nonce: user.nonce });
  }
}
