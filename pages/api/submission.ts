// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import has from "lodash/has";

import { IK_CLAIMS_NAMESPACE, IK_ID_COOKIE } from "@lib/constants";
import { gqlApiSdk } from "@lib/server";
import { IkJwt, PuzzleInput } from "@lib/types";
import { verifyToken } from "@lib/jwt";

interface UserSubmission extends PuzzleInput {
  [key: string]: string;
}

interface BaseGqlResponseError {
  extensions: {
    path: string;
    code: string;
  };
  message: string;
}

interface BaseGqlResponseErrors {
  response: {
    errors?: BaseGqlResponseError[];
  };
}

const isGqlError = (e: unknown): e is BaseGqlResponseErrors =>
  has(e, "response.errors");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") return res.status(405).end();

  const token = req.cookies[IK_ID_COOKIE];

  if (!token) throw new Error("Submission without token!");

  // Validate token first
  let verified = undefined;
  try {
    verified = await verifyToken(token);
  } catch (e) {
    // Bad token
    return res.status(401).end();
  }
  const payload = verified.payload as unknown as IkJwt;

  // Entire form submission
  // @TODO: use zod and zorm for this
  const submission = req.body as UserSubmission;
  // Pull out the hidden puzzleId field
  const { puzzleId, ...formData } = submission;

  const gql = await gqlApiSdk();

  // Ensure that the puzzleId a user is submitting the form for is included
  // in their claims puzzles (puzzles routes they are allowed to see)
  const { puzzles } = await gql.UserPuzzlesInSubmitted({
    puzzleId: puzzleId,
    puzzleRoutes: payload.claims[IK_CLAIMS_NAMESPACE].puzzles,
  });

  // User's puzzles claims does not include the success route for this puzzle id
  if (!puzzles.length) {
    return res.status(403).send({
      error: "User has not solved the puzzle they are submitting for",
    });
  }

  try {
    const { email } = formData;
    await gql.UserSubmission({
      puzzle_id: puzzleId, // comes from hidden field in form
      user_id: payload.sub, // user id from jwt
      form_data: formData,
      email, // can be possibly undefined
    });
    return res.status(200).end();
  } catch (e) {
    if (isGqlError(e) && e.response?.errors?.length) {
      const [error] = e.response.errors;
      if (error.extensions.code === "constraint-violation") {
        return res.status(409).send({
          error: "constraint-violation",
        });
      }
    }
    // Generic explode
    return res.status(500).end();
  }

  // Error will throw if submitting duplicate solution, @TODO: handle
}
