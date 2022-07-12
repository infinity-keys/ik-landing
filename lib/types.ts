import { JWTPayload } from "jose";
import { IK_CLAIMS_NAMESPACE } from "./constants";

export type PuzzleApiResponse = {
  fail_route: string;
  success_route: string | undefined;
};
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
