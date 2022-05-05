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
