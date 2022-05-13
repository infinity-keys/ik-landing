import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";

import { PuzzlePageProps } from "@lib/types";

import Wrapper from "@components/wrapper";
import NavAvalanche from "@components/nav-avalanche";
import Puzzle from "@components/puzzle";
import { puzzleCount } from "@lib/fetchers";

import { useState, useEffect } from "react";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import WalletConnectProvider from "@walletconnect/web3-provider";
import CoinbaseWalletSDK from '@coinbase/wallet-sdk';
import Fortmatic from "fortmatic";
import { Web3Provider } from "@ethersproject/providers";
import { chain } from "lodash";

const customNetworkOptions = {
  rpcUrl: 'https://rinkeby.infura.io/v3/9b52e43b93e14ee983c8d25f23b90f21', // HAM PERSONAL- change to IK (and .env) ASAP
  chainId: 4
}

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider, // required
    options: {
      infuraId: "9b52e43b93e14ee983c8d25f23b90f21" // HAM PERSONAL- change to IK (and .env) ASAP
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

const Home: NextPage<PuzzlePageProps> = ({ count, puzzleId }) => {
  const [web3Modal, setWeb3Modal] = useState<Web3Modal>();
  const [provider, setProvider] = useState();
  const [library, setLibrary] = useState<Web3Provider>();
  const [account, setAccount] = useState<string>();
  const [chainId, setChainId] = useState<number>();
  const [connected, setConnected] = useState<boolean>(false);

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
  };

  const disconnect = async () => {
    if (web3Modal != undefined) {
      await web3Modal.clearCachedProvider();
      refreshState();
      setConnected(false);
    }
  };
  
  return (
    <Wrapper>
      <div className="ik-page scanlines">
        <div className="container px-4 flex flex-col items-center justify-center min-h-screen">
          <Head>
            <title>Infinity Keys</title>
          </Head>

          <main className="text-center pt-5">
            <Image
              src="/logo.svg"
              alt="Infinity Keys logo"
              width={100}
              height={62.72}
            />
            <p className="py-16 text-center text-lg text-gray-100">Dev only</p>
            {connected ? <button onClick={disconnect}>Disconnect Wallet</button> : <button onClick={connect}>Connect Wallet</button>}
            {connected ? <div>
              <p>Wallet Address: {account}</p>
              <p>Chain Id: {chainId}</p>
            </div> : <></>}
            
            {/*<Puzzle count={count} puzzleUri={puzzleId} />*/}
          </main>

          <footer className="ik-front-bottom w-full">
            <NavAvalanche showAvalanche={false} />
          </footer>
        </div>
      </div>
    </Wrapper>
  );
};

export default Home;

export async function getStaticProps(): Promise<{ props: PuzzlePageProps }> {
  const props = await puzzleCount({
    puzzleId: "a89b6cf8-81b1-45a5-9f69-18af130178e6",
  });
  return {
    props,
  };
}
