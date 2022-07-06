// import { assign } from "lodash";
import { createMachine, assign } from "xstate";

import { walletUtil } from "./wallet";

const wallet = walletUtil();

export type WalletContext = {
  walletAddress: string;
};

export type WalletConnectEvents =
  | { type: "requestConnect" }
  | { type: "connectionAuthorized"; address: string }
  | { type: "connectionFailed" }
  | { type: "signRequest" }
  | { type: "signFailed" }
  | { type: "signSuccessful" }
  | { type: "next" };

export type WalletConnectStates =
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
    initial: "disconnected",
    context: {
      walletAddress: "",
    },
    id: "wallet-connect",
    states: {
      disconnected: {
        on: { requestConnect: "connecting", next: "connecting" },
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
        },
      },
      connected: {
        on: {
          signRequest: {
            target: "signing",
          },
          next: "signing",
        },
      },
      signing: {
        on: {
          signSuccessful: "signed",
          signFailed: "connected",
        },
      },
      signed: {
        on: {},
        type: "final",
      },
    },
  }
  // {
  //   actions: {
  //     setAddress: (ctx, event) => {
  //       console.log(event);
  //       ctx.walletAddress = event?.data?.account;
  //       // if (event.type === "connectionAuthorized") {
  //       //   ctx.walletAddress = event.address;
  //       // }
  //     },
  //   },
  // }
);
