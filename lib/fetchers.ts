import { NextApiResponse } from "next";
import type {
  PuzzleApiResponse,
  PuzzleApis,
  PuzzlePageProps,
} from "@lib/types";
import { gqlApiSdk } from "./server";

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

export const puzzleCount = async ({
  puzzleId,
}: {
  puzzleId: string;
}): Promise<PuzzlePageProps> => {
  const { solution } = await gqlApiSdk.SolutionCharCount({
    puzzle_id: puzzleId,
  });
  const count = solution?.solution_char_count || 0;
  return {
    puzzleId,
    count,
  };
};
