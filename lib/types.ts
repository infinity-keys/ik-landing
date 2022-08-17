import { z } from "zod";
import { JWTPayload } from "jose";
import { IK_CLAIMS_NAMESPACE } from "./constants";
import { GetAllPacksQuery, PublicPuzzlesQuery } from "./generated/graphql";

export const PuzzleApiResponseSchema = z.object({
  fail_route: z.string(),
  success_route: z.optional(z.string()),
});
export type PuzzleApiResponse = z.infer<typeof PuzzleApiResponseSchema>;

export const GuessSchema = z.object({
  puzzleId: z.string(),
  code: z.string(),
});
export type Guess = z.infer<typeof GuessSchema>;

export interface IkJwt extends JWTPayload {
  claims: {
    [IK_CLAIMS_NAMESPACE]: {
      walletConnected?: boolean;
      puzzles: string[];
    };
  };
}

// All submission pages need a puzzle id
export interface PuzzleInput {
  puzzleId: string;
}

export enum PuzzleLayoutType {
  Grid = "grid",
  List = "list",
  Unknown = "unknown",
}

export type ThumbnailPuzzle = PublicPuzzlesQuery["puzzles"][0];
export type ThumbnailPack = GetAllPacksQuery["packs"][0];
