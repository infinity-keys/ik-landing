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
    "done.invoke.invokeChainChangeListener": {
      type: "done.invoke.invokeChainChangeListener";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "error.platform.invokeChainChangeListener": {
      type: "error.platform.invokeChainChangeListener";
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
    chainChangedListener: "done.invoke.invokeChainChangeListener";
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
    requestChainChange: "REQUEST_CHAIN_CHANGE";
    verifyChainChange: "VERIFY_CHAIN_CHANGE";
    clearWallet: "done.invoke.invokeClearWallet";
  };
  eventsCausingServices: {
    checkWalletCache: "xstate.init";
    connectWallet: "done.invoke.checkingWalletConnectCache" | "WALLET_CONNECT";
    chainChangedListener: "done.invoke.popWallet";
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
    | "choosingChain"
    | "signing"
    | "signed";
  tags: never;
}
