import { createMachine, assign } from "xstate";

import { walletUtil } from "@lib/wallet";

const wallet = walletUtil();

export type WalletContext = {
  walletAddress: string;
  signature: string;
};

export type WalletConnectEvents = { type: "disconnect" } | { type: "next" };

export type WalletConnectStates =
  | { value: "unknown"; context: WalletContext }
  | { value: "disconnected"; context: WalletContext }
  | { value: "connecting"; context: WalletContext }
  | { value: "connected"; context: WalletContext }
  | { value: "signing"; context: WalletContext }
  | { value: "signed"; context: WalletContext };

export const walletConnectMachine = createMachine<
  WalletContext,
  WalletConnectEvents,
  WalletConnectStates
>(
  {
    initial: "unknown",
    context: {
      walletAddress: "",
      signature: "",
    },
    id: "wallet-connect",
    states: {
      unknown: {
        on: {
          next: "connecting",
        },
      },
      disconnected: {
        entry: ["disconnectUser"],
        on: {
          next: "connecting",
        },
      },
      connecting: {
        invoke: {
          id: "popWallet",
          src: () => wallet.trigger(),
          onDone: {
            actions: assign({
              walletAddress: (context, event) => event.data.account,
            }),
            target: "connected",
          },
          onError: "disconnected",
        },
      },
      connected: {
        on: {
          next: "signing",
          disconnect: "disconnected",
        },
      },
      signing: {
        invoke: {
          id: "signReq",
          src: () => wallet.sign(),
          onDone: {
            actions: assign({
              signature: (context, event) => event.data,
            }),
            target: "signed",
          },
          onError: "connected",
        },
      },
      signed: {
        on: {
          disconnect: "disconnected",
        },
      },
    },
  },
  {
    actions: {
      disconnectUser: (context, event) => {
        wallet.clear();
        context.walletAddress = "";
        context.signature = "";
      },
    },
  }
);

export const selectSignature = (state: typeof walletConnectMachine) =>
  state.context.signature;
