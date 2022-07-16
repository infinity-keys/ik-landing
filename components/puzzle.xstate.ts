import { puzzlePost } from "@lib/fetchers";
import { PuzzleApiResponse } from "@lib/types";
import { createMachine, assign } from "xstate";

export type PuzzleContext = {
  text: string;
  count: number;
  puzzleId: string;
  redirect: boolean;
};

export type PuzzleEvents =
  | { type: "INPUT"; text: string }
  | { type: "PUZZLE_INFO"; puzzleInfo: { puzzleId: string; count: number } };

export const puzzleMachine = createMachine(
  {
    id: "puzzleMachine",
    tsTypes: {} as import("./puzzle.xstate.typegen").Typegen0,
    schema: {
      context: {} as PuzzleContext,
      events: {} as PuzzleEvents,
      services: {} as {
        sendGuess: {
          data: PuzzleApiResponse;
        };
      },
    },
    initial: "idle",
    context: {
      text: "",
      count: 0,
      puzzleId: "",
      redirect: true,
    },
    states: {
      idle: {
        entry: ["clearText"],
        on: {
          INPUT: [
            {
              target: "guessing",
              cond: "charCountMatches",
            },
            {
              actions: ["setText"],
            },
          ],
          PUZZLE_INFO: {
            target: "idle",
            actions: ["setPuzzleInfo"],
          },
        },
      },
      guessing: {
        invoke: {
          id: "guess",
          src: "sendGuess",
          onDone: [
            {
              target: "guessCorrect",
              cond: "isSuccessResponse",
            },
            {
              target: "guessIncorrect",
            },
          ],
        },
      },
      guessIncorrect: {
        entry: ["clearText", "goToFailRoute"],
        on: {
          INPUT: "idle",
        },
      },
      guessCorrect: {
        initial: "deciding",
        states: {
          deciding: {
            always: [
              // We lose the types for the event that leads us here due to `always`:
              //  https://xstate.js.org/docs/guides/typescript.html#typegen
              { target: "go", cond: "shouldRedirect" },
              { target: "stay" },
            ],
          },
          // Do fully redirect
          go: {
            entry: ["goToSuccessRoute"],
          },
          // Don't forward on success
          stay: {},
        },
        on: {
          // When a new puzzle streams in, start all over
          PUZZLE_INFO: {
            target: "idle",
            actions: ["setPuzzleInfo"],
          },
        },
      },
    },
  },
  {
    services: {
      sendGuess: ({ puzzleId }, { text }) =>
        puzzlePost({ puzzleId, code: text }),
    },
    actions: {
      setText: assign({
        text: (_, { text }) => text,
      }),
      clearText: assign({
        text: (context, event) => "",
      }),
      setPuzzleInfo: assign((_, { puzzleInfo }) => ({
        ...puzzleInfo,
        text: "",
      })),
    },
    guards: {
      charCountMatches: ({ count }, { text }) => count === text.length,
      isSuccessResponse: (_, { data }) => !!data.success_route,
      shouldRedirect: ({ redirect }, event) => redirect,
    },
  }
);
