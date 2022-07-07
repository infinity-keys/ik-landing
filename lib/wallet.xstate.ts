import { createMachine, assign } from "xstate";
import { walletUtil } from "./wallet";

const wallet = walletUtil();

export type WalletContext = {
  walletAddress: string;
  signature: string;
};

export type WalletConnectEvents =
  | { type: "requestConnect" }
  | { type: "signRequest" }
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
>({
  initial: "disconnected",
  context: {
    walletAddress: "",
    signature: "",
  },
  id: "wallet-connect",
  states: {
    disconnected: {
      on: {
        requestConnect: "connecting",
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
        signRequest: "signing",
        next: "signing",
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
      on: {},
      type: "final",
    },
  },
});
