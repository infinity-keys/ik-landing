import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
// import { useMachine } from "@xstate/react";

import Wrapper from "@components/wrapper";
import NavAvalanche from "@components/nav-avalanche";
import Puzzle from "@components/puzzle";
import Markdown from "@components/markdown";
// import { puzzleMachine } from "@components/puzzle.xstate";

import { gqlApiSdk } from "@lib/server";
import { Puzzle_Input_Type_Enum } from "@lib/generated/graphql";
import Heading from "@components/heading";

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
  };
}

const Dev: NextPage<PuzzlePageProps> = ({
  name,
  count,
  puzzleId,
  inputType,
  landingMessage,
  failMessage,
}) => {
  return (
    <Wrapper>
      <Head>
        <title>Infinity Keys</title>
      </Head>

      <main className="text-center pt-5">
        <div className="pb-16">
          <Link href={"/"}>
            <a>
              <Image
                priority={true}
                src="/logo.svg"
                alt="Infinity Keys logo"
                width={100}
                height={62.72}
              />
            </a>
          </Link>
        </div>

        <div className="flex">
          {landingMessage && (
            <div className="pb-8 text-left text-lg text-gray-100 max-w-2xl mx-auto markdown landing-md mr-12">
              <Heading as="h2">Instructions</Heading>
              <Markdown>{landingMessage}</Markdown>
            </div>
          )}

          {landingMessage && (
            <div className="pb-16 text-left text-lg text-gray-100 max-w-2xl mx-auto markdown landing-md">
              <Heading as="h2">Challenge</Heading>
              <Markdown>{landingMessage}</Markdown>
            </div>
          )}
        </div>

        <Puzzle
          count={count}
          puzzleId={puzzleId}
          boxes={inputType === "boxes"}
          failMessage={failMessage}
        />
      </main>

      <NavAvalanche showAvalanche={false} />
    </Wrapper>
  );
};

export default Dev;

export async function getStaticProps({
  params: { landing },
}: PuzzlePageParams): Promise<{ props: PuzzlePageProps }> {
  const gql = await gqlApiSdk();

  const { puzzles } = await gql.PuzzleInfoByLanding({ landing });
  const [
    {
      simple_name,
      solution_char_count,
      puzzle_id,
      input_type,
      landing_message,
      fail_message,
    },
  ] = puzzles;

  return {
    props: {
      name: simple_name,
      count: solution_char_count || 0,
      puzzleId: puzzle_id,
      inputType: input_type || Puzzle_Input_Type_Enum.Boxes,
      landingMessage: landing_message || "",
      failMessage: fail_message || "",
    },
  };
}

export async function getStaticPaths() {
  const gql = await gqlApiSdk();
  const { puzzles } = await gql.AllLandingRoutes();

  // https://nextjs.org/docs/api-reference/data-fetching/get-static-paths
  const paths = puzzles.map((p) => ({
    params: {
      landing: p.landing_route,
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

// debug again
