/**
 * @file
 *
 * The embedded puzzle form used to attmpt solution.
 */
import { ComponentType, useEffect } from "react";
import { useRouter } from "next/router";
import RICIBs from "react-individual-character-input-boxes";
import loRange from "lodash/range";
import clsx from "clsx";
import { useMachine } from "@xstate/react";

import LockSvg from "@components/svg/material-lock-svg";
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
  const router = useRouter();
  const [{ context, matches }, send] = useMachine(puzzleMachine,
    {
      context: { count, puzzleId, redirect: !SuccessComponent },
      // Use the router hook from within react to fire the action within xstate
      actions: {
        // The TS error below is a bug in xstate, https://xstate.js.org/docs/guides/typescript.html#typegen
        // @TODO: remove @ts-ignore when fixed
        // @ts-ignore
        goToSuccessRoute: (context, event) => router.push(event.data?.success_route || "/"),
        goToFailRoute: (context, event) => router.push(event.data.fail_route),
      },
      devTools: NODE_ENV === "development"
    });

  useEffect(() => {
    send({ type: 'PUZZLE_INFO', puzzleInfo: { puzzleId, count } });
  }, [send, puzzleId, count])

  return (
    <>
      {(matches('guessing') || matches('guessCorrect.go')) && (
        <div className="loader mx-auto w-8 h-8 mt-10">
          <div className="ball-clip-rotate-multiple">
            <div></div>
            <div></div>
          </div>
        </div>
      )}

      {(matches('idle') || matches('guessIncorrect')) && (
        <div className="flex justify-center z-10">
          <div>
            <div className="flex py-5">
              <div className="w-6">
                <LockSvg />
              </div>
              <h1 className="text-base font-bold pt-2 pl-4">Solve Puzzle</h1>
            </div>
            <div className={clsx({ invisible: !matches('guessIncorrect') })}>
              <div className="opacity-50">
                <Markdown>
                  {failMessage || "Incorrect passcode. Try again."}
                </Markdown>
              </div>
            </div>
            <div className="magic-input  text-turquoise font-bold">
              {boxes && (
                <RICIBs
                  amount={context.count}
                  handleOutputString={(text) => send({ type: 'INPUT', text })}
                  inputRegExp={/^.*$/}
                  autoFocus={true}
                  inputProps={loRange(context.count).map(() => ({
                    className: "ik-code-input",
                  }))}
                />
              )}
              {!boxes && (
                <div className="flex items-center sm:w-full">
                  <input
                    onChange={(e) => send({ type: 'INPUT', text: e.target.value })}
                    type="text"
                    className="text-blue-800 w-full"
                    size={context.count}
                    autoFocus={true}
                    tabIndex={0}
                    onPaste={(e) => e.preventDefault()}
                  />
                  <div className="counter text-lg p-4 text-white w-11">
                    {context.count - context.text.length}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {matches('guessCorrect.stay') && SuccessComponent && <SuccessComponent />}
    </>
  );
};

export default Puzzle;
