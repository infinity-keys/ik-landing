import { walletUtil } from "@lib/wallet";
import { createMachine, assign, StateFrom } from "xstate";

const wallet = walletUtil();

export type WalletContext = {
  walletAddress: string;
  signature: string;
  chain: string;
};
export type WalletEvents =
  | { type: "CONNECT_WALLET" }
  | { type: "WALLET_CONNECTED" }
  | { type: "DISCONNECT_WALLET" }
  | { type: "CHOOSE_CHAIN"; chain: string };
export type WalletStates =
  | { value: "unknown"; context: WalletContext }
  | { value: "disconnected"; context: WalletContext }
  | { value: "connecting"; context: WalletContext }
  | { value: "connected"; context: WalletContext }
  | { value: "signing"; context: WalletContext }
  | { value: "signed"; context: WalletContext }
  | { value: "choosingChain"; context: WalletContext };

export const walletMachine = createMachine(
  {
    id: "wallet",
    tsTypes: {} as import("./wallet.xstate.typegen").Typegen0,
    schema: {
      context: {} as WalletContext,
      events: {} as WalletEvents,
      services: {} as {
        connectWallet: {
          data: {
            account: string;
          };
        };
      },
    },
    initial: "unknown",
    context: {
      walletAddress: "",
      signature: "",
      chain: "",
    },
    states: {
      unknown: {
        on: {
          CONNECT_WALLET: "connecting",
        },
      },
      connecting: {
        invoke: {
          id: "popWallet",
          src: "connectWallet",
          onDone: {
            actions: ["setWalletAddress"],
            target: "connected",
          },
          onError: "disconnected",
        },
      },
      connected: {
        on: {
          DISCONNECT_WALLET: "disconnected",
        },
      },
      disconnected: {
        on: {
          CONNECT_WALLET: "connecting",
        },
      },
      signing: {},
      signed: {},
      choosingChain: {},
    },
  },
  {
    services: {
      connectWallet: wallet.trigger,
    },
    actions: {
      setWalletAddress: assign({
        walletAddress: (_, { data }) => data.account,
      }),
    },
  }
);

/**
 * Create selector for the above machine
 * @example
 *   const isConnectingSelector = createSelector((state) =>
 *     state.matches("connecting"));
 */
export const createSelector = <T>(
  selector: (state: StateFrom<typeof walletMachine>) => T
) => {
  return selector;
};
