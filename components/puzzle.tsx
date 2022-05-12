import { useState, ChangeEvent } from "react";
import { useRouter } from "next/router";
import RICIBs from "react-individual-character-input-boxes";
import loRange from "lodash/range";

import MaterialIcon from "@components/svg/material-lock-svg";

import { PuzzleApis } from "@lib/types";
import { puzzlePost } from "@lib/fetchers";
import clsx from "clsx";

interface PuzzleProps {
  count: number;
  puzzleUri: PuzzleApis;
  boxes?: boolean;
}

const Puzzle = ({ count, puzzleUri, boxes = true }: PuzzleProps) => {
  const inputProps = loRange(count).map(() => ({
    className: "ik-code-input text-5xl",
  }));

  const [isLoading, setIsLoading] = useState(false);
  const [charsLeft, setCharsLeft] = useState(count);
  const [isWrongGuess, setIsWrongGuess] = useState(false);
  const router = useRouter();

  const handleInput = async (input: string) => {
    setCharsLeft(count - input.length);
    setIsWrongGuess(false);
    // Bail if guess is not the length of input
    if (input.length !== count) return;

    setIsLoading(true);
    setCharsLeft(count);

    // POST to puzzle backend
    const res = await puzzlePost({ uri: puzzleUri, code: input });

    if (!res.ok) throw new Error(res.statusText);

    const { fail_route, success_route } = await res.json();
    // Turn off loading if failed
    !success_route && setIsLoading(false);
    !success_route && setIsWrongGuess(true);
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
            <div className="flex pb-5">
              <div className="w-6">
                <MaterialIcon />
              </div>
              <h1 className="text-base font-bold pt-2 pl-4">Passcode</h1>
            </div>
            <div className={clsx({ invisible: !isWrongGuess })}>
              <span className="opacity-50">Incorrect passcode. Try again.</span>
            </div>
            <div className="magic-input pt-2 text-turquoise font-bold">
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
                <div className="flex items-center sm:w-full">
                  <input
                    onChange={(e) => handleInput(e.target.value)}
                    type="text"
                    className="text-blue-800 w-full"
                    size={count}
                    autoFocus={true}
                    tabIndex={0}
                    onPaste={(e) => e.preventDefault()}
                  />
                  <div className="counter text-lg p-4 text-white w-11">
                    {charsLeft}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Puzzle;
