import { wallet } from "@lib/wallet";
import { createMachine, assign, StateFrom } from "xstate";

export type WalletContext = {
  walletAddress: string;
  chain: number;
  signature: string;
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
export type WalletServices = {
  connectWallet: {
    data: Awaited<ReturnType<typeof wallet.trigger>>;
  };
  checkWalletCache: {
    data: ReturnType<typeof wallet.isCached>;
  };
  clearWalletCache: {
    data: ReturnType<typeof wallet.clear>;
  };
};

export const walletMachine = createMachine(
  {
    id: "wallet",
    tsTypes: {} as import("./wallet.xstate.typegen").Typegen0,
    schema: {
      context: {} as WalletContext,
      events: {} as WalletEvents,
      services: {} as WalletServices,
    },
    initial: "checking",
    context: {
      walletAddress: "",
      chain: 0,
      signature: "",
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
      },
      connecting: {
        invoke: {
          id: "popWallet",
          src: "connectWallet",
          onDone: {
            actions: ["setWalletInfo"],
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
        invoke: {
          id: "invokeClearWallet",
          src: "clearWalletCache",
          onDone: {
            actions: ["clearWallet"],
          },
        },
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
      clearWalletCache: async () => wallet.clear(),
    },
    actions: {
      setWalletInfo: assign({
        walletAddress: (_, { data }) => data.account,
        chain: (_, { data }) => data.chain,
      }),
      clearWallet: assign({ walletAddress: "", chain: 0, signature: "" }),
    },
    guards: {
      isWalletCached: (_, { data }) => data,
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
