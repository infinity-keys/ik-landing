import { createMachine } from "xstate";

type WalletConnectEvents = { type: "NEXT" };

export type WalletConnectStates =
  | { value: "connect"; context: undefined }
  | { value: "sign"; context: undefined }
  | { value: "disconnect"; context: undefined };

export const walletConnectMachine = createMachine<
  undefined,
  WalletConnectEvents,
  WalletConnectStates
>({
  initial: "connect",
  id: "wallet-connect",
  states: {
    connect: {
      on: { NEXT: "sign" },
    },
    sign: {
      on: { NEXT: "disconnect" },
    },
    disconnect: {
      on: { NEXT: "connect" },
    },
  },
});
