import type { NextPage } from "next";
import { useRouter } from "next/router";
// import { useMachine } from "@xstate/react";

import Wrapper from "@components/wrapper";
import KeysLink from "@components/keys-link";
import Puzzle from "@components/puzzle";
import PuzzleLandingInfo from "@components/puzzle-landing-info";
import Seo from "@components/seo";
import TwitterShare from "@components/twitter-share";
// import { puzzleMachine } from "@components/puzzle.xstate";

import { gqlApiSdk } from "@lib/server";
import { Puzzle_Input_Type_Enum } from "@lib/generated/graphql";
import { buildUrlString } from "@lib/utils";
import { cloudinaryUrl } from "@lib/images";
import NftCheck from "@components/nft-check";

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
  finalStep: boolean;
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
  finalStep,
}) => {
  const { asPath } = useRouter();

  return (
    <Wrapper full customClasses={["puzzle", `puzzle--${name}`]}>
      <Seo
        title={`${name} | IK Puzzle`}
        description={`Can you unlock the ${name} puzzle?`}
        imageUrl={cloudinaryId && cloudinaryUrl(cloudinaryId, 500, 500, false)}
        url={asPath}
      />

      <main className="puzzle__main text-center pt-10 md:pt-20 w-full px-4">
        {nftCheckParameters ? (
          <NftCheck
            nftCheckParameters={nftCheckParameters}
            successRoute={successRoute}
            finalStep={finalStep}
          />
        ) : (
          <Puzzle
            count={count}
            puzzleId={puzzleId}
            boxes={inputType === "boxes"}
            failMessage={failMessage}
          />
        )}

        <div className="max-w-prose mx-auto bg-black/10 p-4 mt-12 md:mt-16 mb-12 rounded-md">
          {instructions && (
            <PuzzleLandingInfo title="Instructions" content={instructions} />
          )}

          {challenge && (
            <PuzzleLandingInfo
              title="Challenge"
              content={challenge}
              marginTop={!!instructions}
              defaultOpen
            />
          )}
        </div>
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
      final_step,
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
      nftCheckParameters: nft_check_parameters || null,
      successRoute: success_route || "",
      finalStep: final_step || false,
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
