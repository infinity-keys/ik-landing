import { NextPage } from "next";
import { useState } from "react";
import Head from "next/head";
import Avatar from "boring-avatars";
import Wrapper from "@components/wrapper";
import Header from "@components/header";
import Footer from "@components/footer";
import {
  AVAX_CHAIN_ID,
  ETH_CHAIN_ID,
  openseaLink,
  joePegsLink,
} from "@lib/constants";
import { wallet } from "@lib/wallet";
import { minterUtil } from "@lib/minter";
import { gqlApiSdk } from "@lib/server";

interface ClaimsPageProps {
  nftTokenIds: number[];
}

interface ClaimsPageParams {
  params: { puzzleName: string }
}

const ClaimFlow: NextPage<ClaimsPageProps> = ({ nftTokenIds }) => {
  // TURN INTO PROP
  const tokenId = nftTokenIds[0]; // @TODO: for now, take the first, but handle multiple soon
  const [chain, setChain] = useState<number>();
  const [isLoadingWallet, setIsLoadingWallet] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [claimed, setClaimed] = useState(false);
  const [txMessage, setTxMessage] = useState<string>();

  const connectWallet = async () => {
    const { account, chain } = await wallet.trigger();
    setChain(chain);

    setIsLoadingWallet(true);
    setIsLoading(true);
    setClaimed(await checkIfClaimed(account));
    setIsLoadingWallet(false);
    setIsLoading(false);
  };

  const checkIfClaimed = async (account: string) => {
    const url = `/api/minter/achievement?account=${account}&tokenId=${tokenId.toString()}`;

    try {
      const response = await fetch(url);
      if (response.ok) return (await response.json()).claimed;
      else throw await response.text();
    } catch (error) {
      throw error;
    }
  };

  const mint = async () => {
    const minter = await minterUtil(tokenId);
    setIsLoading(true);
    const { txMessage, claimedStatus } = await minter.mint();
    setIsLoading(false);
    setTxMessage(txMessage);
    setClaimed(claimedStatus);
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
                        setChain(
                          (await wallet.switchChain(ETH_CHAIN_ID)).chain
                        );
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
                        setChain(
                          (await wallet.switchChain(AVAX_CHAIN_ID)).chain
                        );
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
                    href={txMessage.toString()}
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
                  href={`${chain === ETH_CHAIN_ID ? openseaLink : joePegsLink
                    }${tokenId}`}
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

export async function getStaticProps({ params: { puzzleName } }: ClaimsPageParams): Promise<{ props: ClaimsPageProps }> {
  const gql = await gqlApiSdk();
  const { nfts } = await gql.GetNftIdByPuzzleName({ puzzleName })

  const nftTokenIds = nfts.map(nft => parseInt(nft.tokenId));

  return {
    props: {
      nftTokenIds,
    }
  };
}

export async function getStaticPaths() {
  const gql = await gqlApiSdk();
  const { nfts } = await gql.GetAllNftClaims();

  // https://nextjs.org/docs/api-reference/data-fetching/get-static-paths
  const paths = nfts.map(nft => ({
    params: {
      puzzleName: nft.puzzle.simple_name
    }
  }))

  return {
    paths,
    fallback: false,
  };
}
