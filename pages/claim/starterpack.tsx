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
import useCurrentWidth from "@hooks/useCurrentWidth";

interface PageProps {
  puzzles: StarterPackPuzzlesQuery["puzzles"];
}

const buttonData = [
  {
    // chain_id: ETH_CHAIN_ID,
    name: "Ethereum",
  },
  {
    // chain_id: AVAX_CHAIN_ID,
    name: "Avalanche",
  },
  {
    // chain_id: POLYGON_CHAIN_ID,
    name: "Polygon",
  },
];

const StarterPack: NextPage<PageProps> = ({ puzzles }) => {
  const width = useCurrentWidth();
  const layout = width < 640 ? PuzzleLayoutType.List : PuzzleLayoutType.Grid;

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
            <button className="text-sm text-blue font-bold bg-turquoise border-solid border-2 border-turquoise hover:bg-turquoiseDark rounded-md py-2 w-44 mb-8">
              Check Wallet
            </button>

            <div className="text-white/75 flex flex-col md:block">
              {buttonData.map(({ name }) => (
                <button
                  className="transition my-2 hover:text-turquoise md:mx-4 md:my-0"
                  key={name}
                >
                  Switch to {name}
                </button>
              ))}
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
