import { createMachine } from "xstate";

export type WalletContext = {
  walletAddress: string;
};

export type WalletConnectEvents =
  | { type: "requestConnect" }
  | { type: "connectionAuthorized"; address: string }
  | { type: "connectionFailed" }
  | { type: "signRequest" }
  | { type: "signFailed" }
  | { type: "signSuccessful" };

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
        on: { requestConnect: "connecting" },
      },
      connecting: {
        on: {
          connectionAuthorized: "connected",
          connectionFailed: "disconnected",
        },
      },
      connected: {
        on: {
          signRequest: {
            target: "signing",
          },
        },
        entry: ["setAddress"],
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
  },
  {
    actions: {
      setAddress: (ctx, event) => {
        if (event.type === "connectionAuthorized") {
          ctx.walletAddress = event.address;
        }
      },
    },
  }
);
