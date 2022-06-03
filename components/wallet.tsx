
import { useState, useEffect } from "react";

import Web3Modal from "web3modal";
import { ethers } from "ethers";
import WalletConnectProvider from "@walletconnect/web3-provider";
import CoinbaseWalletSDK from '@coinbase/wallet-sdk';
import Fortmatic from "fortmatic";

import { message } from "@lib/utils";

const customNetworkOptions = {
  rpcUrl: 'https://rinkeby.infura.io/v3/c10d222a5bae4a8e97fad0915b06ff5d',
  chainId: 4
}

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider, // required
    options: {
      infuraId: "c10d222a5bae4a8e97fad0915b06ff5d"
    }
  },
  // coinbasewallet: {
  //   package: CoinbaseWalletSDK, // Required
  //   options: {
  //     appName: "My Awesome App", // Required
  //     infuraId: "INFURA_ID", // Required
  //     rpc: "", // Optional if `infuraId` is provided; otherwise it's required
  //     chainId: 1, // Optional. It defaults to 1 if not provided
  //     darkMode: false // Optional. Use dark theme, defaults to false
  //   }
  // },
  // fortmatic: {
  //   package: Fortmatic, // required
  //   options: {
  //     key: "FORTMATIC_KEY", // required
  //     network: customNetworkOptions // if we don't pass it, it will default to localhost:8454
  //   }
  // }
};

// In NextJS, during prerender in Node there is no "window" the library needs
const web3Modal: Web3Modal | undefined =
  typeof window !== 'undefined' ? new Web3Modal({
    //network: "rinkeby", // optional- we dont care for now I think, but will be important once we add NFT claiming/anything on chain
    cacheProvider: false, // optional- can set to false if we want them to connect every time
    providerOptions
  }) : undefined

interface WalletProps {
  onWalletSignature?: (address: string) => Promise<void>;
}
const Wallet = ({ onWalletSignature }: WalletProps) => {
  const [account, setAccount] = useState<string>();
  const [chainId, setChainId] = useState<number>();

  const [signature, setSignature] = useState<string>('');
  const [verifiedAddress, setVerifiedAddress] = useState<string>('');

  const connect = async (): Promise<void> => {
    try {
      if (!web3Modal) throw new Error('No web3Modal');

      const provider: ethers.providers.ExternalProvider = await web3Modal.connect();
      const library = new ethers.providers.Web3Provider(provider);

      const accounts = await library.listAccounts();
      if (!accounts.length)
        throw new Error("No accounts found");
      const [account] = accounts
      setAccount(account);

      // Fetch our nonce used to sign our message
      const nonceReq = await fetch(`/api/users/${account}`);
      const { nonce } = await nonceReq.json();

      if (!library?.provider?.request)
        throw new Error("Library is undefined");
      const signature = await library.provider.request({
        method: "personal_sign",
        params: [message(nonce), account]
      });
      setSignature(signature);

      // With public address + signature, we can verify the signature
      const authReq = await fetch(`/api/users/auth`, {
        body: JSON.stringify({ publicAddress: account, signature }),
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST'
      })

      // Call the callback with our wallet address
      onWalletSignature && await onWalletSignature(account);

      // const network = await library.getNetwork();
      // setChainId(network.chainId);
    } catch (error) {
      disconnect();
    }

  }

  const disconnect = () => {
    if (web3Modal)
      web3Modal.clearCachedProvider();
    setAccount("");
    setChainId(-1);
    // FOR SIGNING ONLY
    setSignature("");
    setVerifiedAddress("");
  };

  // const verifySignature = async () => {
  //   // setVerifiedAddress(ethers.utils.verifyMessage(message, signature));
  // }

  return (
    <button onClick={account ? disconnect : connect} className="text-blue font-bold bg-turquoise hover:bg-turquoiseDark rounded-md py-2 px-4" >
      {!account && !signature && 'Connect wallet'}
      {account && !signature && 'Waiting on signature'}
      {account && signature && 'Disconnect'}
    </button>
  );
};

export default Wallet;
