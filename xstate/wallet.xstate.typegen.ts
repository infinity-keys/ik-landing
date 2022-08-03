// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true;
  internalEvents: {
    "done.invoke.popWallet": {
      type: "done.invoke.popWallet";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "done.invoke.checkingWalletConnectCache": {
      type: "done.invoke.checkingWalletConnectCache";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "error.platform.checkingWalletConnectCache": {
      type: "error.platform.checkingWalletConnectCache";
      data: unknown;
    };
    "error.platform.popWallet": {
      type: "error.platform.popWallet";
      data: unknown;
    };
    "xstate.init": { type: "xstate.init" };
  };
  invokeSrcNameMap: {
    checkWalletCache: "done.invoke.checkingWalletConnectCache";
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
    clearWallet:
      | "done.invoke.checkingWalletConnectCache"
      | "error.platform.checkingWalletConnectCache"
      | "error.platform.popWallet"
      | "DISCONNECT_WALLET";
  };
  eventsCausingServices: {
    checkWalletCache: "xstate.init";
    connectWallet: "done.invoke.checkingWalletConnectCache" | "CONNECT_WALLET";
  };
  eventsCausingGuards: {
    isWalletCached: "done.invoke.checkingWalletConnectCache";
  };
  eventsCausingDelays: {};
  matchesStates:
    | "checking"
    | "connecting"
    | "connected"
    | "disconnected"
    | "signing"
    | "signed"
    | "choosingChain";
  tags: never;
}
