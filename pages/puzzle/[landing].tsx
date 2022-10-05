import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
// import { useMachine } from "@xstate/react";
import { Disclosure } from "@headlessui/react";

import Wrapper from "@components/wrapper";
import KeysLink from "@components/keys-link";
import Puzzle from "@components/puzzle";
import Markdown from "@components/markdown";
import Seo from "@components/seo";
import TwitterShare from "@components/twitter-share";
import Heading from "@components/heading";
// import { puzzleMachine } from "@components/puzzle.xstate";

import { gqlApiSdk } from "@lib/server";
import { Puzzle_Input_Type_Enum } from "@lib/generated/graphql";
import { buildUrlString } from "@lib/utils";
import { cloudinaryUrl } from "@lib/images";

export interface PuzzlePageProps {
  name: string;
  count: number;
  puzzleId: string;
  inputType?: Puzzle_Input_Type_Enum;
  challenge?: string;
  instructions?: string;
  failMessage?: string;
  cloudinaryId?: string;
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
  challenge,
  instructions,
  failMessage,
  cloudinaryId,
}) => {
  const { asPath } = useRouter();

  return (
    <Wrapper>
      <Seo
        title={`${name} | IK Puzzle`}
        description={`Can you unlock the ${name} puzzle?`}
        imageUrl={cloudinaryId && cloudinaryUrl(cloudinaryId, 500, 500, false)}
        url={asPath}
      />

      <main className="text-center pt-10 md:pt-20 w-full">
        <div className="max-w-prose mx-auto bg-black/10 p-4 mb-12 rounded-md">
          {instructions && (
            <div className="flex-1 bg-white/5 rounded overflow-hidden">
              <Disclosure>
                <Disclosure.Button className="p-2 w-full transition hover:bg-turquoise/50">
                  <Heading visual="s" as="h2">
                    View Instructions
                  </Heading>
                </Disclosure.Button>
                <Disclosure.Panel className="border-t border-t-white/10 px-2">
                  <div className="markdown landing-md text-left px-4 pb-4 text-white/80">
                    <Markdown>{instructions}</Markdown>
                  </div>
                </Disclosure.Panel>
              </Disclosure>
            </div>
          )}
          {challenge && (
            <div className="flex-1 bg-white/5 mt-4 rounded overflow-hidden">
              <Disclosure>
                <Disclosure.Button className="p-2 w-full  transition hover:bg-turquoise/50">
                  <Heading as="h2" visual="s">
                    View Challenge
                  </Heading>
                </Disclosure.Button>

                <Disclosure.Panel className="border-t border-t-white/10 px-2">
                  <div className="markdown landing-md text-left px-4 pb-4 text-white/80">
                    <Markdown>{challenge}</Markdown>
                  </div>
                </Disclosure.Panel>
              </Disclosure>
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
      <div className="mb-9">
        <TwitterShare
          tweetBody={`Can you unlock the ${name} puzzle? @InfinityKeys\n\n${buildUrlString(
            asPath
          )}`}
        />
      </div>
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
      nft,
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
      cloudinaryId: nft?.nft_metadatum?.cloudinary_id || "",
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
