import { NextApiResponse } from "next";
import type {
  PuzzleApiResponse,
  PuzzleApis,
  PuzzlePageProps,
} from "@lib/types";
import { gqlApiSdk } from "./server";

// Client
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

export const formSubmit = async ({ data }: { data: unknown }) => {
  const res = await fetch("/api/submission", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res;
};

// Server only
export const puzzleCount = async ({
  puzzleId,
}: {
  puzzleId: string;
}): Promise<PuzzlePageProps> => {
  const gql = await gqlApiSdk();
  const { solution } = await gql.SolutionCharCount({
    puzzle_id: puzzleId,
  });
  const count = solution?.solution_char_count || 0;
  return {
    puzzleId,
    count,
  };
};

export const puzzleCountByRoute = async (
  path: string
): Promise<PuzzlePageProps> => {
  const gql = await gqlApiSdk();
  const { solution } = await gql.SolutionCharCountByPath({ path });
  if (!solution) throw new Error("No solution for that path");

  const [{ solution_char_count, puzzle_id: puzzleId }] = solution;
  const count = solution_char_count || 0;
  return {
    count,
    puzzleId,
  };
};

export const allLandingRoutes = async (): Promise<string[]> => {
  const gql = await gqlApiSdk();
  const { puzzles } = await gql.AllLandingRoutes();

  if (!puzzles) throw new Error("No puzzles");

  function isLanding(p: typeof puzzles[0]): p is { landing_route: string } {
    return !!p.landing_route;
  }

  return puzzles.filter(isLanding).map((p) => p.landing_route);
};
