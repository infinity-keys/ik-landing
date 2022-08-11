import Web3Modal from "web3modal";
import { ethers, BigNumber } from "ethers";
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
} from "@lib/contractConstants";
import { toHex } from "./utils";

const chainHexToInt = (hex: string) => BigNumber.from(hex).toNumber();

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
};

// In NextJS, during prerender in Node there is no "window" the library needs
const web3Modal: Web3Modal | undefined =
  typeof window !== "undefined"
    ? new Web3Modal({
        cacheProvider: true, // optional- can set to false if we want them to connect every time
        providerOptions,
        theme: "dark",
      })
    : undefined;

export const walletUtil = () => {
  let provider: ethers.providers.Web3Provider;
  let account: string;
  let chain: number;

  let changeChainCallback: (chain: number) => void;
  let disconnectWalletCallback: (accounts: string[]) => void;

  console.log(web3Modal);

  // Connect has to be listened to way before web3Modal.connect() is called
  web3Modal &&
    web3Modal.on("connect", (info: { chainId: number }) => {
      console.log("connect from web3modal", info);
    });

  /**
   * Pop the modal and set vars we may need later
   */
  const trigger = async () => {
    if (!web3Modal) throw new Error("No web3Modal");

    const instance = await web3Modal.connect();
    // Prevents duplicating listeners when calling trigger multiple times
    instance.removeAllListeners();

    const { selectedAddress, chainId } = instance;

    account = selectedAddress;
    chain = chainHexToInt(chainId);

    instance.on("chainChanged", (chainId: string) => {
      console.log("chainChanged from instance", chainId);
      changeChainCallback(chainHexToInt(chainId));
    });
    // Use this to detect disconnect of wallet outside of our site
    instance.on("accountsChanged", (accounts: string[]) => {
      console.log("accountsChanged from instance", accounts);
    });

    provider = new ethers.providers.Web3Provider(instance);
    // const accounts = await provider.listAccounts();
    // if (!accounts.length) throw new Error("No accounts found");
    // account = accounts[0];
    // chain = (await provider.getNetwork()).chainId;

    return retrieve();
  };

  /**
   * Easy way to get vars needed elsewhere
   */
  const retrieve = () => ({
    provider,
    account,
    chain,
  });

  const sign = async () => {
    if (!provider?.provider?.request) throw new Error("Library is undefined");
    if (!account) throw new Error("Account is undefined");

    const nonceReq = await fetch(`/api/users/${account}`);
    const { nonce } = await nonceReq.json();

    const signature = await provider.provider.request({
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

    if (chain && provider?.provider?.request) {
      try {
        await provider.provider.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: toHex(newChainId) }],
        });
        chain = newChainId;
      } catch (switchError: any) {
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
            await provider.provider.request({
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

  const isCached = () => !!(web3Modal && !!web3Modal.cachedProvider);

  // Let outside code listen for these events
  const setChangeChainCallback = (callback: (chain: number) => void) => {
    changeChainCallback = callback;
  };
  const setDisconnectWalletCallback = (
    callback: (accounts: string[]) => void
  ) => {
    disconnectWalletCallback = callback;
  };

  return {
    trigger,
    retrieve,
    sign,
    clear,
    switchChain,
    isCached,
    setChangeChainCallback,
    setDisconnectWalletCallback,
  };
};

export const wallet = walletUtil();
