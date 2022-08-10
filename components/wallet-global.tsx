import { useContext, Fragment } from "react";
import { useSelector } from "@xstate/react";
import clsx from "clsx";
import { Listbox, Transition } from "@headlessui/react";

import ExclamationIcon from "@heroicons/react/outline/ExclamationIcon";
import CreditCardIcon from "@heroicons/react/outline/CreditCardIcon";
import CheckIcon from "@heroicons/react/outline/CheckIcon";
import SelectorIcon from "@heroicons/react/outline/SelectorIcon";

import { GlobalWalletContext, createSelector } from "@ik-xstate/global-wallet";
import { walletAddressTrunc } from "@lib/utils";

import ChainLogo from "@components/chain-logo";

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

  const currentChain = allChains.find(
    (chain) => chain.chainId === selectedChain
  );

  return (
    <div className="flex justify-center items-center">
      <Listbox
        value={selectedChain}
        onChange={(chainId) =>
          send({ type: "REQUEST_CHAIN_CHANGE", chain: chainId })
        }
      >
        <div className="relative text-left w-16 md:w-44 ">
          <Listbox.Button className="relative w-full cursor-default rounded-md shadow-sm px-3 py-2 bg-white/10 border border-white/20 text-sm font-medium hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-turquoise">
            <span className="flex items-center">
              {currentChain ? (
                <>
                  <ChainLogo name={currentChain.name} height={16} width={16} />
                  <span className="hidden md:block ml-3">
                    {currentChain.name}
                  </span>
                </>
              ) : (
                <>
                  <ExclamationIcon
                    className="h-4 w-4 text-orange-400"
                    aria-hidden="true"
                  />
                  <span className="hidden md:block ml-3">Switch Chain</span>
                </>
              )}
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
            <Listbox.Options className="absolute mt-1 max-h-60 w-44 overflow-hidden rounded-md shadow-lg bg-blue border border-white/20 ring-1 ring-black ring-opacity-5 focus:outline-none text-white text-sm">
              {allChains.map((chain) => (
                <Listbox.Option
                  key={chain.chainId}
                  className={({ active }) =>
                    clsx(
                      "relative cursor-default select-none py-3 px-3",
                      active && "bg-indigo-500"
                    )
                  }
                  value={chain.chainId}
                >
                  {({ selected }) => (
                    <span className="flex justify-between items-center">
                      <span className="flex items-center shrink-0">
                        <ChainLogo name={chain.name} height={16} width={16} />
                        <span className="block ml-3">{chain.name}</span>
                      </span>

                      {selected ? (
                        <span className="pl-3 text-turquoise">
                          <CheckIcon className="h-4 w-4" aria-hidden="true" />
                        </span>
                      ) : null}
                    </span>
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
        className="flex p-2 justify-center items-center text-white ml-2 sm:ml-4 rounded-md shadow-sm px-3 bg-white/10 border border-white/20 text-sm font-medium hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-turquoise"
      >
        <CreditCardIcon className="sm:hidden w-4 h-4" />

        {isConnected && address && (
          <span className="hidden sm:inline">
            {walletAddressTrunc(address)}
          </span>
        )}

        {isConnecting && (
          <span className="hidden sm:inline">Connecting...</span>
        )}

        {!isConnected && !isConnecting && !address && (
          <span className="hidden sm:inline">Connect Wallet</span>
        )}

        <span
          className={clsx("block h-2 w-2 rounded-full ml-2", {
            "bg-red-400": !isConnected,
            "bg-yellow-400": isConnecting,
            "bg-green-400": isConnected && address,
          })}
        ></span>
      </button>
    </div>
  );
};

export default WalletGlobal;
