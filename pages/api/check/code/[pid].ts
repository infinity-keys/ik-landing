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
  MAGIC_CODE_AVALANCHE,
} from "@lib/constants";
import { PuzzleApiResponse } from "@lib/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PuzzleApiResponse>
) {
  if (req.method !== "POST") return res.status(405).end();

  const { pid } = req.query;
  if (!pid) return res.status(400).end();

  const { code } = req.body;
  if (!code) return res.status(400).end();

  // Let's not care about case
  let capsMagicCode;
  switch (pid) {
    case "landing":
      capsMagicCode = MAGIC_CODE?.toUpperCase();
      break;
    case "avalanche":
      capsMagicCode = MAGIC_CODE_AVALANCHE?.toUpperCase();
      break;
  }

  const capsInputCode = code.toUpperCase();

  // Nope
  if (capsInputCode !== capsMagicCode) {
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
  return res.status(200).json({ access: true, forwardTo: "/gated" });
}
