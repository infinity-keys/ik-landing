// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true;
  internalEvents: {
    "": { type: "" };
    "done.invoke.guess": {
      type: "done.invoke.guess";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "error.platform.guess": { type: "error.platform.guess"; data: unknown };
    "xstate.init": { type: "xstate.init" };
  };
  invokeSrcNameMap: {
    sendGuess: "done.invoke.guess";
  };
  missingImplementations: {
    actions: "goToFailRoute" | "goToSuccessRoute";
    services: never;
    guards: never;
    delays: never;
  };
  eventsCausingActions: {
    clearText: "done.invoke.guess";
    goToFailRoute: "done.invoke.guess";
    goToSuccessRoute: "";
    setPuzzleInfo: "PUZZLE_INFO";
    setText: "INPUT";
  };
  eventsCausingServices: {
    sendGuess: "GUESS";
  };
  eventsCausingGuards: {
    charCountMatches: "INPUT";
    isSuccessResponse: "done.invoke.guess";
    shouldRedirect: "";
  };
  eventsCausingDelays: {};
  matchesStates:
    | "guessCorrect"
    | "guessCorrect.deciding"
    | "guessCorrect.go"
    | "guessCorrect.stay"
    | "guessIncorrect"
    | "guessing"
    | "idle"
    | "readyToGuess"
    | { guessCorrect?: "deciding" | "go" | "stay" };
  tags: never;
}
