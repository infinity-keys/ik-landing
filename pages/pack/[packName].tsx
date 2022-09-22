import { NextPage } from "next";
import clsx from "clsx";
import isNumber from "lodash/isNumber";

import Wrapper from "@components/wrapper";
import Thumbnail from "@components/thumbnail";
import TwitterSvg from "@components/svg/twitter-svg";
import Discord from "@components/svg/discord-svg";

import { gqlApiSdk } from "@lib/server";
import { GetPuzzlesByPackQuery } from "@lib/generated/graphql";
import { ThumbnailGridLayoutType } from "@lib/types";
import useCurrentWidth from "@hooks/useCurrentWidth";

import Minter from "@components/minter";
import { thumbnailData } from "@lib/utils";
import Seo from "@components/seo";
import { cloudinaryUrl } from "@lib/images";
import { useRouter } from "next/router";

interface PageProps {
  puzzles: GetPuzzlesByPackQuery["puzzles"];
  puzzlesNftIds: number[];
  pack: {
    name: string;
    nftId?: number;
    cloudinaryId?: string;
  };
}

interface PageParams {
  params: {
    packName: string;
  };
}

const PacksPage: NextPage<PageProps> = ({ puzzles, puzzlesNftIds, pack }) => {
  const { asPath } = useRouter();

  const gatedIds = puzzlesNftIds;
  const tokenId = pack.nftId;

  if (!tokenId) throw new Error("Invalid token id.");

  const width = useCurrentWidth();
  const layout =
    width < 640 ? ThumbnailGridLayoutType.List : ThumbnailGridLayoutType.Grid;

  return (
    <Wrapper>
      <Seo
        title={`${pack.name} | IK Pack`}
        imageUrl={
          pack.cloudinaryId && cloudinaryUrl(pack.cloudinaryId, 500, 500, false)
        }
        url={asPath}
      />

      <div className="max-w-3xl items-center text-center">
        <p className="mt-10 sm:mt-14">
          To be eligible to claim the {pack.name} Achievement you must
          successfully complete the following puzzles and claim the
          corresponding achievement NFT. All the NFTs must be claimed on the
          same chain to qualify.
        </p>

        <div className={clsx({ "opacity-0": width === 0 })}>
          <ul
            role="list"
            className={clsx(
              "grid grid-cols-1 gap-6 py-8 max-w-sm mx-auto sm:max-w-none sm:grid-cols-3 sm:mt-6 my-10"
            )}
          >
            {puzzles.map((puzzle) => {
              const data = thumbnailData(puzzle);
              return (
                <li key={data.id}>
                  <Thumbnail
                    isGrid={layout === ThumbnailGridLayoutType.Grid}
                    id={data.id}
                    name={data.name}
                    url={data.url}
                    cloudinary_id={data.cloudinary_id}
                  />
                </li>
              );
            })}
          </ul>

          <Minter tokenId={tokenId} gatedIds={gatedIds} />
        </div>
        <div className="w-full p-6 flex flex-row items-center justify-center">
          <div className="p-4">
            <div className="w-20 twitterIcon hover: fill-twitterBlue">
              <a
                href="https://twitter.com/InfinityKeys"
                className="flex w-full"
                rel="noopener noreferrer"
                target="_blank"
              >
                <TwitterSvg />
              </a>
            </div>
          </div>
          <div className="p-4">
            <div className="discordIcon w-20 hover: fill-discordPurple">
              <a
                href="https://discord.com/invite/infinitykeys"
                className="flex w-full"
                rel="noopener noreferrer"
                target="_blank"
              >
                <Discord width={96} height={96} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default PacksPage;

export async function getStaticPaths() {
  const gql = await gqlApiSdk();
  const { packs } = await gql.AllPacksRoutes();

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
      pack: {
        name: pack[0].pack_name,
        nftId: pack[0].nftId,
        cloudinaryId: pack[0]?.cloudinary_id || "",
      },
    },
  };
}
