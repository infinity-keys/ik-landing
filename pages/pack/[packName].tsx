import { NextPage } from "next";
import Head from "next/head";
import clsx from "clsx";
import isNumber from "lodash/isNumber";

import Wrapper from "@components/wrapper";
import PuzzleThumbnail from "@components/puzzle-thumbnail";

import { gqlApiSdk } from "@lib/server";
import { GetPuzzlesByPackQuery } from "@lib/generated/graphql";
import { PuzzleLayoutType } from "@lib/types";
import useCurrentWidth from "@hooks/useCurrentWidth";

import MintButton from "@components/mintButton";

interface PageProps {
  puzzles: GetPuzzlesByPackQuery["puzzles"];
  puzzlesNftIds: number[];
  pack: {
    pack_name: string;
    nftId?: number;
  };
}

interface PageParams {
  params: {
    packName: string;
  };
}

const PacksPage: NextPage<PageProps> = ({ puzzles, puzzlesNftIds, pack }) => {
  const gatedIds = puzzlesNftIds;
  const tokenId = pack.nftId;

  if (!tokenId) throw new Error("Invalid token id.");

  const width = useCurrentWidth();
  const layout = width < 640 ? PuzzleLayoutType.List : PuzzleLayoutType.Grid;

  return (
    <Wrapper>
      <Head>
        <title>{pack.pack_name}</title>
      </Head>

      <div className="max-w-3xl items-center text-center">
        <p className="mt-10 sm:mt-14">
          To be eligible to claim the {pack.pack_name} Achievement you must
          successfully complete the following puzzles and claim the
          corresponding achievement NFT. All three NFTs should be claimed on the
          same chain to qualify.
        </p>

        <div className={clsx({ "opacity-0": width === 0 })}>
          <ul
            role="list"
            className={clsx(
              "grid grid-cols-1 gap-6 py-8 max-w-sm mx-auto sm:max-w-none sm:grid-cols-3 sm:mt-6 my-10"
            )}
          >
            {puzzles.map(({ puzzle_id, landing_route, simple_name, nft }) => (
              <li key={puzzle_id}>
                <PuzzleThumbnail
                  isGrid={layout === PuzzleLayoutType.Grid}
                  {...{
                    puzzle_id,
                    landing_route,
                    simple_name,
                    cloudinary_id: nft?.nft_metadatum?.cloudinary_id || "",
                  }}
                />
              </li>
            ))}
          </ul>

          <MintButton tokenId={tokenId} gatedIds={gatedIds} />
        </div>
      </div>
    </Wrapper>
  );
};

export default PacksPage;

export async function getStaticPaths() {
  const gql = await gqlApiSdk();
  const { packs } = await gql.GetAllPacks();

  const paths = packs.map(({ simple_name }) => ({
    params: { packName: simple_name },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({
  params,
}: PageParams): Promise<{ props: PageProps }> {
  const { packName } = params;
  const gql = await gqlApiSdk();
  const { puzzles, pack } = await gql.GetPuzzlesByPack({ packName });
  const puzzlesNftIds = puzzles.map(({ nft }) => nft?.tokenId);

  if (!puzzlesNftIds.every(isNumber)) {
    throw new Error("Either no NFTs or NFT IDs are not numbers");
  }
  return {
    props: {
      puzzles,
      puzzlesNftIds,
      pack: pack[0],
    },
  };
}
