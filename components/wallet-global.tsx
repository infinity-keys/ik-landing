import { useContext } from "react";
import { useSelector } from "@xstate/react";

import BeakerIcon from "@heroicons/react/outline/BeakerIcon";

import { GlobalWalletContext, createSelector } from "@ik-xstate/global-wallet";

// xstate:state
const isConnectingSelector = createSelector((state) =>
  state.matches("connecting")
);
const isConnectedSelector = createSelector((state) =>
  state.matches("connected")
);
// xstate:context
const addressSelector = createSelector((state) => state.context.walletAddress);

const WalletGlobal = () => {
  const globalWalletService = useContext(GlobalWalletContext);
  const { send } = globalWalletService;

  const isConnecting = useSelector(globalWalletService, isConnectingSelector);
  const isConnected = useSelector(globalWalletService, isConnectedSelector);
  const address = useSelector(globalWalletService, addressSelector);

  return (
    <button
      onClick={() =>
        isConnected ? send("DISCONNECT_WALLET") : send("CONNECT_WALLET")
      }
      className="flex p-2 justify-center items-center text-white hover:text-turquoise"
    >
      <BeakerIcon className="block h-6 w-6 mr-2" aria-hidden="true" />
      <span>
        {isConnecting && "connecting"}
        {isConnected && address && address.slice(0, 8) + "..."}
      </span>
    </button>
  );
};

export default WalletGlobal;
