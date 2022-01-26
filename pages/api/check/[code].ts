// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  console.log(req.body);
  console.log(req.query);

  console.log(process.env.INFINITY_KEYS_ACCESS_CODE);

  const { code } = req.query;

  if (code !== process.env.INFINITY_KEYS_ACCESS_CODE) {
    res.status(403).end();
  } else {
    res.status(200).json({ name: "John Doe" });
  }
}
