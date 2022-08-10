import { NextPage } from "next";
import { useState, useContext } from "react";
import Head from "next/head";
import { useSelector } from "@xstate/react";

import { GlobalWalletContext, createSelector } from "@ik-xstate/global-wallet";

import Wrapper from "@components/wrapper";
import Button from "@components/button";
import {
  AVAX_CHAIN_ID,
  ETH_CHAIN_ID,
  POLYGON_CHAIN_ID,
  ETH_MARKETPLACE_LINK,
  AVAX_MARKETPLACE_LINK,
  POLYGON_MARKETPLACE_LINK,
} from "@lib/contractConstants";
import { wallet } from "@lib/wallet";
import { minterUtil } from "@lib/minter";
import { gqlApiSdk } from "@lib/server";
import CloudImage from "@components/cloud-image";
import LoadingIcon from "@components/loading-icon";

interface ClaimsPageProps {
  nftTokenIds: number[];
  cloudinary_id?: string;
}

interface ClaimsPageParams {
  params: { puzzleName: string };
}

const buttonData = [
  {
    chain_id: ETH_CHAIN_ID,
    name: "Ethereum",
  },
  {
    chain_id: AVAX_CHAIN_ID,
    name: "Avalanche",
  },
  {
    chain_id: POLYGON_CHAIN_ID,
    name: "Polygon",
  },
];

const addressSelector = createSelector((state) => state.context.walletAddress);

const ClaimFlow: NextPage<ClaimsPageProps> = ({
  nftTokenIds,
  cloudinary_id,
}) => {
  const tokenId = nftTokenIds[0]; // @TODO: for now, take the first, but handle multiple soon
  const [account, setAccount] = useState<string>();
  const [chain, setChain] = useState<number>();
  const [isLoadingWallet, setIsLoadingWallet] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [claimed, setClaimed] = useState(false);
  const [signature, setSignature] = useState("");
  const [txMessage, setTxMessage] = useState<string>();

  const globalWalletService = useContext(GlobalWalletContext);
  const address = useSelector(globalWalletService, addressSelector);

  const connectWallet = async () => {
    const { account, chain } = await wallet.trigger();
    setChain(chain);
    setAccount(account);

    setIsLoadingWallet(true);
    setIsLoading(true);
    setClaimed(await checkIfClaimed(account));
    setSignature(await verify(account, tokenId, chain));
    setIsLoadingWallet(false);
    setIsLoading(false);
  };

  const checkIfClaimed = async (account: string) => {
    const url = `/api/minter/check-claimed?account=${account}&tokenId=${tokenId.toString()}`;

    const response = await fetch(url);
    if (response.ok) return (await response.json()).claimed;
    else throw await response.text();
  };

  const verify = async (account: string, tokenId: number, chain: number) => {
    const url = `/api/minter/verify?account=${account}&tokenId=${tokenId.toString()}&chainId=${chain.toString()}`;

    const response = await fetch(url);
    if (response.ok) {
      const { signature } = await response.json();
      return signature;
    }

    throw await response.text();
  };

  const mint = async () => {
    const minter = await minterUtil(tokenId, signature);
    setIsLoading(true);
    const { txMessage, claimedStatus } = await minter.mint();
    setIsLoading(false);
    setTxMessage(txMessage);
    setClaimed(claimedStatus);
  };

  // @TODO: refactor into button component, use clx for classes at least
  const buttonClasses =
    "text-sm text-turquoise border-solid border-2 border-turquoise bg-transparent font-bold bg-turquoise hover:bg-turquoiseDark hover:text-blue rounded-md py-2 w-44 mt-6";

  const buttonPrimaryClasses =
    "text-sm text-blue font-bold bg-turquoise border-solid border-2 border-turquoise hover:bg-turquoiseDark rounded-md py-2 w-44 mt-6";

  return (
    <Wrapper>
      <Head>
        <title>Infinity Keys</title>
      </Head>

      <div className="flex flex-col items-center text-center">
        {cloudinary_id && (
          <CloudImage height={260} width={260} id={cloudinary_id} />
        )}
        <div>address: {address}</div>
        <h2 className="mt-4 text-xl tracking-tight font-extrabold text-white sm:mt-5 sm:text-2xl lg:mt-8 xl:text-2xl mb-8">
          {isLoading
            ? isLoadingWallet
              ? "Connecting Wallet"
              : "Claiming Trophy"
            : claimed
            ? "Your Trophy Has Been Claimed"
            : "Claim Your Trophy"}
        </h2>
        {!chain && (
          <Button
            text="Connect Wallet"
            type="submit"
            onClick={() => connectWallet()}
          />
        )}
        {!isLoading && chain && !claimed && (
          <>
            {buttonData.map(({ chain_id, name }) => (
              <button
                key={chain_id}
                className={
                  chain === chain_id ? buttonPrimaryClasses : buttonClasses
                }
                onClick={async () => {
                  if (chain === chain_id) {
                    mint();
                  } else {
                    setChain((await wallet.switchChain(chain_id)).chain);
                    if (!account) return;
                    const signature = await verify(account, tokenId, chain_id);
                    setSignature(signature);
                  }
                }}
              >
                {chain === chain_id ? `Claim on ${name}` : `Switch to ${name}`}
              </button>
            ))}
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
        {/* @TODO: refactor this to be a shared loader component */}
        {isLoading && <LoadingIcon />}
        {claimed && (
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={`${
              chain === ETH_CHAIN_ID
                ? ETH_MARKETPLACE_LINK
                : chain === AVAX_CHAIN_ID
                ? AVAX_MARKETPLACE_LINK
                : chain === POLYGON_CHAIN_ID
                ? POLYGON_MARKETPLACE_LINK
                : undefined
            }${tokenId}`}
            className={buttonPrimaryClasses}
          >
            View NFT On{" "}
            {chain === ETH_CHAIN_ID || chain === POLYGON_CHAIN_ID
              ? "OpenSea"
              : "JoePegs"}
          </a>
        )}
      </div>
    </Wrapper>
  );
};

export default ClaimFlow;

export async function getStaticProps({
  params: { puzzleName },
}: ClaimsPageParams): Promise<{ props: ClaimsPageProps }> {
  const gql = await gqlApiSdk();

  const { nfts } = await gql.GetNftIdByPuzzleName({ puzzleName });
  const nftTokenIds = nfts.map((nft) => nft.tokenId);

  const { puzzles } = await gql.PuzzleInfoBySuccess({ success: puzzleName });

  const nft = puzzles.length ? puzzles[0].nft : null;

  return {
    props: {
      nftTokenIds,
      cloudinary_id: nft?.nft_metadatum?.cloudinary_id || "",
    },
  };
}

export async function getStaticPaths() {
  const gql = await gqlApiSdk();
  const { nfts } = await gql.GetAllNftClaims();

  // https://nextjs.org/docs/api-reference/data-fetching/get-static-paths
  const paths = nfts.map((nft) => ({
    params: {
      puzzleName: nft.puzzle.simple_name,
    },
  }));

  return {
    paths,
    fallback: false,
  };
}
