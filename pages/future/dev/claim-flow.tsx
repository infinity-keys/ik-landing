import { NextPage } from "next";
import Head from "next/head";
import Avatar from "boring-avatars";
import Wrapper from "@components/wrapper";
import Header from "@components/header";
import Footer from "@components/footer";
import { useEffect, useState } from "react";

import { minterUtil } from "./minter";
import {
  AVAX_CHAIN_ID,
  ETH_CHAIN_ID,
  AVAX_MARKETPLACE_LINK,
  ETH_MARKETPLACE_LINK,
  CONTRACT_ADDRESS_ETH,
  CONTRACT_ADDRESS_AVAX,
} from "@lib/constants";

const ClaimFlow: NextPage = () => {
  //MOVE TO A PROP
  const puzzleId = 4;

  const openseaLink =
    ETH_MARKETPLACE_LINK + CONTRACT_ADDRESS_ETH + "/" + puzzleId;
  const joePegsLink =
    AVAX_MARKETPLACE_LINK + CONTRACT_ADDRESS_AVAX + "/" + puzzleId;

  const [chain, setChain] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [minted, setMinted] = useState(false);

  const updateLoading = async (isItLoading: boolean) => {
    setIsLoading(isItLoading);
  };

  const updateMinted = async (isItMinted: boolean) => {
    if (await isItMinted) setMinted(isItMinted);
  };

  const minter = minterUtil({ updateLoading, updateMinted, puzzleId });

  const connectWallet = async () => {
    setChain(await minter.connectWallet());
  };

  const mint = async (network: number) => {
    await minter.mint();
  };

  const buttonClasses =
    "text-sm text-turquoise border-solid border-2 border-turquoise bg-transparent font-bold bg-turquoise hover:bg-turquoiseDark hover:text-blue rounded-md py-2 px-4 mt-6";

  const buttonPrimaryClasses =
    "text-sm text-blue font-bold bg-turquoise border-solid border-2 border-turquoise hover:bg-turquoiseDark rounded-md py-2 px-4 mt-6";

  return (
    <Wrapper>
      <Head>
        <title>Infinity Keys</title>
      </Head>
      <div className="scanlines">
        <Header />

        <div className="radial-bg min-h-screen flex items-center">
          <div className="container p-4 text-center">
            <div className="flex flex-col items-center">
              <Avatar
                size={128}
                name="nftz"
                variant="marble"
                colors={["#101D42", "#E400FF", "#3FCCBB", "#8500AC", "#303B5B"]}
              />
              <h2 className="mt-4 text-xl tracking-tight font-extrabold text-white sm:mt-5 sm:text-2xl lg:mt-8 xl:text-2xl">
                {isLoading
                  ? "Claiming Trophy"
                  : minted
                  ? "Your Trophy Has Been Claimed"
                  : "Claim Your Trophy"}
              </h2>

              {!chain && (
                <button
                  className={buttonPrimaryClasses}
                  type="submit"
                  value="Join the mailing list"
                  onClick={() => connectWallet()}
                >
                  Connect Wallet
                </button>
              )}

              {!isLoading && chain && !minted && (
                <>
                  <button
                    className={
                      chain === ETH_CHAIN_ID
                        ? buttonPrimaryClasses
                        : buttonClasses
                    }
                    type="submit"
                    value="Join the mailing list"
                    onClick={async () => {
                      if (chain === ETH_CHAIN_ID) {
                        mint(ETH_CHAIN_ID);
                      } else {
                        await minter.switchToEth();
                        setChain(ETH_CHAIN_ID);
                      }
                    }}
                  >
                    {chain === ETH_CHAIN_ID
                      ? "Claim on Ethereum"
                      : "Switch to Ethereum"}
                  </button>
                  <button
                    className={
                      chain === AVAX_CHAIN_ID
                        ? buttonPrimaryClasses
                        : buttonClasses
                    }
                    type="submit"
                    value="Join the mailing list"
                    onClick={async () => {
                      if (chain === AVAX_CHAIN_ID) {
                        mint(AVAX_CHAIN_ID);
                      } else {
                        await minter.switchToAvax();
                        setChain(AVAX_CHAIN_ID);
                      }
                    }}
                  >
                    {chain === AVAX_CHAIN_ID
                      ? "Claim on Avalanche"
                      : "Switch to Avalanche"}
                  </button>
                </>
              )}

              {isLoading && (
                <div className="loader mx-auto mt-10">
                  <div className="ball-clip-rotate-multiple">
                    <div></div>
                    <div></div>
                  </div>
                </div>
              )}

              {minted && (
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={chain === ETH_CHAIN_ID ? openseaLink : joePegsLink}
                  className={buttonPrimaryClasses}
                >
                  View On {chain === ETH_CHAIN_ID ? "OpenSea" : "JoePegs"}
                </a>
              )}
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </Wrapper>
  );
};

export default ClaimFlow;
