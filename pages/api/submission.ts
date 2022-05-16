// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { jwtVerify, SignJWT } from "jose";
import { nanoid } from "nanoid";
import {
  IK_CLAIMS_NAMESPACE,
  IK_ID_COOKIE,
  JWT_SECRET_KEY,
} from "@lib/constants";
import { gqlApiSdk } from "@lib/server";
import { IkJwt, PuzzleApiResponse, PuzzleInput } from "@lib/types";

interface UserSubmission extends PuzzleInput {
  [key: string]: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") return res.status(405).end();
  // console.log(req);
  console.log(req.body);
  console.log(req.cookies);

  const userId = req.cookies[IK_ID_COOKIE];
  // Entire form submission
  const submission = req.body as UserSubmission;
  // Pull out the hidden puzzleId field
  const { puzzleId, ...formData } = submission;

  const gql = await gqlApiSdk();

  const response = await gql.UserSubmission({
    puzzle_id: puzzleId,
    user_id: userId,
    form_data: formData,
  });

  console.log(response);

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
