import { useState } from "react";
import { NextPage } from "next";
import clsx from "clsx";
import isNumber from "lodash/isNumber";
import { useRouter } from "next/router";

import Wrapper from "@components/wrapper";
import Thumbnail from "@components/thumbnail";
import LensShare from "@components/lens-share";
import Minter from "@components/minter";
import Seo from "@components/seo";
import TwitterShare from "@components/twitter-share";

import { gqlApiSdk } from "@lib/server";
import { GetPuzzlesByPackQuery } from "@lib/generated/graphql";
import { ThumbnailGridLayoutType, ThumbnailProgress } from "@lib/types";
import { buildUrlString, thumbnailData } from "@lib/utils";
import { cloudinaryUrl } from "@lib/images";

import useCurrentWidth from "@hooks/useCurrentWidth";

interface PageProps {
  puzzles: GetPuzzlesByPackQuery["puzzles"];
  puzzlesNftIds: number[];
  pack: {
    simpleName: string;
    name: string;
    nftId?: number;
    cloudinaryId?: string;
    packSuccessMessage?: string;
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
  const [completed, setCompleted] = useState([] as boolean[]);
  const [hasChecked, setHasChecked] = useState(false);

  if (!tokenId) throw new Error("Invalid token id.");
  const width = useCurrentWidth();
  const layout =
    width < 640 ? ThumbnailGridLayoutType.List : ThumbnailGridLayoutType.Grid;

  return (
    <Wrapper customClasses={["pack", `pack--${pack.simpleName}`]}>
      <Seo
        title={`${pack.name} | IK Pack`}
        imageUrl={
          pack.cloudinaryId && cloudinaryUrl(pack.cloudinaryId, 500, 500, false)
        }
        url={asPath}
      />

      <div className="pack__main max-w-3xl items-center text-center">
        <div className="pack__image-anchor"></div>
        <p className="pack__text mt-10 sm:mt-14">
          To be eligible to claim the {pack.name} Achievement you must
          successfully complete the following puzzles and claim the
          corresponding achievement NFT. All the NFTs must be claimed on the
          same chain to qualify.
        </p>

        <div className={clsx({ "opacity-0": width === 0 })}>
          <ul
            role="list"
            className={clsx(
              "grid grid-cols-1 gap-6 py-8 max-w-sm mx-auto sm:mt-6 my-10",
              puzzles.length === 2
                ? "sm:max-w-xl sm:grid-cols-2"
                : "sm:max-w-none sm:grid-cols-3"
            )}
          >
            {puzzles.map((puzzle, index) => {
              const data = thumbnailData(puzzle);
              return (
                <li key={data.id}>
                  <Thumbnail
                    isGrid={layout === ThumbnailGridLayoutType.Grid}
                    id={data.id}
                    name={data.name}
                    url={data.url}
                    cloudinary_id={data.cloudinary_id}
                    progress={
                      hasChecked && completed[index]
                        ? ThumbnailProgress.Completed
                        : ThumbnailProgress.NotCompleted
                    }
                  />
                </li>
              );
            })}
          </ul>

          <Minter
            tokenId={tokenId}
            gatedIds={gatedIds}
            nftWalletAgeCheck={false}
            setCompleted={setCompleted}
            hasChecked={hasChecked}
            setHasChecked={setHasChecked}
            packSuccessMessage={pack.packSuccessMessage}
          />
        </div>
        <div className="pt-2 pb-8 flex justify-center gap-4">
          <LensShare
            postBody={`Collect the ${pack.name}.`}
            url={buildUrlString(asPath)}
          />
          <TwitterShare
            tweetBody={`Collect the ${
              pack.name
            }. @InfinityKeys\n\n${buildUrlString(asPath)}`}
          />
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
  const puzzlesNftIds = puzzles.flatMap(({ nft }) => nft?.tokenId || []);

  return {
    props: {
      puzzles,
      puzzlesNftIds: puzzlesNftIds,
      pack: {
        simpleName: packName,
        packSuccessMessage: pack[0].pack_success_message || "",
        name: pack[0].pack_name,
        nftId: pack[0].nftId,
        cloudinaryId: pack[0]?.cloudinary_id || "",
      },
    },
  };
}
