import type { NextPage } from "next";
import { useRouter } from "next/router";
// import { useMachine } from "@xstate/react";

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
  nftCheckParameters?: any;
  successRoute: string;
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
  nftCheckParameters,
  successRoute,
}) => {
  const { asPath } = useRouter();

  return (
    <Wrapper full>
      <Seo
        title={`${name} | IK Puzzle`}
        description={`Can you unlock the ${name} puzzle?`}
        imageUrl={cloudinaryId && cloudinaryUrl(cloudinaryId, 500, 500, false)}
        url={asPath}
      />

      <main className="text-center pt-10 md:pt-20 px-4">
        <div className="mb-16">
          {instructions && (
            <div className="mb-12 w-full max-w-2xl mx-auto markdown landing-md">
              <Heading as="h2">Instructions</Heading>
              <Markdown>{instructions}</Markdown>
            </div>
          )}

          {challenge && (
            <div className=" w-full max-w-2xl mx-auto markdown landing-md">
              <Heading as="h2">Challenge</Heading>
              <Markdown>{challenge}</Markdown>
            </div>
          )}
        </div>

        <Puzzle
          count={count}
          puzzleId={puzzleId}
          boxes={inputType === "boxes"}
          failMessage={failMessage}
          nftCheckParameters={nftCheckParameters}
          successRoute={successRoute}
        />
      </main>

      <KeysLink />
      <div className="mb-9 px-4">
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
      nft_check_parameters,
      success_route,
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
      nftCheckParameters: nft_check_parameters || undefined,
      successRoute: success_route || "",
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
