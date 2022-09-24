import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
// import { useMachine } from "@xstate/react";

import Wrapper from "@components/wrapper";
import KeysLink from "@components/keys-link";
import Puzzle from "@components/puzzle";
import Markdown from "@components/markdown";
import Seo from "@components/seo";
import TwitterShare from "@components/twitter-share";
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
  landingMessage?: string;
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
  landingMessage,
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
          <div className="pb-16 text-center text-lg text-gray-100 max-w-2xl mx-auto markdown landing-md">
            <Markdown>{landingMessage}</Markdown>
          </div>
        )}

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
      landing_message,
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
      landingMessage: landing_message || "",
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
