import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";

import { PuzzlePageProps } from "@lib/types";

import Wrapper from "@components/wrapper";
import NavAvalanche from "@components/nav-avalanche";
import Puzzle from "@components/puzzle";
import { puzzleCount } from "@lib/fetchers";

const Home: NextPage<PuzzlePageProps> = ({ count, puzzleId }) => {
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
            <p className="py-16 text-center text-lg text-gray-100">
              Infinity Keys is a treasure hunt platform. <br />
              Find the clues, submit the passcode, unlock the treasure. <br />
              Play the game and join our early community.
            </p>
            <Puzzle count={count} puzzleUri={puzzleId} />
          </main>

          <footer className="ik-front-bottom w-full">
            <NavAvalanche showAvalanche={false} />
          </footer>
        </div>
      </div>
    </Wrapper>
  );
};

export default Home;

export async function getStaticProps(): Promise<{ props: PuzzlePageProps }> {
  const props = await puzzleCount({
    puzzleId: "396fc8dd-0ce1-4fcf-a6d0-e2071449e57a",
  });

  return {
    props,
  };
}
