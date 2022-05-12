import { useState, ChangeEvent } from "react";
import { useRouter } from "next/router";
import RICIBs from "react-individual-character-input-boxes";
import loRange from "lodash/range";

import MaterialIcon from "@components/svg/material-lock-svg";

import { PuzzleApis } from "@lib/types";
import { puzzlePost } from "@lib/fetchers";

interface PuzzleProps {
  count: number;
  puzzleUri: PuzzleApis;
  boxes?: boolean;
}

const Puzzle = ({ count, puzzleUri, boxes = true }: PuzzleProps) => {
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

    if (!res.ok) throw new Error(res.statusText);

    const { fail_route, success_route } = await res.json();
    // Turn off loading if failed
    !success_route && setIsLoading(false);
    // debugger;
    router.push(success_route || fail_route);
  };

  return (
    <>
      {isLoading && (
        <div className="loader mx-auto w-8 h-8">
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
              {boxes && (
                <RICIBs
                  amount={count}
                  handleOutputString={handleInput}
                  inputRegExp={/^.*$/}
                  autoFocus={true}
                  inputProps={inputProps}
                />
              )}
              {!boxes && (
                <input
                  onChange={(e) => handleInput(e.target.value)}
                  type="text"
                  size={count}
                  className="text-blue-800"
                />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Puzzle;
