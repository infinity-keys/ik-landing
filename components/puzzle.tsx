import { useState } from "react";
import { useRouter } from "next/router";
import RICIBs from "react-individual-character-input-boxes";
import loRange from "lodash/range";

import MaterialIcon from "@components/svg/material-lock-svg";

import { PuzzleApis } from "@lib/types";
import { puzzlePost } from "@lib/fetchers";

interface PuzzleProps {
  count: number;
  puzzleUri: PuzzleApis;
}

const Puzzle = ({ count, puzzleUri }: PuzzleProps) => {
  const inputProps = loRange(count).map(() => ({
    className: "ik-code-input",
  }));

  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleInput = async (input: string) => {
    // Bail if guess is not the length of input
    if (input.length !== count) return;

    setIsLoading(true);

    // POST to puzzle backend
    const res = await puzzlePost({ uri: puzzleUri, code: input });

    // Success, forward to next page.
    if (res.ok) {
      const results = await res.json();
      return setTimeout(() => router.push(results.forwardTo), 1500);
    }
    // Fail
    return setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <>
      {isLoading && (
        <div className="loader">
          <div className="ball-clip-rotate-multiple">
            <div></div>
            <div></div>
          </div>
        </div>
      )}
      {!isLoading && (
        <div className="flex justify-center z-10">
          <div>
            <div className="flex">
              <div className="w-6">
                <MaterialIcon />
              </div>
              <h1 className="text-base font-bold pt-2 pl-4">Passcode</h1>
            </div>
            <div className="magic-input pt-7 text-turquoise font-bold text-5xl">
              <RICIBs
                amount={count}
                handleOutputString={handleInput}
                inputRegExp={/^.*$/}
                autoFocus={true}
                inputProps={inputProps}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Puzzle;
