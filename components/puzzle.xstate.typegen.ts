// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true;
  eventsCausingActions: {
    setText: "INPUT";
    setPuzzleInfo: "PUZZLE_INFO";
    clearText: "done.invoke.guess";
  };
  internalEvents: {
    "done.invoke.guess": {
      type: "done.invoke.guess";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "xstate.init": { type: "xstate.init" };
    "error.platform.guess": { type: "error.platform.guess"; data: unknown };
  };
  invokeSrcNameMap: {
    sendGuess: "done.invoke.guess";
  };
  missingImplementations: {
    actions: never;
    services: never;
    guards: never;
    delays: never;
  };
  eventsCausingServices: {
    sendGuess: "INPUT";
  };
  eventsCausingGuards: {
    charCountMatches: "INPUT";
    isSuccessResponse: "done.invoke.guess";
  };
  eventsCausingDelays: {};
  matchesStates: "idle" | "guessing" | "guessIncorrect" | "guessCorrect";
  tags: never;
}
