import type { NextPage } from "next";
import dynamic from 'next/dynamic'
import Head from "next/head";
import Image from "next/image";

import Wrapper from "@components/wrapper";
import NavAvalanche from "@components/nav-avalanche";
import Puzzle from "@components/puzzle";

const DevPuzzle = dynamic(() => import('@components/puzzles/dev'));

import { PuzzlePageProps } from "@lib/types";
import { gqlApiSdk } from "@lib/server";

interface PuzzleParams {
  params: {
    landing: string;
  }
}

const Dev: NextPage<PuzzlePageProps> = ({ name, count, puzzleId, input_type }) => {
  return (
    <Wrapper>
      <div className="ik-page scanlines">
        <div className="container px-4 flex flex-col items-center justify-center min-h-screen">
          <Head>
            <title>Infinity Keys</title>
          </Head>

          <main className="text-center pt-5">
            <Image
              src="/logo.svg"
              alt="Infinity Keys logo"
              width={100}
              height={62.72}
            />
            <DevPuzzle val={puzzleId} />
            <p className="py-16 text-center text-lg text-gray-100">Dev only</p>

            {name === 'landing' && <p className="py-16 text-center text-lg text-gray-100">
              Infinity Keys is a treasure hunt platform. <br />
              Find the clues, submit the passcode, unlock the treasure. <br />
              Play the game and join our early community.
            </p>}

            <Puzzle count={count} puzzleUri={puzzleId} boxes={input_type === 'boxes'} />
          </main>

          <footer className="ik-front-bottom w-full">
            <NavAvalanche showAvalanche={false} />
          </footer>
        </div>
      </div>
    </Wrapper>
  );
};

export default Dev;

export async function getStaticProps({ params: { landing } }: PuzzleParams): Promise<{ props: PuzzlePageProps }> {
  const gql = await gqlApiSdk();

  const { puzzles } = await gql.PuzzleInfoByLanding({ landing });
  const [{ simple_name, solution_char_count, puzzle_id, input_type }] = puzzles;

  return {
    props: {
      name: simple_name,
      count: solution_char_count || 0,
      puzzleId: puzzle_id,
      input_type: input_type || "boxes",
    },
  };
}

export async function getStaticPaths() {
  const gql = await gqlApiSdk();
  const { puzzles } = await gql.AllLandingRoutes();

  // https://nextjs.org/docs/api-reference/data-fetching/get-static-paths
  const paths = puzzles.map(p => ({
    params: {
      landing: p.landing_route
    }
  }))

  return {
    paths,
    fallback: false,
  }
}
