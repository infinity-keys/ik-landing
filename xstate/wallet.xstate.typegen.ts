// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true;
  internalEvents: {
    "done.invoke.popWallet": {
      type: "done.invoke.popWallet";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "xstate.init": { type: "xstate.init" };
    "error.platform.popWallet": {
      type: "error.platform.popWallet";
      data: unknown;
    };
  };
  invokeSrcNameMap: {
    connectWallet: "done.invoke.popWallet";
  };
  missingImplementations: {
    actions: never;
    services: never;
    guards: never;
    delays: never;
  };
  eventsCausingActions: {
    setWalletAddress: "done.invoke.popWallet";
  };
  eventsCausingServices: {
    connectWallet: "CONNECT_WALLET";
  };
  eventsCausingGuards: {};
  eventsCausingDelays: {};
  matchesStates:
    | "unknown"
    | "connecting"
    | "connected"
    | "disconnected"
    | "signing"
    | "signed"
    | "choosingChain";
  tags: never;
}
