// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { SignJWT } from "jose";
import { nanoid } from "nanoid";
import {
  IK_ACCESS_COOKIE,
  IK_CLAIMS_NAMESPACE,
  JWT_SECRET_KEY,
} from "@lib/constants";
import { gqlApiSdk } from "@lib/server";
import { PuzzleApiResponse } from "@lib/types";

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
  const gql = await gqlApiSdk();
  const { fail, success } = await gql.Guess({
    puzzle_id: pid,
    solution: code,
  });
  const fail_route = fail?.fail_route;
  const success_route = success[0]?.success_route;

  // Wrong guess
  if (!success_route)
    return res.status(200).json({ access: false, fail_route, success_route });

  if (!JWT_SECRET_KEY) {
    throw new Error("Secret is not set, check env variables");
  }
  // Correct code, generate token and send it back
  const token = await new SignJWT({
    claims: {
      [IK_CLAIMS_NAMESPACE]: {
        access: true, // @todo: change this
      },
    },
  })
    .setProtectedHeader({ alg: "HS256" })
    .setJti(nanoid()) // Use this for unique "session id" when submitting values
    .setIssuedAt()
    .sign(new TextEncoder().encode(JWT_SECRET_KEY));

  // Cookie for route access
  res.setHeader(
    "Set-Cookie",
    `${IK_ACCESS_COOKIE}=${token}; HttpOnly; Path=${success_route};`
  );
  // TEMP: Cookie for API access later
  res.setHeader(
    "Set-Cookie",
    `${IK_ACCESS_COOKIE}=${token}; HttpOnly; Path=/api/submission;`
  );
  return res.status(200).json({ access: true, fail_route, success_route });
}
