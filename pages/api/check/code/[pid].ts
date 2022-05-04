// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { SignJWT } from "jose";
import { nanoid } from "nanoid";
import {
  IK_ACCESS_COOKIE,
  IK_CLAIMS_NAMESPACE,
  JWT_SECRET_KEY,
  MAGIC_CODE,
  MAGIC_CODE_AVALANCHE,
} from "@lib/constants";
import { gqlSdk } from "@lib/server";
import { PuzzleApiResponse } from "@lib/types";

// const vars = {
//   puzzle_id: "396fc8dd-0ce1-4fcf-a6d0-e2071449e57a",
//   solution: "wagmi",
// };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PuzzleApiResponse>
) {
  if (req.method !== "POST") return res.status(405).end();

  const { pid } = req.query;
  if (!pid) return res.status(400).end();

  const { code } = req.body;
  if (!code) return res.status(400).end();

  // Returns:
  // 1. A route to redirect to if a guess is wrong. ALWAYS returned.
  // 2. A route to redirect to if a guess is correct. ONLY returned if solved.
  // Match is case insensitive
  const { fail, success } = await gqlSdk.Guess({
    puzzle_id: pid,
    solution: code,
  });
  const fail_route = fail?.fail_route;
  const success_route = success[0]?.success_route;
  // console.log(fail, success);

  if (!JWT_SECRET_KEY) {
    throw new Error("Secret is not set, check env variables");
  }
  // Correct code, generate token and send it back
  const token = await new SignJWT({
    // @todo: change this
    claims: { [IK_CLAIMS_NAMESPACE]: { access: true } },
  })
    .setProtectedHeader({ alg: "HS256" })
    .setJti(nanoid())
    .setIssuedAt()
    .sign(new TextEncoder().encode(JWT_SECRET_KEY));

  res.setHeader(
    "Set-Cookie",
    `${IK_ACCESS_COOKIE}=${token}; HttpOnly; Path=/;`
  );
  return res.status(200).json({ access: true, fail_route, success_route });
}
