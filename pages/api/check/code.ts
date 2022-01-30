// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
// import jwt from "jsonwebtoken";
import { SignJWT } from "jose";
import { nanoid } from "nanoid";
import {
  IK_ACCESS_COOKIE,
  IK_CLAIMS_NAMESPACE,
  JWT_SECRET_KEY,
  MAGIC_CODE,
} from "@lib/constants";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") return res.status(405).end();

  const { code } = req.body;

  // Nope
  if (code !== MAGIC_CODE) {
    return res.status(403).end();
  }

  if (!JWT_SECRET_KEY) {
    throw new Error("Secret is not set, check env variables");
  }
  // Correct code, generate token and send it back
  const token = await new SignJWT({
    claims: { [IK_CLAIMS_NAMESPACE]: { access: true } },
  })
    .setProtectedHeader({ alg: "HS256" })
    .setJti(nanoid())
    .setIssuedAt()
    .sign(new TextEncoder().encode(JWT_SECRET_KEY));

  res.setHeader(
    "Set-Cookie",
    `${IK_ACCESS_COOKIE}=${token}; HttpOnly; Path=/;`
  );
  return res.json({ access: true, forwardTo: "/gated" });
}
