import { NextRequest, NextResponse } from "next/server";
import { IK_CLAIMS_NAMESPACE, IK_ID_COOKIE } from "@lib/constants";

import { makeAnonToken } from "@lib/jwt";

export async function middleware(req: NextRequest) {
  const response = NextResponse.next();

  // Basic user tracking ID
  if (req.cookies[IK_ID_COOKIE]) return response;

  // Anonymous users get a JWT for their session, the JWT does not expire since
  // there is no way to log them out and cookie is destroyed after session.
  const token = await makeAnonToken(
    {
      claims: {
        [IK_CLAIMS_NAMESPACE]: {
          puzzles: [],
        },
      },
    },
    true
  );

  response.cookie(IK_ID_COOKIE, token, {
    path: "/",
    httpOnly: true,
  });

  return response;
}
