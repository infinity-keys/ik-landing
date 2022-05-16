import { NextRequest, NextResponse } from "next/server";
import { IK_CLAIMS_NAMESPACE, IK_ID_COOKIE } from "@lib/constants";

import { IkJwt } from "@lib/types";
import { verifyToken } from "@lib/jwt";

export async function middleware(req: NextRequest, res: NextResponse) {
  const token = req.cookies[IK_ID_COOKIE];
  const path = req.page.name;

  if (!token) {
    return new Response("Code access required", {
      status: 401,
    });
  }

  if (!(typeof path === "string")) {
    return new Response("Path invalid", {
      status: 404,
    });
  }

  try {
    const verified = await verifyToken(token);

    const payload = verified.payload as unknown as IkJwt;

    if (payload?.claims?.[IK_CLAIMS_NAMESPACE].puzzles.includes(path)) {
      return NextResponse.next();
    }
  } catch (e) {
    return new Response("Invalid token", {
      status: 401,
    });
  }

  return new Response("Code access required", {
    status: 401,
  });
}
