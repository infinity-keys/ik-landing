import type { NextApiRequest, NextApiResponse } from "next";
import { nanoid } from "nanoid";

import { gqlApiSdk } from "@lib/server";
import { IK_ID_COOKIE } from "@lib/constants";
import { verifyToken } from "@lib/jwt";
import { IkJwt } from "@lib/types";
import { generateUserDeleteUrl } from "@lib/utils";
import { verify } from "@lib/fetchers";

// /api/user?uid=dkjdkj&email=flksj@fjl.com&jwt=slksjlksdjlksj
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // if (req.method !== "DELETE") {
  //   return res.status(405).end();
  // }

  const { uid, email, jwt } = req.query;

  if (!uid || typeof uid !== "string") {
    return res.status(400).end();
  }
  if (!email || typeof email !== "string") {
    return res.status(400).end();
  }
  if (!jwt || typeof jwt !== "string") {
    return res.status(400).end();
  }

  const verified = await verifyToken(jwt);

  console.log(verified.payload.sub);

  // Now go run some fucken graphql and delete user

  // await generateUserDeleteUrl(uid, email).then((deleteMe) => {
  //   console.log(deleteMe.searchParams.get("jwt"));
  //   console.log(deleteMe.searchParams.get("email"));
  //   console.log(deleteMe.searchParams.get("userId"));
  // });

  return res.json({ hello: "kittens" });
}
