import { NextRequest, NextResponse } from "next/server";
import { IK_ID_COOKIE } from "@lib/constants";

import { nanoid } from "nanoid";

export async function middleware(req: NextRequest) {
  const response = NextResponse.next();

  // Basic tracking ID
  if (!req.cookies[IK_ID_COOKIE])
    response.cookie(IK_ID_COOKIE, nanoid(), {
      path: "/",
    });

  return response;
}
