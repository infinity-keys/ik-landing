import { NextRequest, NextResponse } from "next/server";
import { IK_CLAIMS_NAMESPACE, IK_ID_COOKIE } from "@lib/constants";

import { jwtHasClaim, makeUserToken } from "@lib/jwt";

export async function middleware(req: NextRequest) {
  const response = NextResponse.next();

  let token = req.cookies.get(IK_ID_COOKIE);

  if (
    req.nextUrl.pathname.startsWith("/solved") ||
    req.nextUrl.pathname.startsWith("/claim")
  ) {
    try {
      // No token is nonstarter
      if (!token) throw new Error("No token on solved page");

      // This doesn't work yet, not available before we need to redirect
      //const success = req.nextUrl.searchParams.get("success");
      //Instead we'll use this gross-ass hack: /solved/name-of-puzzle
      const success = req.nextUrl.pathname.split("/")[2];

      // Bail if we're not on the solved page
      if (!success) throw new Error('"success" param not found on gated page');

      const allowedToView = await jwtHasClaim(token, [success]);

      if (allowedToView) return response;
      // Otherwise bail
      throw new Error("User does not have solved puzzle claim");
    } catch (e) {
      console.error(e);
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  // No need to create new token if they've already got one
  // @TODO: check token expiration time and refresh
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
