// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { uniq } from "lodash";

import { IK_CLAIMS_NAMESPACE, IK_ID_COOKIE } from "@lib/constants";
import { gqlApiSdk } from "@lib/server";
import { IkJwt, PuzzleApiResponse } from "@lib/types";
import { makeUserToken, verifyToken } from "@lib/jwt";
import { routeFailUrl, routeLandingUrl, routeSuccessUrl } from "@lib/utils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PuzzleApiResponse>
) {
  if (req.method !== "POST") return res.status(405).end();

  const token = req.cookies[IK_ID_COOKIE];
  if (!token) return res.status(401).end();

  // Validate token first
  let verified = undefined;
  try {
    verified = await verifyToken(token);
  } catch (e) {
    // Bad token
    return res.status(401).end();
  }

  const { pid } = req.query;
  if (!pid || typeof pid !== "string") return res.status(400).end();

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

  const fail_route = (fail && routeFailUrl(fail.fail_route)) || "/";

  // Actual success results
  let success_route = undefined;
  let final_step = undefined;
  if (success.length) {
    // Is this a multi-step puzzle? If not final_step, don't redirect to "solved" form of slug
    [{ success_route, final_step }] = success;

    if (success_route)
      success_route = final_step
        ? routeSuccessUrl(success_route)
        : routeLandingUrl(success_route);
  }

  console.log(success_route);

  // Default returned results
  const guessResults = {
    fail_route,
    success_route,
  };

  // Pull payload off the token
  // @TODO: JWT validate this
  const payload = verified.payload as unknown as IkJwt;

  // Throw a user update/create query out
  await gql.UpsertUser({
    userId: payload.sub,
  });

  // Guessed correctly
  if (success_route) {
    // Add solved puzzle route to user's puzzles claims
    const { puzzles } = payload.claims[IK_CLAIMS_NAMESPACE];
    payload.claims[IK_CLAIMS_NAMESPACE].puzzles = uniq([
      ...puzzles,
      success_route,
    ]);
  }

  const newToken = await makeUserToken(payload);

  // Cookie for route access
  res.setHeader("Set-Cookie", `${IK_ID_COOKIE}=${newToken}; HttpOnly; Path=/;`);

  return res.status(200).json(guessResults);
}
