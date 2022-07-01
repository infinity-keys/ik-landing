import { NextRequest, NextResponse } from "next/server";
import { IK_CLAIMS_NAMESPACE, IK_ID_COOKIE } from "@lib/constants";

import { makeUserToken, verifyToken } from "@lib/jwt";
import { responsePathAsArray } from "graphql";
import { IkJwt } from "@lib/types";

export async function middleware(req: NextRequest) {
  const response = NextResponse.next();

  let token = req.cookies.get(IK_ID_COOKIE);

  if (req.nextUrl.pathname.startsWith("/solved")) {
    // No token is nonstarter
    if (!token) return NextResponse.redirect(new URL("/", req.url));

    // This doesn't work yet, not available before we need to redirect
    // const success = req.nextUrl.searchParams.get("success");
    // Instead we'll use this gross-ass hack
    const success = req.nextUrl.pathname.split("/")[2];

    // Bail if we're not on the solved page
    if (!success) return NextResponse.redirect(new URL("/", req.url));

    try {
      const verified = await verifyToken(token);
      const payload = verified.payload as unknown as IkJwt;

      // Allow through if the user has this puzzle on their claims
      if (payload?.claims?.[IK_CLAIMS_NAMESPACE].puzzles.includes(success))
        return response;
      // Otherwise bail
      return NextResponse.redirect(new URL("/", req.url));
    } catch (e) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  // No need to create new token if they've already got one
  if (token) return response;

  // Anonymous users get a JWT for their session, the JWT does not expire since
  // there is no way to log them out and cookie is destroyed after session.
  token = await makeUserToken({
    claims: {
      [IK_CLAIMS_NAMESPACE]: {
        puzzles: [],
      },
    },
  });

  response.cookies.set(IK_ID_COOKIE, token, {
    path: "/",
    httpOnly: true,
  });

  return response;
}
