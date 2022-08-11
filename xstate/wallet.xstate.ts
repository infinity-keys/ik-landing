import { wallet } from "@lib/wallet";
import { createMachine, assign, StateFrom } from "xstate";

import { chains } from "@lib/contractConstants";

const allChains = Object.values(chains).map(({ name, chainId }) => ({
  name,
  chainId,
}));

const defaultChain = chains.ETH.chainId;

export type WalletContext = {
  walletAddress: string;
  chain: number;
  allChains: typeof allChains;
};
export type WalletEvents =
  | { type: "WALLET_CONNECT" }
  | { type: "WALLET_CONNECTED" }
  | { type: "DISCONNECT_WALLET" }
  | { type: "REQUEST_CHAIN_CHANGE"; chain: number }
  | { type: "VERIFY_CHAIN_CHANGE"; chain: number };
export type WalletStates =
  | { value: "checking"; context: WalletContext }
  | { value: "disconnected"; context: WalletContext }
  | { value: "connecting"; context: WalletContext }
  | { value: "connected"; context: WalletContext }
  | { value: "signing"; context: WalletContext }
  | { value: "signed"; context: WalletContext };
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
      chain: defaultChain,
      allChains,
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
        invoke: {
          id: "invokeChainChangeListener",
          src: "chainChangedListener",
        },
        on: {
          DISCONNECT_WALLET: "disconnected",
          REQUEST_CHAIN_CHANGE: {
            actions: ["requestChainChange"],
          },
          VERIFY_CHAIN_CHANGE: {
            actions: ["verifyChainChange"],
          },
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
          WALLET_CONNECT: "connecting",
        },
      },
      // @TODO
      choosingChain: {},
      signing: {},
      signed: {},
    },
  },
  {
    services: {
      /**
       * Pop the modal, or connect to existing session
       */
      connectWallet: wallet.trigger,
      /**
       * Check if wallet is cached
       * @TODO: uncecessary since we'll just listen to wallet connect
       */
      checkWalletCache: async () => {
        return wallet.isCached();
      },
      /**
       * Logout
       */
      clearWalletCache: async () => wallet.clear(),
      /**
       * Allow the wallet chain change listener to fire an event for us
       */
      chainChangedListener: (ctx, e) => (sendBack) => {
        const onChangeChain = (chainId: number) =>
          sendBack({
            type: "VERIFY_CHAIN_CHANGE",
            chain: chainId,
          });

        wallet.setChangeChainCallback(onChangeChain);

        return () => wallet.setChangeChainCallback(() => {});
      },
    },
    actions: {
      setWalletInfo: assign({
        walletAddress: (_, { data }) => data.account,
        chain: (_, { data }) => data.chain,
      }),
      clearWallet: assign({
        walletAddress: "",
        chain: defaultChain,
        allChains,
      }),
      requestChainChange: async (context, event) => {
        await wallet.switchChain(event.chain);
      },
      verifyChainChange: assign({
        chain: (_, { chain }) => chain,
      }),
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
