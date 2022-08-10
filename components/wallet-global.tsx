import { useContext, Fragment } from "react";
import { useSelector } from "@xstate/react";
import clsx from "clsx";
import { Listbox, Transition } from "@headlessui/react";

import LoginIcon from "@heroicons/react/outline/LoginIcon";
import LogoutIcon from "@heroicons/react/outline/LogoutIcon";
import CheckIcon from "@heroicons/react/outline/CheckIcon";
import SelectorIcon from "@heroicons/react/outline/SelectorIcon";

import { GlobalWalletContext, createSelector } from "@ik-xstate/global-wallet";
import { walletAddressTrunc } from "@lib/utils";

// xstate:state
const isConnectingSelector = createSelector((state) =>
  state.matches("connecting")
);
const isConnectedSelector = createSelector((state) =>
  state.matches("connected")
);
// xstate:context
const addressSelector = createSelector((state) => state.context.walletAddress);
const allChainsSelector = createSelector((state) => state.context.allChains);
const chainSelector = createSelector((state) => state.context.chain);

const WalletGlobal = () => {
  const globalWalletService = useContext(GlobalWalletContext);
  const { send } = globalWalletService;

  const isConnecting = useSelector(globalWalletService, isConnectingSelector);
  const isConnected = useSelector(globalWalletService, isConnectedSelector);
  const address = useSelector(globalWalletService, addressSelector);
  const allChains = useSelector(globalWalletService, allChainsSelector);
  const selectedChain = useSelector(globalWalletService, chainSelector);

  // const [selected, setSelected] = useState(chain);

  return (
    <div className="flex justify-center items-center">
      {isConnecting && <div>connecting...</div>}

      <Listbox
        value={selectedChain}
        onChange={(chainId) =>
          send({ type: "REQUEST_CHAIN_CHANGE", chain: chainId })
        }
      >
        <div className="relative text-left w-40">
          <Listbox.Button className="relative w-full cursor-default rounded-md shadow-sm px-4 py-2 bg-white/10 border border-white/20 text-sm font-medium hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-turquoise">
            <span className="block text-left">
              {allChains.find((chain) => chain.chainId === selectedChain)
                ?.name || ""}
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <SelectorIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-hidden rounded-md shadow-lg bg-blue border border-white/20 ring-1 ring-black ring-opacity-5 focus:outline-none text-white">
              {allChains.map((chain) => (
                <Listbox.Option
                  key={chain.chainId}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? "bg-indigo-500" : ""
                    }`
                  }
                  value={chain.chainId}
                >
                  {({ selected }) => (
                    <>
                      <span className={`block`}>{chain.name}</span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-turquoise">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>

      <button
        onClick={() =>
          isConnected ? send("DISCONNECT_WALLET") : send("WALLET_CONNECT")
        }
        className="flex p-2 justify-center items-center text-white hover:text-turquoise"
      >
        <span>{isConnected && address && walletAddressTrunc(address)}</span>
        {!isConnected && (
          <LoginIcon className="block h-6 w-6 ml-2" aria-hidden="true" />
        )}

        {isConnected && (
          <LogoutIcon className="block h-6 w-6 ml-2" aria-hidden="true" />
        )}
      </button>
    </div>
  );
};

export default WalletGlobal;
