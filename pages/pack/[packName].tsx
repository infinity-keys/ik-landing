import { NextPage } from "next";
import Head from "next/head";
import clsx from "clsx";
import isNumber from "lodash/isNumber";

import Wrapper from "@components/wrapper";
import PuzzleThumbnail from "@components/puzzle-thumbnail";

import { gqlApiSdk } from "@lib/server";
import { GetPuzzlesByPackQuery } from "@lib/generated/graphql";
import { PuzzleLayoutType } from "@lib/types";
import useCurrentWidth from "@hooks/useCurrentWidth";

import { AVAX_CHAIN_ID, OPTIMISM_CHAIN_ID } from "@lib/walletConstants";
import { useEffect, useState } from "react";
import { useIKMinter } from "@hooks/useIKMinter";
import LoadingIcon from "@components/loading-icon";
import { useChainModal, useConnectModal } from "@rainbow-me/rainbowkit";
import { useNetwork } from "wagmi";
import { validChain } from "@lib/utils";
import Button from "@components/button";
import MintButton from "@components/mintButton";
import { marketplaceLookup } from "@lib/walletConstants";

interface PageProps {
  puzzles: GetPuzzlesByPackQuery["puzzles"];
  puzzlesNftIds: number[];
  pack: {
    pack_name: string;
    nftId?: number;
  };
}

interface PageParams {
  params: {
    packName: string;
  };
}

const PacksPage: NextPage<PageProps> = ({ puzzles, puzzlesNftIds, pack }) => {
  const gatedIds = puzzlesNftIds;
  const tokenId = pack.nftId;

  if (!tokenId) throw new Error("Invalid token id.");

  const { openConnectModal } = useConnectModal();
  const { openChainModal } = useChainModal();
  const { address, isConnected } = useIKMinter();
  const chain = useNetwork().chain?.id || 0;

  const width = useCurrentWidth();
  const layout = width < 640 ? PuzzleLayoutType.List : PuzzleLayoutType.Grid;

  const [claimed, setClaimed] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
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
    setChainIsValid(validChain(chain || 0));
  }, [chain]);

  const buttonPrimaryClasses =
    "text-sm text-blue font-bold bg-turquoise border-solid border-2 border-turquoise hover:bg-turquoiseDark hover:cursor-pointer rounded-md py-2 w-44 px-4";

  return (
    <Wrapper>
      <Head>
        <title>{pack.pack_name}</title>
      </Head>

      <div className="max-w-3xl items-center text-center">
        <p className="mt-10 sm:mt-14">
          To be eligible to claim the {pack.pack_name} Achievement you must
          successfully complete the following puzzles and claim the
          corresponding achievement NFT. All three NFTs should be claimed on the
          same chain to qualify.
        </p>

        <div className={clsx({ "opacity-0": width === 0 })}>
          <ul
            role="list"
            className={clsx(
              "grid grid-cols-1 gap-6 py-8 max-w-sm mx-auto sm:max-w-none sm:grid-cols-3 sm:mt-6",
              isLoading ? "my-12 sm:mb-0" : "my-10"
            )}
          >
            {puzzles.map(({ puzzle_id, landing_route, simple_name, nft }) => (
              <li key={puzzle_id}>
                <PuzzleThumbnail
                  isGrid={layout === PuzzleLayoutType.Grid}
                  {...{
                    puzzle_id,
                    landing_route,
                    simple_name,
                    cloudinary_id: nft?.nft_metadatum?.cloudinary_id || "",
                  }}
                />
              </li>
            ))}
          </ul>

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
                    <MintButton tokenId={tokenId} gatedIds={gatedIds} />
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
      </div>
    </Wrapper>
  );
};

export default PacksPage;

export async function getStaticPaths() {
  const gql = await gqlApiSdk();
  const { packs } = await gql.GetAllPacks();

  const paths = packs.map(({ simple_name }) => ({
    params: { packName: simple_name },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({
  params,
}: PageParams): Promise<{ props: PageProps }> {
  const { packName } = params;
  const gql = await gqlApiSdk();
  const { puzzles, pack } = await gql.GetPuzzlesByPack({ packName });
  const puzzlesNftIds = puzzles.map(({ nft }) => nft?.tokenId);

  if (!puzzlesNftIds.every(isNumber)) {
    throw new Error("Either no NFTs or NFT IDs are not numbers");
  }
  return {
    props: {
      puzzles,
      puzzlesNftIds,
      pack: pack[0],
    },
  };
}
