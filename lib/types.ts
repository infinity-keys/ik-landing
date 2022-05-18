import { JWTPayload } from "jose";
import { IK_CLAIMS_NAMESPACE } from "./constants";

export type PuzzleApis = string;
export type PuzzleApiResponse = {
  access?: boolean;
  fail_route: string | undefined;
  success_route: string | undefined;
};

export interface PuzzlePageProps {
  name: string;
  count: number;
  puzzleId: string;
  input_type: string;
}

export interface IkJwt extends JWTPayload {
  claims: {
    [IK_CLAIMS_NAMESPACE]: {
      puzzles: string[];
    };
  };
}

// All submission pages need a puzzle id
export interface PuzzleInput {
  puzzleId: string;
}
