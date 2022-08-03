import { wallet } from "@lib/wallet";
import { createMachine, assign, StateFrom } from "xstate";

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
  | { value: "checking"; context: WalletContext }
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
        checkWalletCache: {
          data: boolean;
        };
      },
    },
    initial: "checking",
    context: {
      walletAddress: "",
      signature: "",
      chain: "",
    },
    states: {
      checking: {
        invoke: {
          id: "checkingWalletConnectCache",
          src: "checkWalletCache",
          onDone: [
            {
              target: "connecting",
              cond: "isWalletCached",
            },
            {
              target: "disconnected",
            },
          ],
          onError: {
            target: "disconnected",
          },
        },
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
        entry: ["clearWallet"],
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
      checkWalletCache: async () => wallet.isCached(),
    },
    actions: {
      setWalletAddress: assign({
        walletAddress: (_, { data }) => data.account,
      }),
      clearWallet: assign({
        walletAddress: "",
        signature: "",
        chain: "",
      }),
    },
    guards: {
      isWalletCached: (_, event) => {
        console.log(event);
        return true;
      },
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
