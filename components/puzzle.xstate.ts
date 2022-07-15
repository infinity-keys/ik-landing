import { puzzlePost } from "@lib/fetchers";
import { PuzzleApiResponse } from "@lib/types";
import { createMachine, assign } from "xstate";

export type PuzzleContext = { text: string; count: number; puzzleId: string };

export type PuzzleEvents =
  | { type: "INPUT"; text: string }
  | { type: "PUZZLE_INFO"; puzzleInfo: { puzzleId: string; count: number } };

// export const puzzleMachine = (count: number, puzzleId: string) =>
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
    },
    states: {
      idle: {
        on: {
          INPUT: [
            {
              target: "guessing",
              cond: "charCountMatches",
            },
            {
              target: "idle",
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
        entry: ["clearText"],
        on: {
          INPUT: "idle",
        },
      },
      guessCorrect: {},
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
    },
  }
);
