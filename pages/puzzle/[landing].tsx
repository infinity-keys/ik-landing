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
// TODO: remove this before merge
const extext =
  "# Big Boy \n ## This is the heading \n \n **this is bold text** \n \n 1. first in ordered list. \n 2. second in ordered list. \n \n - first in ul \n - second in ul \n \n ### Little heading for babies \n \n lorem ipsum *pass the dip sum* plz [this is a link](https://yo.com) \n \n Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta nostrum at ab in. Consequatur, porro ad? Lorem ipsum dolor sit amet consectetur adipisicing elit. \n \n  #### who even uses h4s";

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

        {landingMessage && (
          <div className="pb-16 text-left text-lg text-gray-100 max-w-2xl mx-auto markdown">
            <Markdown>{extext}</Markdown>
          </div>
        )}

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
