import Web3Modal from "web3modal";
import { ethers } from "ethers";
import { message } from "@lib/utils";
import WalletConnectProvider from "@walletconnect/web3-provider";
import CoinbaseWalletSDK from "@coinbase/wallet-sdk";
import {
  AVAX_CHAIN_ID,
  AVAX_PARAMS,
  ETH_CHAIN_ID,
  ETH_RPC_ID,
  POLYGON_CHAIN_ID,
  POLYGON_PARAMS,
  POLYGON_RPC,
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
      chainId: 1,
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

  const sign = async () => {
    if (!library?.provider?.request) throw new Error("Library is undefined");
    if (!account) throw new Error("Account is undefined");

    const nonceReq = await fetch(`/api/users/${account}`);
    const { nonce } = await nonceReq.json();

    const signature = await library.provider.request({
      method: "personal_sign",
      params: [message(nonce), account],
    });

    // With public address + signature, we can verify the signature
    const authReq = await fetch(`/api/users/auth`, {
      body: JSON.stringify({ publicAddress: account, signature }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });

    if (!authReq.ok) throw new Error("Could not verify signature");

    return signature;
  };

  /**
   * Clear in-memory wallet cache
   */
  const clear = () => {
    web3Modal && web3Modal.clearCachedProvider();
  };

  /**
   * Set switch chain var to newChainId
   */
  const switchChain = async (newChainId: number) => {
    if (
      newChainId !== ETH_CHAIN_ID &&
      newChainId !== AVAX_CHAIN_ID &&
      newChainId !== POLYGON_CHAIN_ID
    )
      throw new Error("Invalid Chain Id");

    if (newChainId === chain) return retrieve(); // same as current chain

    if (chain && library?.provider?.request) {
      try {
        await library.provider.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: toHex(newChainId) }],
        });
        chain = newChainId;
      } catch (switchError: any) {
        //I think this should add AVAX to MetaMask if you dont have it yet
        //have not tested
        // may need to call switch ethereum chain after adding- unsure if auto
        if (
          switchError.code === 4902 ||
          switchError?.data?.orginalError?.code === 4902
        ) {
          const chainParams =
            newChainId === AVAX_CHAIN_ID
              ? AVAX_PARAMS
              : newChainId === POLYGON_CHAIN_ID
              ? POLYGON_PARAMS
              : undefined;

          if (!chainParams) throw new Error("Invalid Chain Id.");

          try {
            await library.provider.request({
              method: "wallet_addEthereumChain",
              params: [chainParams],
            });
            chain = newChainId;
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
    sign,
    clear,
    switchChain,
  };
};

export const wallet = walletUtil();
