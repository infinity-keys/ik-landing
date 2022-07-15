/**
 * @file
 *
 * The embedded puzzle form used to attmpt solution.
 */
import { useState, ComponentType, useEffect } from "react";
import { useRouter } from "next/router";
import RICIBs from "react-individual-character-input-boxes";
import loRange from "lodash/range";
import clsx from "clsx";
import { useMachine, useSelector } from "@xstate/react";


import LockSvg from "@components/svg/material-lock-svg";
import { puzzlePost } from "@lib/fetchers";
import { PUZZLE_LANDING_BASE } from "@lib/constants";
import Markdown from "./markdown";
import { puzzleMachine } from "./puzzle.xstate";



interface PuzzleProps {
  count: number;
  puzzleId: string;
  boxes?: boolean;
  failMessage?: string;
  SuccessComponent?: ComponentType<{}>;
}

const { NODE_ENV } = process.env

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
  const [state, send] = useMachine(puzzleMachine,
    {
      context: { count, puzzleId },
      devTools: NODE_ENV === "development"
    });

  // Verify that this changes when state changes.
  // const inputProps = loRange(state.context.count).map(() => ({
  //   className: "ik-code-input",
  // }));

  // useEffect(() => {
  //   send({ type: 'PUZZLE_INFO', puzzleInfo: { puzzleId, count } });
  // }, [send, puzzleId, count])


  // const [inputProps, setInputProps] = useState<{ className: string }[]>([])
  // const [isLoading, setIsLoading] = useState(false);
  // const [charsLeft, setCharsLeft] = useState(count);
  // const [isWrongGuess, setIsWrongGuess] = useState(false);
  // // Only used for local success state
  // const [isSuccess, setIsSuccess] = useState(false);

  // const router = useRouter();

  // useEffect(() => {

  //   setInputProps(loRange(count).map(() => ({
  //     className: "ik-code-input",
  //   })));

  //   setCharsLeft(count);
  //   setIsWrongGuess(false);
  //   setIsSuccess(false);
  //   setIsLoading(false);

  // },
  //   // Either of these change, it means new puzzle
  //   [puzzleId, count])

  // useEffect(() => {
  //   console.log(charsLeft)
  //   if (charsLeft !== 0)
  //     return



  // }, [charsLeft])

  // const handleInput = async (input: string) => {

  //   setCharsLeft(count - input.length);

  //   setIsWrongGuess(false);
  //   // Bail if guess is not the length of input
  //   if (input.length !== count) return;

  //   setIsLoading(true);

  //   // POST to puzzle backend
  //   const res = await puzzlePost({ puzzleId, code: input });

  //   if (!res.ok) throw new Error(res.statusText);

  //   const { fail_route, success_route } = await res.json();

  //   // Turn off loading if failed.
  //   if (!success_route) {
  //     setIsLoading(false);
  //     setIsWrongGuess(true);
  //   }

  //   // Also, turn off if we're routing right back to a puzzle route
  //   if (success_route?.includes(PUZZLE_LANDING_BASE)) {
  //     setIsLoading(false);
  //   }

  //   // Do not route if custom success components exist. Show in place.
  //   if (SuccessComponent) {
  //     if (success_route) {
  //       setIsLoading(false);
  //       setIsSuccess(true);
  //       setIsWrongGuess(false);
  //     }
  //     return;
  //   }
  //   // If either success or fail exist, turn them into proper paths and route
  //   router.push(success_route || fail_route);
  // };

  return (
    <>
      {state.matches('guessing') && (
        <div className="loader mx-auto w-8 h-8 mt-10">
          <div className="ball-clip-rotate-multiple">
            <div></div>
            <div></div>
          </div>
        </div>
      )}


      {!state.matches('guessing') && (
        <div className="flex justify-center z-10">
          <div>
            <div className="flex py-5">
              <div className="w-6">
                <LockSvg />
              </div>
              <h1 className="text-base font-bold pt-2 pl-4">Solve Puzzle</h1>
            </div>
            <div className={clsx({ invisible: !state.matches('guessIncorrect') })}>
              <div className="opacity-50">
                <Markdown>
                  {failMessage || "Incorrect passcode. Try again."}
                </Markdown>
              </div>
            </div>
            <div className="magic-input  text-turquoise font-bold">
              {boxes && (
                <RICIBs
                  amount={state.context.count}
                  handleOutputString={(text) => send({ type: 'INPUT', text })}
                  inputRegExp={/^.*$/}
                  autoFocus={true}
                  inputProps={loRange(state.context.count).map(() => ({
                    className: "ik-code-input",
                  }))}
                />
              )}
              {/* {!boxes && (
                <div className="flex items-center sm:w-full">
                  <input
                    // onChange={(e) => handleInput(e.target.value)}
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
              )} */}
            </div>
          </div>
        </div>
      )}

      {state.matches('guessCorrect') && SuccessComponent && <SuccessComponent />}
    </>
  );
};

export default Puzzle;
