import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";

import Wrapper from "@components/wrapper";
import NavAvalanche from "@components/nav-avalanche";
import Puzzle from "@components/puzzle";
import Markdown from '@components/markdown';

import { gqlApiSdk } from "@lib/server";
import { Puzzle_Input_Type_Enum } from "@lib/generated/graphql";

export interface PuzzlePageProps {
  name: string;
  count: number;
  puzzleId: string;
  inputType?: Puzzle_Input_Type_Enum;
  landingMessage?: string;
  failMessage?: string;
}
interface PuzzlePageParams {
  params: {
    landing: string;
  }
}

const Dev: NextPage<PuzzlePageProps> = ({ name, count, puzzleId, inputType, landingMessage, failMessage }) => {
  return (
    <Wrapper>
      <div className="ik-page scanlines">
        <div className="container px-4 flex flex-col items-center justify-center min-h-screen">
          <Head>
            <title>Infinity Keys</title>
          </Head>

          <main className="text-center pt-5">
            <div className="pb-16">
              <Image
                src="/logo.svg"
                alt="Infinity Keys logo"
                width={100}
                height={62.72}
              />
            </div>

            {landingMessage &&
              <div className="pb-16 text-center text-lg text-gray-100">
                <Markdown>{landingMessage}</Markdown>
              </div>
            }

            <Puzzle count={count} puzzleUri={puzzleId} boxes={inputType === 'boxes'} failMessage={failMessage} />
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

export async function getStaticProps({ params: { landing } }: PuzzlePageParams): Promise<{ props: PuzzlePageProps }> {
  const gql = await gqlApiSdk();

  const { puzzles } = await gql.PuzzleInfoByLanding({ landing });
  const [{ simple_name, solution_char_count, puzzle_id, input_type, landing_message, fail_message }] = puzzles;

  return {
    props: {
      name: simple_name,
      count: solution_char_count || 0,
      puzzleId: puzzle_id,
      inputType: input_type || Puzzle_Input_Type_Enum.Boxes,
      landingMessage: landing_message || '',
      failMessage: fail_message || '',
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
