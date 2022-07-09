import { useMachine, useSelector } from "@xstate/react";

import { walletConnectMachine, selectSignature } from "@lib/wallet.xstate";

export const useWalletConnect = () => {
  const [current, send, service] = useMachine(walletConnectMachine);
  const isSigned = useSelector(service, selectSignature);
  const isLoading = current.matches("signing") || current.matches("connecting");
  const isNotConnected =
    current.matches("unknown") || current.matches("disconnected");

  return {
    current,
    send,
    service,
    isSigned,
    isLoading,
    isNotConnected,
    walletAddress: current.context.walletAddress,
    signature: current.context.signature,
  };
};
