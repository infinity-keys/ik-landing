import type { NextPage } from "next";
import Image from "next/image";
import Head from "next/head";
import { useForm, SubmitHandler, useFormState } from "react-hook-form";

import Wrapper from "@components/wrapper";
import Link from "next/link";
import { ETH_ADDRESS_REGEX } from "@lib/constants";

import { useState, useEffect } from "react";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import WalletConnectProvider from "@walletconnect/web3-provider";
import CoinbaseWalletSDK from '@coinbase/wallet-sdk';
import Fortmatic from "fortmatic";
import { Web3Provider } from "@ethersproject/providers";

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
  coinbasewallet: {
    package: CoinbaseWalletSDK, // Required
    options: {
      appName: "My Awesome App", // Required
      infuraId: "INFURA_ID", // Required
      rpc: "", // Optional if `infuraId` is provided; otherwise it's required
      chainId: 1, // Optional. It defaults to 1 if not provided
      darkMode: false // Optional. Use dark theme, defaults to false
    }
  },
  fortmatic: {
    package: Fortmatic, // required
    options: {
      key: "FORTMATIC_KEY", // required
      network: customNetworkOptions // if we don't pass it, it will default to localhost:8454
    }
  }
};

const Dev: NextPage = () => {
  const [web3Modal, setWeb3Modal] = useState<Web3Modal>();
  const [provider, setProvider] = useState();
  const [library, setLibrary] = useState<Web3Provider>();
  const [account, setAccount] = useState<string>();
  const [chainId, setChainId] = useState<number>();
  const [connected, setConnected] = useState<boolean>(false);

  //FOR SIGNING- NOT NEEDED FOR WALLET CONNECT
  const [message, setMessage] = useState<string>("This is a test message.");
  const [signature, setSignature] = useState<string>('');
  //

  useEffect(() => {
    setWeb3Modal(new Web3Modal({
      //network: "rinkeby", // optional- we dont care for now I think, but will be important once we add NFT claiming/anything on chain
      cacheProvider: false, // optional- can set to false if we want them to connect every time
      providerOptions
    }));
  }, []);
  
  const connect = async () => {
    if (web3Modal != undefined) {
      try {
        const provider = await web3Modal.connect();
        const library = new ethers.providers.Web3Provider(provider);
        const accounts = await library.listAccounts();
        const network = await library.getNetwork();
        setProvider(provider);
        setLibrary(library);
        if (accounts) setAccount(accounts[0]);
        setChainId(network.chainId);
        setConnected(true);
      } catch (error) {
        console.log(error);
      }
    }
  }

  const refreshState = () => {
    setAccount("");
    setChainId(-1);
    // FOR SIGNING ONLY
    setSignature("");
  };

  const disconnect = async () => {
    if (web3Modal != undefined) {
      await web3Modal.clearCachedProvider();
      refreshState();
      setConnected(false);
    }
  };

  //FOR SIGNING ONLY- NOT NEEDED FOR WALLET CONNECTION
  const signMessage = async () => {
    if (library?.provider.request) {
      try {
        const signature = await library.provider.request({
          method: "personal_sign",
          params: [message, account]
        });
        setSignature(signature);
      } catch (error) {
        console.log(error)
      }
    } 
  };

  return (
    <Wrapper>
      <Head>
        <title>Dev</title>
      </Head>

      <div className="ik-page radial-bg ">
        <div className="container px-4 flex flex-col items-center justify-center min-h-screen max-w-sm ">
          <header className="pt-4 md:pt-14 pb-4 block w-full">
            <Image src="/logo.svg" width={100} height={63} alt="IK logo" />
          </header>

          <main className="flex flex-col items-center justify-center text-center w-full flex-1 z-10 ">
            {connected ? <button onClick={disconnect}>Disconnect Wallet</button> : <button onClick={connect}>Connect Wallet</button>}
            {connected ? <div>
              <p>Wallet Address: {account}</p>
              <p>Chain Id: {chainId}</p>
              <br/>
              {/*ONLY NEEDED FOR SIGNING MESSAGES, NOT WALLET CONNECTION*/}
              {signature === '' ? <button onClick={signMessage}>Sign Message</button> : 
              <div>
                <p>Signed Message: {message}</p>
                <p>Signature: {signature}</p>
              </div>}
              {/*END*/}
            </div> : <></>}
          </main>
        </div>
      </div>
    </Wrapper>
  );
};

export default Dev;
