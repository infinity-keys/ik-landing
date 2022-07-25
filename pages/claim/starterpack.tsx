import { NextPage } from "next";
import Head from "next/head";
import clsx from "clsx";

import { gqlApiSdk } from "@lib/server";
// @TODO: remove when updated with Ham's layout
import Header from "@components/header";
import Footer from "@components/footer";
import Wrapper from "@components/wrapper";
import PuzzleThumbnail from "@components/puzzle-thumbnail";
import { StarterPackPuzzlesQuery } from "@lib/generated/graphql";
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
  puzzles: StarterPackPuzzlesQuery["puzzles"];
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

const StarterPack: NextPage<PageProps> = ({ puzzles }) => {
  // abstract this away at some point- requisite tokenIds for pack
  const tokenIds = [0];

  const width = useCurrentWidth();
  const layout = width < 640 ? PuzzleLayoutType.List : PuzzleLayoutType.Grid;
  const [chain, setChain] = useState<number>();
  const [owned, setOwned] = useState(false);
  const [account, setAccount] = useState<string>();

  const connectWallet = async () => {
    const { account, chain } = await wallet.trigger();
    setChain(chain);
    setAccount(account);

    //can we add the fun spinny ball for this part?
    setOwned(await checkIfOwned(account, tokenIds, chain));
  };

  const checkIfOwned = async (
    account: string,
    tokenids: number[],
    chainId: number
  ) => {
    let tokenIds = "";
    for (let i = 0; i < tokenids.length; i++) {
      tokenIds += `tokenids=${tokenids[i].toString()}&`;
    }
    const url = `/api/minter/check-balance?account=${account}&${tokenIds}chainId=${chainId}`;

    const response = await fetch(url);
    if (response.ok) return (await response.json()).claimed;
    else throw await response.text();
  };

  // Commented this out due to it being mainnet!!!
  //dont want to accidentally test there

  // const mint = async () => {
  //   //ideally not hardcoded! tokenId to claim
  //   const minter = await minterUtil(3);
  //   //setIsLoading(true); //spinny ball of fun!
  //   const { txMessage, claimedStatus } = await minter.mint();
  //   //setIsLoading(false);
  //   //setTxMessage(txMessage);
  //   //setClaimed(claimedStatus);
  // };

  return (
    <Wrapper>
      <Head>
        <title>Starter Pack - Infinity Keys</title>
      </Head>
      <Header />

      <div className="w-full pt-4 pb-4 min-h-screen radial-bg relative z-0">
        <div className="container px-4 max-w-3xl">
          <p className="mt-12 sm:mt-16">
            To be eligible to claim the Starter Pack Achievement you must
            successfully complete the following puzzles and claim the
            corresponding achievement NFT. All three NFTs should be claimed on
            the same chain to qualify.
          </p>

          <div className={clsx({ "opacity-0": width === 0 })}>
            <ul
              role="list"
              className={clsx(
                "grid grid-cols-1 gap-6 py-8 max-w-sm mx-auto sm:max-w-none sm:grid-cols-3 my-10 sm:my-14"
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

            <div className="text-center mb-12">
              <button
                className="text-sm text-blue font-bold bg-turquoise border-solid border-2 border-turquoise hover:bg-turquoiseDark rounded-md py-2 w-44 mb-8"
                onClick={() => connectWallet()}
              >
                {owned ? "Mint" : "Connect Wallet"}
              </button>

              {chain && (
                <div className="text-white/75 flex flex-col md:block">
                  {buttonData.map(({ name, chain_id }) => (
                    <button
                      className={clsx(
                        "transition my-2 hover:text-turquoise md:mx-4 md:my-0",
                        {
                          "text-white/50 hover:text-white/50":
                            chain === chain_id,
                        }
                      )}
                      key={name}
                      onClick={async () => {
                        const newChain = (await wallet.switchChain(chain_id))
                          .chain;
                        setChain(newChain);
                        setOwned(
                          await checkIfOwned(account, tokenIds, newChain)
                        );
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

export default StarterPack;

export async function getStaticProps(): Promise<{ props: PageProps }> {
  const gql = await gqlApiSdk();
  const { puzzles } = await gql.StarterPackPuzzles();

  return {
    props: {
      puzzles,
    },
  };
}
