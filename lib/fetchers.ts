import { NextApiResponse } from "next";
import type { PuzzleApiResponse } from "@lib/types";
import { gqlApiSdk } from "./server";
import { routeLandingUrl } from "./utils";

// Client
export const puzzlePost = async ({
  uri,
  code,
}: {
  uri: string;
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
