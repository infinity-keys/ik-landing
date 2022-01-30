import { NextRequest, NextResponse } from "next/server";
import { jwtVerify, SignJWT } from "jose";
import {
  JWT_SECRET_KEY,
  IK_ACCESS_COOKIE,
  IK_CLAIMS_NAMESPACE,
} from "@lib/constants";

interface IkJwt {
  claims: {
    [IK_CLAIMS_NAMESPACE]: { access: boolean };
  };
}

export async function middleware(req: NextRequest, res: NextResponse) {
  const token = req.cookies[IK_ACCESS_COOKIE];

  if (!token) {
    return new Response("Code access required", {
      status: 401,
    });
  }

  try {
    const verified = await jwtVerify(
      token,
      new TextEncoder().encode(JWT_SECRET_KEY)
    );

    const payload = verified.payload as unknown as IkJwt;

    if (payload?.claims?.[IK_CLAIMS_NAMESPACE].access) {
      return NextResponse.next();
    }
  } catch (e) {
    return new Response("Invalid token", {
      status: 401,
    });
  }
}
