// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true;
  internalEvents: {
    "done.invoke.checkingWalletConnectCache": {
      type: "done.invoke.checkingWalletConnectCache";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "done.invoke.invokeClearWallet": {
      type: "done.invoke.invokeClearWallet";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "done.invoke.popWallet": {
      type: "done.invoke.popWallet";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "error.platform.checkingWalletConnectCache": {
      type: "error.platform.checkingWalletConnectCache";
      data: unknown;
    };
    "error.platform.invokeClearWallet": {
      type: "error.platform.invokeClearWallet";
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
    clearWalletCache: "done.invoke.invokeClearWallet";
    connectWallet: "done.invoke.popWallet";
  };
  missingImplementations: {
    actions: never;
    services: never;
    guards: never;
    delays: never;
  };
  eventsCausingActions: {
    clearWallet: "done.invoke.invokeClearWallet";
    setWalletInfo: "done.invoke.popWallet";
  };
  eventsCausingServices: {
    checkWalletCache: "xstate.init";
    clearWalletCache:
      | "DISCONNECT_WALLET"
      | "done.invoke.checkingWalletConnectCache"
      | "error.platform.checkingWalletConnectCache"
      | "error.platform.popWallet";
    connectWallet: "CONNECT_WALLET" | "done.invoke.checkingWalletConnectCache";
  };
  eventsCausingGuards: {
    isWalletCached: "done.invoke.checkingWalletConnectCache";
  };
  eventsCausingDelays: {};
  matchesStates:
    | "checking"
    | "choosingChain"
    | "connected"
    | "connecting"
    | "disconnected"
    | "signed"
    | "signing";
  tags: never;
}
