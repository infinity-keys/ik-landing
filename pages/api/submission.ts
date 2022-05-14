// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { jwtVerify, SignJWT } from "jose";
import { nanoid } from "nanoid";
import {
  IK_ACCESS_COOKIE,
  IK_CLAIMS_NAMESPACE,
  JWT_SECRET_KEY,
} from "@lib/constants";
import { gqlApiSdk } from "@lib/server";
import { IkJwt, PuzzleApiResponse } from "@lib/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") return res.status(405).end();
  // console.log(req);
  console.log(req.body);
  console.log(req.cookies);

  // const token = req.cookies[IK_ACCESS_COOKIE];
  // console.log(token);

  // try {
  //   const verified = await jwtVerify(
  //     token,
  //     new TextEncoder().encode(JWT_SECRET_KEY)
  //   );

  //   console.log(verified);
  //   const payload = verified.payload as unknown as IkJwt;
  //   console.log(payload);
  //   // if (payload?.claims?.[IK_CLAIMS_NAMESPACE].access) {

  //   // }
  // } catch (e) {
  //   console.log(e);
  //   // return new Response("Invalid token", {
  //   //   status: 401,
  //   // });
  // }
  return res.status(200).end();
}
