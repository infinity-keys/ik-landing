import { NextApiResponse } from "next";
import type { PuzzleApiResponse, PuzzleApis } from "@lib/types";

export const puzzlePost = async ({
  uri,
  code,
}: {
  uri: PuzzleApis;
  code: string;
}) => {
  const res = await fetch(`/api/check/code/${uri}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ code }),
  });

  return res;
};
