/**
 * @file
 *
 * The embedded puzzle form used to attmpt solution.
 */
import { ComponentType, FormEvent, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import RICIBs from "react-individual-character-input-boxes";
import loRange from "lodash/range";
import clsx from "clsx";
import { useMachine } from "@xstate/react";

import LockSvg from "@components/svg/material-lock-svg";
import Markdown from "./markdown";
import { puzzleMachine } from "./puzzle.xstate";
import useCurrentWidth from "@hooks/useCurrentWidth";
import LoadingIcon from "@components/loading-icon";
import Button from "./button";

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
  const router = useRouter();
  const [{ context, matches }, send] = useMachine(puzzleMachine, {
    context: { count, puzzleId, redirect: !SuccessComponent },
    // Use the router hook from within react to fire the action within xstate
    actions: {
      // The TS error below is a bug in xstate, https://xstate.js.org/docs/guides/typescript.html#typegen
      // @TODO: remove @ts-ignore when fixed
      goToSuccessRoute: (context, event) =>
        // @ts-ignore
        router.push(event.data?.success_route || "/"),
      goToFailRoute: (context, event) => router.push(event.data.fail_route),
    },
    devTools: process.env.NODE_ENV === "development",
  });

  const [height, setHeight] = useState(0);
  const width = useCurrentWidth();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    send({ type: "PUZZLE_INFO", puzzleInfo: { puzzleId, count } });
  }, [send, puzzleId, count]);

  useEffect(() => {
    if (ref.current) setHeight(ref.current.clientHeight);
  }, [width]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (context.count === context.text.length) send("GUESS");
  };

  return (
    <>
      {(matches("guessing") || matches("guessCorrect.go")) && (
        <div style={{ height }} className="flex justify-center items-center">
          <LoadingIcon />
        </div>
      )}

      {(matches("idle") ||
        matches("guessIncorrect") ||
        matches("readyToGuess")) && (
        <div className="flex justify-center z-10" ref={ref}>
          <div>
            <div className="flex py-5">
              <div className="w-6">
                <LockSvg />
              </div>
              <h1 className="text-base font-bold pt-2 pl-4">Solve Puzzle</h1>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="magic-input  text-turquoise font-bold">
                {boxes && (
                  <RICIBs
                    amount={context.count}
                    handleOutputString={(text) => send({ type: "INPUT", text })}
                    inputRegExp={/^\S*$/}
                    autoFocus={true}
                    inputProps={loRange(context.count).map(() => ({
                      className: "ik-code-input",
                    }))}
                  />
                )}
                {!boxes && (
                  <div className="flex items-center sm:w-full">
                    <input
                      onChange={(e) =>
                        send({ type: "INPUT", text: e.target.value })
                      }
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
              <div
                className={clsx("mb-2", {
                  invisible: !matches("guessIncorrect"),
                })}
              >
                <div data-cy="message_check" className="opacity-50">
                  <Markdown>
                    {failMessage ||
                      "Thats not it. Need help? [Join our discord](https://discord.gg/infinitykeys)"}
                  </Markdown>
                </div>
              </div>
              <div data-cy="submit" className="flex justify-center">
                <Button
                  text="Submit"
                  type="submit"
                  disabled={!matches("readyToGuess")}
                />
              </div>
            </form>
          </div>
        </div>
      )}

      {matches("guessCorrect.stay") && SuccessComponent && <SuccessComponent />}
    </>
  );
};

export default Puzzle;
