// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log(req.body);
  console.log(req.query);

  if (req.method !== "POST") return res.status(405).end();

  const { code } = req.body;

  // Nope
  if (code !== process.env.INFINITY_KEYS_ACCESS_CODE) {
    return res.status(403).end();
  }

  if (!process.env.INFINITY_KEYS_SECRET) {
    throw new Error("Secret is not set, check env variables");
  }
  // Correct code, generate token and send it back
  const token = jwt.sign({ sub: "anon" }, process.env.INFINITY_KEYS_SECRET);
  return res.json({ token });
}
