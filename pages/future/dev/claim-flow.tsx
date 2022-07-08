import { NextPage } from "next";
import Head from "next/head";
import Avatar from "boring-avatars";
import Wrapper from "@components/wrapper";
import Header from "@components/header";
import Footer from "@components/footer";
import { useState } from "react";
import {
  AVAX_CHAIN_ID,
  ETH_CHAIN_ID,
  AVAX_MARKETPLACE_LINK,
  ETH_MARKETPLACE_LINK,
  CONTRACT_ADDRESS_ETH,
  CONTRACT_ADDRESS_AVAX,
} from "@lib/constants";
import { wallet } from "@lib/wallet";
import { claimedUtil } from "./new-claimed";
import { mintUtil } from "./new-minter";

const ClaimFlow: NextPage = () => {
  //MOVE TO A PROP
  const puzzleId = 2;

  let claim: ReturnType<typeof claimedUtil>;
  let minter; //issues with ReturnType<typeof mintUtil> due to promise in mintUtil

  const openseaLink = `${ETH_MARKETPLACE_LINK}${CONTRACT_ADDRESS_ETH}/${puzzleId}`;
  const joePegsLink = `${AVAX_MARKETPLACE_LINK}${CONTRACT_ADDRESS_AVAX}/${puzzleId}`;

  const [chain, setChain] = useState<number | null>(null);
  const [isLoadingWallet, setIsLoadingWallet] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [claimed, setClaimed] = useState(false);
  const [txMessage, setTxMessage] = useState<string>();

  const connectWallet = async () => {
    setChain((await wallet.trigger()).chain);
    setIsLoadingWallet(true);
    setIsLoading(true);
    claim = claimedUtil(puzzleId);
    setClaimed(await claim.checkIfClaimed());
    setIsLoadingWallet(false);
    setIsLoading(false);
  };

  const mint = async () => {
    minter = await mintUtil(puzzleId);
    setIsLoading(true);
    const { txMessage, claimedStatus } = await minter.mint();
    setIsLoading(false);
    setTxMessage(txMessage);
    setClaimed(claimedStatus);
  };

  const switchChain = async (chainId: number) => {
    const { chain } = await wallet.switchChain(chainId);
    setChain(chain);
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
                  ? isLoadingWallet
                    ? "Connecting Wallet"
                    : "Claiming Trophy"
                  : claimed
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

              {!isLoading && chain && !claimed && (
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
                        mint();
                      } else {
                        await switchChain(ETH_CHAIN_ID);
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
                        mint();
                      } else {
                        await switchChain(AVAX_CHAIN_ID);
                      }
                    }}
                  >
                    {chain === AVAX_CHAIN_ID
                      ? "Claim on Avalanche"
                      : "Switch to Avalanche"}
                  </button>
                </>
              )}

              {txMessage && (
                <div>
                  View Transaction&nbsp;
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={txMessage} //this should know what chain its on. set in transactions util.
                    className="underline"
                  >
                    Here
                  </a>
                </div>
              )}

              {isLoading && (
                <div className="loader mx-auto mt-10">
                  <div className="ball-clip-rotate-multiple">
                    <div></div>
                    <div></div>
                  </div>
                </div>
              )}

              {claimed && (
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={chain === ETH_CHAIN_ID ? openseaLink : joePegsLink}
                  className={buttonPrimaryClasses}
                >
                  View NFT On {chain === ETH_CHAIN_ID ? "OpenSea" : "JoePegs"}
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
