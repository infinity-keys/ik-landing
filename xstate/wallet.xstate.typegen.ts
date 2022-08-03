// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true;
  internalEvents: {
    "done.invoke.popWallet": {
      type: "done.invoke.popWallet";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "done.invoke.invokeClearWallet": {
      type: "done.invoke.invokeClearWallet";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "xstate.init": { type: "xstate.init" };
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
    "error.platform.invokeClearWallet": {
      type: "error.platform.invokeClearWallet";
      data: unknown;
    };
  };
  invokeSrcNameMap: {
    checkWalletCache: "done.invoke.checkingWalletConnectCache";
    connectWallet: "done.invoke.popWallet";
    clearWalletCache: "done.invoke.invokeClearWallet";
  };
  missingImplementations: {
    actions: never;
    services: never;
    guards: never;
    delays: never;
  };
  eventsCausingActions: {
    setWalletInfo: "done.invoke.popWallet";
    clearWallet: "done.invoke.invokeClearWallet";
  };
  eventsCausingServices: {
    checkWalletCache: "xstate.init";
    connectWallet: "done.invoke.checkingWalletConnectCache" | "CONNECT_WALLET";
    clearWalletCache:
      | "done.invoke.checkingWalletConnectCache"
      | "error.platform.checkingWalletConnectCache"
      | "error.platform.popWallet"
      | "DISCONNECT_WALLET";
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
