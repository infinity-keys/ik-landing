import { NextPage } from "next";
import { useEffect, useState } from "react";
import Head from "next/head";

import Wrapper from "@components/wrapper";
import Button from "@components/button";
import { AVAX_CHAIN_ID, OPTIMISM_CHAIN_ID } from "@lib/walletConstants";
import { useIKMinter } from "@lib/minter";
import { gqlApiSdk } from "@lib/server";
import CloudImage from "@components/cloud-image";
import LoadingIcon from "@components/loading-icon";
import { useNetwork } from "wagmi";
import { useChainModal, useConnectModal } from "@rainbow-me/rainbowkit";
import MintButton from "@components/mintButton";
import { validChain } from "@lib/utils";
import { marketplaceLookup } from "@lib/contracts";

interface ClaimsPageProps {
  nftTokenIds: number[];
  cloudinary_id?: string;
}

interface ClaimsPageParams {
  params: { success: string };
}

const ClaimFlow: NextPage<ClaimsPageProps> = ({
  nftTokenIds,
  cloudinary_id,
}) => {
  const { openConnectModal } = useConnectModal();
  const { openChainModal } = useChainModal();
  const { address, isConnected } = useIKMinter();
  const chain = useNetwork().chain?.id || 0;

  const tokenId = nftTokenIds[0]; // @TODO: for now, take the first, but handle multiple soon
  const [isLoading, setIsLoading] = useState(false);
  const [claimed, setClaimed] = useState(false);
  const [chainIsValid, setChainIsValid] = useState(false);

  useEffect(() => {
    const checkIfClaimed = async (account: string) => {
      const url = `/api/minter/check-claimed?account=${account}&tokenId=${tokenId?.toString()}`;

      const response = await fetch(url);
      if (response.ok) return (await response.json()).claimed;
      else throw await response.text();
    };

    const onPageLoad = async () => {
      if (isConnected && address) {
        setIsLoading(true);
        setClaimed(await checkIfClaimed(address));
        setIsLoading(false);
      }
    };
    onPageLoad();
  }, [isConnected, address, tokenId]);

  useEffect(() => {
    setChainIsValid(validChain(chain));
  }, [chain]);

  // @TODO: refactor into button component, use clx for classes at least
  const buttonClasses =
    "text-sm text-turquoise border-solid border-2 border-turquoise bg-transparent font-bold bg-turquoise hover:bg-turquoiseDark hover:text-blue hover:cursor-pointer rounded-md py-2 w-44 ";

  const buttonPrimaryClasses =
    "text-sm text-blue font-bold bg-turquoise border-solid border-2 border-turquoise hover:bg-turquoiseDark hover:cursor-pointer rounded-md py-2 w-44";

  return (
    <Wrapper>
      <Head>
        <title>Infinity Keys</title>
      </Head>

      <div className="flex flex-col items-center text-center">
        {cloudinary_id && (
          <CloudImage height={260} width={260} id={cloudinary_id} />
        )}

        {!isConnected ? (
          <div>
            <h2 className="mt-10 text-xl tracking-tight font-extrabold text-white sm:mt-5 sm:text-2xl lg:mt-8 xl:text-2xl mb-8">
              Connect Wallet To Claim Trophy
            </h2>
            <Button
              text="Connect Wallet"
              type="submit"
              onClick={openConnectModal}
            />
          </div>
        ) : (
          <>
            {!chainIsValid ? (
              <div>
                <h2 className="mt-10 text-xl tracking-tight font-extrabold text-white sm:mt-5 sm:text-2xl lg:mt-8 xl:text-2xl mb-8">
                  Switch Chain To Claim Trophy
                </h2>
                <Button
                  text="Switch Chain"
                  type="submit"
                  onClick={openChainModal}
                />
              </div>
            ) : (
              <>
                {isLoading && (
                  <div>
                    <h2 className="mt-4 text-xl tracking-tight font-extrabold text-white sm:mt-5 sm:text-2xl lg:mt-8 xl:text-2xl mb-8">
                      Checking NFTs
                    </h2>
                    <LoadingIcon />
                  </div>
                )}

                {!claimed && !isLoading && (
                  <MintButton tokenId={tokenId} gatedIds={[]} />
                )}

                {claimed && !isLoading && (
                  <>
                    <h2 className="mt-4 text-xl tracking-tight font-extrabold text-white sm:mt-5 sm:text-2xl lg:mt-8 xl:text-2xl mb-8">
                      Your Trophy Has Been Claimed
                    </h2>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={`${marketplaceLookup[chain]}${tokenId}`}
                      className={buttonPrimaryClasses}
                    >
                      View NFT On{" "}
                      {chain === AVAX_CHAIN_ID
                        ? "Joepegs"
                        : chain === OPTIMISM_CHAIN_ID
                        ? "Quixotic"
                        : "OpenSea"}
                    </a>
                  </>
                )}
              </>
            )}
          </>
        )}
      </div>
    </Wrapper>
  );
};

export default ClaimFlow;

export async function getStaticProps({
  params: { success },
}: ClaimsPageParams): Promise<{ props: ClaimsPageProps }> {
  const gql = await gqlApiSdk();

  const { nfts } = await gql.GetNftIdByPuzzleSuccessRoute({
    successRoute: success,
  });
  const nftTokenIds = nfts.map((nft) => nft.tokenId);

  const { puzzles } = await gql.PuzzleInfoBySuccess({ success });

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
      success: nft.puzzle.success_route,
    },
  }));

  return {
    paths,
    fallback: false,
  };
}
