import type { NextPage } from "next";
import Image from "next/image";
import Head from "next/head";
import { useState, useEffect } from "react";

import Wrapper from "@components/wrapper";

import Web3Modal from "web3modal";
import { ethers } from "ethers";
import WalletConnectProvider from "@walletconnect/web3-provider";
import CoinbaseWalletSDK from '@coinbase/wallet-sdk';
import Fortmatic from "fortmatic";
import { Web3Provider } from "@ethersproject/providers";
import { verify } from "crypto";

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

const message = "This is a test message."

// In NextJS, during prerender in Node there is no "window" the library needs
const web3Modal: Web3Modal | undefined =
  typeof window !== 'undefined' ? new Web3Modal({
    //network: "rinkeby", // optional- we dont care for now I think, but will be important once we add NFT claiming/anything on chain
    cacheProvider: false, // optional- can set to false if we want them to connect every time
    providerOptions
  }) : undefined

// Scoped up here since multiple callbacks need it
let library: ethers.providers.Web3Provider | undefined;


const Dev: NextPage = () => {

  const [account, setAccount] = useState<string>();
  const [chainId, setChainId] = useState<number>();

  //FOR SIGNING- NOT NEEDED FOR WALLET CONNECT
  const [signature, setSignature] = useState<string>('');
  const [verifiedAddress, setVerifiedAddress] = useState<string>('');

  const connect = async (): Promise<Web3Provider | undefined> => {
    if (!web3Modal) return;

    try {
      const provider: ethers.providers.ExternalProvider = await web3Modal.connect();
      library = new ethers.providers.Web3Provider(provider);

      const accounts = await library.listAccounts();
      const network = await library.getNetwork();
      accounts && setAccount(accounts[0]);

      setChainId(network.chainId);
    } catch (error) {
      console.log(error);
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

  //FOR SIGNING ONLY- NOT NEEDED FOR WALLET CONNECTION
  const signMessage = async () => {
    if (!library?.provider?.request) return;

    try {
      const signature = await library.provider.request({
        method: "personal_sign",
        params: [message, account]
      });
      setSignature(signature);
    } catch (error) {
      console.log(error)
    }

  };

  const verifySignature = async () => {
    setVerifiedAddress(ethers.utils.verifyMessage(message, signature));
  }

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
            {account
              ? <button onClick={disconnect}>Disconnect Wallet</button>
              : <button onClick={connect}>Connect Wallet</button>}

            {account && <div>
              <p>Wallet Address: {account}</p>
              <p>Chain Id: {chainId}</p>
              <br />
              {/*ONLY NEEDED FOR SIGNING MESSAGES, NOT WALLET CONNECTION*/}
              {!signature
                ? <button onClick={signMessage}>Sign Message</button>
                : <div>
                  <p>Signed Message: <br />{message}</p>
                  <p>Signature: <br />{signature}</p>
                </div>}
              {signature &&
                <div>
                  <br />
                  <button onClick={verifySignature}>Verify Signature</button>
                  {verifiedAddress && <div>
                    <p>Address of Signature: <br />{verifiedAddress}</p>
                    <p>Address Match?<br />{verifiedAddress === account ? <span>True</span> : <span>False</span>}</p>
                  </div>}
                </div>}
              {/*END*/}
            </div>}
          </main>
        </div>
      </div>
    </Wrapper>
  );
};

export default Dev;
