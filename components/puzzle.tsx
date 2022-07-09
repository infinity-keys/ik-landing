/**
 * @file
 *
 * The embedded puzzle form used to attmpt solution.
 */
import { useState, ComponentType } from "react";
import { useRouter } from "next/router";
import RICIBs from "react-individual-character-input-boxes";
import loRange from "lodash/range";
import clsx from "clsx";

import MaterialIcon from "@components/svg/material-lock-svg";
import { puzzlePost } from "@lib/fetchers";
import { PUZZLE_LANDING_BASE } from "@lib/constants";
import Markdown from "./markdown";

interface PuzzleProps {
  count: number;
  puzzleId: string;
  boxes?: boolean;
  failMessage?: string;
  SuccessComponent?: ComponentType<{}>;
}

const Puzzle = ({
  // Used to show number of boxes/remaining characters. Usually pulled in via
  // GrqphQL query.
  count,
  // Unique uuid of the puzzle
  puzzleId,
  // Show the "boxes" version of the puzzle? "false" shows textbox
  boxes = true,
  // What should be said when the guess is wrong?
  failMessage,
  // If success component exists, then Puzzle **will not route to success page**.
  // Use this for entirely inline/embedded Puzzles.
  SuccessComponent,
}: PuzzleProps) => {
  const inputProps = loRange(count).map(() => ({
    className: "ik-code-input",
  }));

  const [isLoading, setIsLoading] = useState(false);
  const [charsLeft, setCharsLeft] = useState(count);
  const [isWrongGuess, setIsWrongGuess] = useState(false);
  // Only used for local success state
  const [isSuccess, setIsSuccess] = useState(false);

  const router = useRouter();

  const handleInput = async (input: string) => {
    setCharsLeft(count - input.length);
    setIsWrongGuess(false);
    // Bail if guess is not the length of input
    if (input.length !== count) return;

    setIsLoading(true);
    setCharsLeft(count);

    // POST to puzzle backend
    const res = await puzzlePost({ puzzleId, code: input });

    if (!res.ok) throw new Error(res.statusText);

    const { fail_route, success_route } = await res.json();

    // Turn off loading if failed.
    if (!success_route) {
      setIsLoading(false);
      setIsWrongGuess(true);
    }

    // Also, turn off if we're routing right back to a puzzle route
    if (success_route.includes(PUZZLE_LANDING_BASE)) {
      setIsLoading(false);
    }

    // Do not route if custom success components exist. Show in place.
    if (SuccessComponent) {
      if (success_route) {
        setIsLoading(false);
        setIsSuccess(true);
        setIsWrongGuess(false);
      }
      return;
    }
    // If either success or fail exist, turn them into proper paths and route
    router.push(success_route || fail_route);
  };

  return (
    <>
      {isLoading && (
        <div className="loader mx-auto w-8 h-8 mt-10">
          <div className="ball-clip-rotate-multiple">
            <div></div>
            <div></div>
          </div>
        </div>
      )}

      {!isLoading && !isSuccess && (
        <div className="flex justify-center z-10">
          <div>
            <div className="flex py-5">
              <div className="w-6">
                <MaterialIcon />
              </div>
              <h1 className="text-base font-bold pt-2 pl-4">Solve Puzzle</h1>
            </div>
            <div className={clsx({ invisible: !isWrongGuess })}>
              <div className="opacity-50">
                <Markdown>
                  {failMessage || "Incorrect passcode. Try again."}
                </Markdown>
              </div>
            </div>
            <div className="magic-input  text-turquoise font-bold">
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

      {!isLoading && isSuccess && SuccessComponent && <SuccessComponent />}
    </>
  );
};

export default Puzzle;
