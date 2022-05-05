import type { NextApiRequest, NextApiResponse } from "next";
import { gqlSdk } from "@lib/server";

type CountResponse = {
  count: number;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CountResponse>
) {
  const { pid: puzzle_id } = req.query;
  const { solution } = await gqlSdk.SolutionCharCount({ puzzle_id });

  return solution?.solution_char_count
    ? res.status(200).json({ count: solution.solution_char_count })
    : res.status(404).end();
}
