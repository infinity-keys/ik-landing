import { IK_CLAIMS_NAMESPACE } from "./constants";

export type PuzzleApis = string;
export type PuzzleApiResponse = {
  access?: boolean;
  fail_route: string | undefined;
  success_route: string | undefined;
};

export interface PuzzlePageProps {
  count: number;
  puzzleId: string;
}

export interface IkJwt {
  claims: {
    [IK_CLAIMS_NAMESPACE]: {
      access: boolean;
    };
  };
}

// All submission pages need a puzzle id
export interface PuzzleInput {
  puzzleId: string;
}
