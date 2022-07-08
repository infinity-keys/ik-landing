import Web3Modal from "web3modal";
import { ethers } from "ethers";
import WalletConnectProvider from "@walletconnect/web3-provider";
import CoinbaseWalletSDK from "@coinbase/wallet-sdk";
import {
  AVAX_CHAIN_ID,
  AVAX_PARAMS,
  ETH_CHAIN_ID,
  ETH_RPC_ID,
  ETH_RPC,
} from "@lib/constants";
import { toHex } from "./utils";
// import Fortmatic from "fortmatic";

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider, // required
    options: {
      infuraId: ETH_RPC_ID,
    },
  },
  coinbasewallet: {
    package: CoinbaseWalletSDK, // Required
    options: {
      appName: "InfinityKeys", // Required
      infuraId: ETH_RPC_ID, // Required
      chainId: 1, // Optional. It defaults to 1 if not provided
      darkMode: false, // Optional. Use dark theme, defaults to false
    },
  },
  // fortmatic: {
  //   package: Fortmatic, // required
  //   options: {
  //     key: "FORTMATIC_KEY", // required
  // network: {
  // // if we don't pass it, it will default to localhost:8454
  //   rpcUrl: {ETH_RPC},
  //   chainId: 4,
  // },
  //   }
  // }
};

// In NextJS, during prerender in Node there is no "window" the library needs
const web3Modal: Web3Modal | undefined =
  typeof window !== "undefined"
    ? new Web3Modal({
        //network: "rinkeby", // optional- we dont care for now I think, but will be important once we add NFT claiming/anything on chain
        cacheProvider: false, // optional- can set to false if we want them to connect every time
        providerOptions,
      })
    : undefined;

export const walletUtil = () => {
  let provider: ethers.providers.ExternalProvider;
  let library: ethers.providers.Web3Provider;
  let account: string;
  let chain: number;

  /**
   * Pop the modal and set vars we may need later
   */
  const trigger = async () => {
    if (!web3Modal) throw new Error("No web3Modal");

    provider = await web3Modal.connect();
    library = new ethers.providers.Web3Provider(provider, "any");

    const accounts = await library.listAccounts();
    if (!accounts.length) throw new Error("No accounts found");
    account = accounts[0];

    chain = (await library.getNetwork()).chainId;

    return retrieve();
  };

  /**
   * Easy way to get vars needed elsewhere
   */
  const retrieve = () => ({
    provider,
    library,
    account,
    chain,
  });

  /**
   * Clear in-memory wallet cache
   */
  const clear = () => {
    web3Modal && web3Modal.clearCachedProvider();
  };

  /**
   * Set chain var to current chain
   */
  const setChain = async () => {
    chain = (await library.getNetwork()).chainId;

    return retrieve();
  };

  /**
   * Set switch chain var to newChainId
   */
  const switchChain = async (newChainId: number) => {
    if (newChainId !== ETH_CHAIN_ID && newChainId !== AVAX_CHAIN_ID)
      throw new Error("Invalid Chain Id");

    console.log(newChainId, chain);
    if (newChainId === chain) return retrieve(); // same as current chain

    if (chain && library?.provider?.request) {
      try {
        await library.provider.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: toHex(newChainId) }],
        });
        setChain();
      } catch (switchError: any) {
        //I think this should add AVAX to MetaMask if you dont have it yet
        //have not tested
        if (switchError.code === 4902) {
          //should only happen for AVAX
          try {
            await library.provider.request({
              method: "wallet_addEthereumChain",
              params: [AVAX_PARAMS],
            });
            setChain();
          } catch (error) {
            console.log(error);
          }
        }
      }
    }

    return retrieve();
  };

  return {
    trigger,
    retrieve,
    clear,
    setChain,
    switchChain,
  };
};

export const wallet = walletUtil();
