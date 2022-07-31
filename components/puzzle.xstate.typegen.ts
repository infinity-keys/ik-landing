// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true;
  internalEvents: {
    "xstate.init": { type: "xstate.init" };
    "done.invoke.guess": {
      type: "done.invoke.guess";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "": { type: "" };
    "error.platform.guess": { type: "error.platform.guess"; data: unknown };
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
    setText: "INPUT";
    setPuzzleInfo: "PUZZLE_INFO";
    clearText: "xstate.init" | "PUZZLE_INFO" | "INPUT" | "done.invoke.guess";
    goToFailRoute: "done.invoke.guess";
    goToSuccessRoute: "";
  };
  eventsCausingServices: {
    sendGuess: "INPUT";
  };
  eventsCausingGuards: {
    charCountMatches: "INPUT";
    isSuccessResponse: "done.invoke.guess";
    shouldRedirect: "";
  };
  eventsCausingDelays: {};
  matchesStates:
    | "idle"
    | "guessing"
    | "guessIncorrect"
    | "guessCorrect"
    | "guessCorrect.deciding"
    | "guessCorrect.go"
    | "guessCorrect.stay"
    | { guessCorrect?: "deciding" | "go" | "stay" };
  tags: never;
}
