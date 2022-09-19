import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
// import { useMachine } from "@xstate/react";

import Wrapper from "@components/wrapper";
import KeysLink from "@components/keys-link";
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
  challenge?: string;
  instructions?: string;
  failMessage?: string;
}
interface PuzzlePageParams {
  params: {
    landing: string;
  };
}

// TODO: remove this when columns are updated
const testIns =
  "* Solve the riddle to find the passcode.\n* Enter the passcode to pass the challenge.\n* Passcodes are letters, numbers, or a combination (no spaces or special characters)";

const testCha =
  "Clue: The clue is in the talk, the key is in the game.  \n[Designing NFT Treasure Hunts: Infinity Keys GameFi Presents at Metafest 2](https://www.youtube.com/embed/HBYE1Aysc6I)";

const Dev: NextPage<PuzzlePageProps> = ({
  name,
  count,
  puzzleId,
  inputType,
  challenge,
  instructions,
  failMessage,
}) => {
  return (
    <Wrapper>
      <Head>
        <title>Infinity Keys</title>
      </Head>

      <main className="text-center pt-5">
        <div className="my-16">
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

        <div className="mb-16">
          {instructions && (
            <div className="mb-12 w-full max-w-2xl mx-auto markdown landing-md">
              <Heading as="h2">Instructions</Heading>
              <Markdown>{testIns}</Markdown>
            </div>
          )}

          {challenge && (
            <div className=" w-full max-w-2xl mx-auto markdown landing-md">
              <Heading as="h2">Challenge</Heading>
              <Markdown>{testCha}</Markdown>
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

      <KeysLink />
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
      challenge,
      instructions,
      fail_message,
    },
  ] = puzzles;

  return {
    props: {
      name: simple_name,
      count: solution_char_count || 0,
      puzzleId: puzzle_id,
      inputType: input_type || Puzzle_Input_Type_Enum.Boxes,
      challenge: challenge || "",
      instructions: instructions || "",
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
