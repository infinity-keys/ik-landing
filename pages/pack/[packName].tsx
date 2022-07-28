import { NextPage } from "next";
import Head from "next/head";
import clsx from "clsx";

// @TODO: remove when updated with Ham's layout
import Header from "@components/header";
import Footer from "@components/footer";
import Wrapper from "@components/wrapper";
import PuzzleThumbnail from "@components/puzzle-thumbnail";
import Alert from "@components/alert";

import { gqlApiSdk } from "@lib/server";
import { GetPuzzlesByPackQuery } from "@lib/generated/graphql";
import { PuzzleLayoutType } from "@lib/types";
import { wallet } from "@lib/wallet";
import useCurrentWidth from "@hooks/useCurrentWidth";

import {
  AVAX_CHAIN_ID,
  ETH_CHAIN_ID,
  POLYGON_CHAIN_ID,
  openseaLink,
  joePegsLink,
  openseaPolygonLink,
} from "@lib/constants";
import { useState } from "react";
import { minterUtil } from "@lib/minter";

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

const PacksPage: NextPage<PageProps> = ({ puzzles, puzzlesNftIds, pack }) => {
  const tokenIds = puzzlesNftIds;
  const nftId = pack.nftId;

  const width = useCurrentWidth();
  const layout = width < 640 ? PuzzleLayoutType.List : PuzzleLayoutType.Grid;
  const [chain, setChain] = useState<number | undefined>();
  const [owned, setOwned] = useState<boolean>(false);
  const [claimed, setClaimed] = useState<boolean>(false);
  const [account, setAccount] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const connectWallet = async () => {
    try {
      const { account, chain } = await wallet.trigger();
      setChain(chain);
      setAccount(account);

      setLoading(true);
      const claimed = await checkIfClaimed(account);
      setClaimed(claimed);
      if (claimed) {
        setLoading(false);
        return;
      }
      setOwned(await checkIfOwned(account, tokenIds, chain));
    } catch (err) {
      console.log("err: ", err);
    }
  };

  const checkIfOwned = async (
    account: string,
    tokenIds: number[],
    chainId: number
  ) => {
    setMessage("");
    let tokenIdsParams = "";

    tokenIds.forEach((id) => {
      tokenIdsParams += `tokenids=${id.toString()}&`;
    });

    const url = `/api/minter/check-balance?account=${account}&${tokenIdsParams}chainId=${chainId}`;

    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      if (!data.claimed)
        setMessage(
          "You do not have the required NFTS on this chain. Please ensure you have completed the above puzzles and are on the correct chain."
        );
      setLoading(false);
      return data.claimed;
    } else {
      setLoading(false);
      setMessage("Something went wrong. Please try again.");
      throw await response.text();
    }
  };

  const checkIfClaimed = async (account: string) => {
    const url = `/api/minter/check-claimed?account=${account}&tokenId=${nftId?.toString()}`;

    const response = await fetch(url);
    if (response.ok) return (await response.json()).claimed;
    else throw await response.text();
  };

  const mint = async () => {
    if (nftId) {
      setLoading(true);
      const minter = await minterUtil(nftId, owned);
      const { txMessage, claimedStatus } = await minter.mint();
      console.log(txMessage);
      setLoading(false);
      setMessage("Congrats on claiming your NFT!");
      setClaimed(claimedStatus);
    }
  };

  return (
    <Wrapper>
      <Head>
        <title>{pack.pack_name}</title>
      </Head>
      <Header />

      <div className="w-full pt-4 pb-4 min-h-screen radial-bg relative z-0">
        <div className="container px-4 max-w-3xl">
          <p className="mt-10 sm:mt-14">
            To be eligible to claim the {pack.pack_name} Achievement you must
            successfully complete the following puzzles and claim the
            corresponding achievement NFT. All three NFTs should be claimed on
            the same chain to qualify.
          </p>

          <div className={clsx({ "opacity-0": width === 0 })}>
            <ul
              role="list"
              className={clsx(
                "grid grid-cols-1 gap-6 py-8 max-w-sm mx-auto sm:max-w-none sm:grid-cols-3 sm:mt-6",
                message || loading ? "my-12 sm:mb-0" : "my-10"
              )}
            >
              {puzzles.map(({ puzzle_id, landing_route, simple_name }) => (
                <li key={puzzle_id}>
                  <PuzzleThumbnail
                    isGrid={layout === PuzzleLayoutType.Grid}
                    {...{ puzzle_id, landing_route, simple_name }}
                  />
                </li>
              ))}
            </ul>

            {message && (
              <div className="max-w-xl mx-auto mb-2 mt-2">
                <Alert text={message} />
              </div>
            )}

            {loading && (
              <div className="loader mx-auto h-8 w-8 flex justify-center sm:mt-14">
                <div className="ball-clip-rotate-multiple">
                  <div></div>
                  <div></div>
                </div>
              </div>
            )}

            <div className="text-center mb-12">
              {!loading && (
                <div>
                  {claimed ? (
                    <button
                      className={clsx(
                        "text-sm text-blue font-bold border-solid border-2 rounded-md py-2 px-4 mb-8 bg-turquoise border-turquoise hover:bg-turquoiseDark"
                      )}
                    >
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href={`${
                          chain === ETH_CHAIN_ID
                            ? openseaLink
                            : chain === AVAX_CHAIN_ID
                            ? joePegsLink
                            : chain === POLYGON_CHAIN_ID
                            ? openseaPolygonLink
                            : openseaLink
                        }${nftId}`}
                      >
                        View NFT On{" "}
                        {chain === AVAX_CHAIN_ID ? "JoePegs" : "OpenSea"}
                      </a>
                    </button>
                  ) : (
                    <button
                      className={clsx(
                        "text-sm text-blue font-bold border-solid border-2 rounded-md py-2 w-44 mb-8",

                        chain !== undefined && !owned
                          ? "bg-gray-150 border-gray-150"
                          : "bg-turquoise border-turquoise hover:bg-turquoiseDark"
                      )}
                      onClick={() => (owned ? mint() : connectWallet())}
                      disabled={chain !== undefined && !owned}
                    >
                      {owned
                        ? "Mint"
                        : !owned && chain !== undefined
                        ? "Wallet Connected"
                        : "Connect Wallet"}
                    </button>
                  )}
                </div>
              )}

              {chain && (
                <div className="text-white/75 flex flex-col md:block">
                  {buttonData.map(({ name, chain_id }) => (
                    <button
                      className={clsx(
                        "transition my-2 hover:text-white text-turquoise md:mx-4 md:my-0",
                        {
                          "text-white/50 hover:text-white/50":
                            chain === chain_id,
                        }
                      )}
                      key={name}
                      onClick={async () => {
                        const newChain = (await wallet.switchChain(chain_id))
                          .chain;
                        if (chain !== newChain) {
                          setOwned(
                            await checkIfOwned(account, tokenIds, newChain)
                          );
                          setChain(newChain);
                        }
                      }}
                      disabled={chain === chain_id}
                    >
                      {chain === chain_id
                        ? `Connected to ${name}`
                        : `Switch to ${name}`}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
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

  return {
    props: {
      puzzles,
      puzzlesNftIds,
      pack: pack[0],
    },
  };
}
