import { NextRequest, NextResponse } from "next/server";
import {
  IK_CLAIMS_NAMESPACE,
  IK_ID_COOKIE,
  JWT_SECRET_KEY,
} from "@lib/constants";

import { v4 as uuidv4 } from "uuid";
import { SignJWT } from "jose";
import { epochMinus30s } from "@lib/utils";
import { nanoid } from "nanoid";

export async function middleware(req: NextRequest) {
  const response = NextResponse.next();

  // Basic user tracking ID
  if (req.cookies[IK_ID_COOKIE]) return response;

  // Anonymous users get a JWT for their session, the JWT does not expire since
  // there is no way to log them out and cookie is destroyed after session.
  const token = await new SignJWT({
    claims: {
      [IK_CLAIMS_NAMESPACE]: {
        puzzles: [],
      },
    },
  })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(uuidv4())
    .setJti(nanoid()) // Use this for unique "session id" when submitting values
    .setIssuedAt(epochMinus30s()) // Offset 30s because stupid clocks
    .sign(new TextEncoder().encode(JWT_SECRET_KEY));

  response.cookie(IK_ID_COOKIE, token, {
    path: "/",
    httpOnly: true,
  });

  return response;
}
