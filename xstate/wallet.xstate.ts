import { createMachine, assign } from "xstate";

export type WalletContext = {
  walletAddress: string;
  signature: string;
  chain: string;
};
export type WalletEvents =
  | { type: "CONNECT_WALLET" }
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

export const walletMachine = createMachine({
  id: "wallet",
  tsTypes: {} as import("./wallet.xstate.typegen").Typegen0,
  schema: {
    context: {} as WalletContext,
    events: {} as WalletEvents,
    // services goes here
  },
  initial: "unknown",
  context: {
    walletAddress: "",
    signature: "",
    chain: "",
  },
  states: {
    unknown: {},
    disconnected: {},
    connecting: {},
    connected: {},
    signing: {},
    signed: {},
    choosingChain: {},
  },
});
