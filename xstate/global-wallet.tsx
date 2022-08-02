import { createContext, ReactNode } from "react";
import { useInterpret } from "@xstate/react";

import { walletMachine } from "@ik-xstate/wallet.xstate";
import { InterpreterFrom } from "xstate";

export { createSelector } from "@ik-xstate/wallet.xstate";

export const GlobalWalletContext = createContext(
  {} as InterpreterFrom<typeof walletMachine>
);

type Props = { children: ReactNode };

export const GlobalWalletProvider = ({ children }: Props) => {
  const walletService = useInterpret(walletMachine, { devTools: true });

  return (
    <GlobalWalletContext.Provider value={walletService}>
      {children}
    </GlobalWalletContext.Provider>
  );
};
