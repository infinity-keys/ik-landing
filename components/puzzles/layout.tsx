import { useState, useEffect } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import Head from "next/head";

import toNumber from "lodash/toNumber";
import clsx from "clsx";

import Wrapper from "@components/wrapper";
import PuzzleThumbnail from "@components/puzzle-thumbnail";
import PuzzlesPagination from "@components/puzzles/pagination";
import LayoutButtons from "@components/puzzles/layout-buttons";
import { PAGINATION_COUNTS } from "@lib/constants";
import { PuzzleLayoutType } from "@lib/types";
import { collectionBaseUrl, isTypePack, thumbnailData } from "@lib/utils";

import { GetAllPacksQuery, PublicPuzzlesQuery } from "@lib/generated/graphql";

export interface PageProps {
  // @TODO: this isn't typed right. also fix it in utils
  puzzles: PublicPuzzlesQuery["puzzles"] | GetAllPacksQuery["packs"];
  isFirstPage: Boolean;
  isLastPage: Boolean;
}

const PuzzlesLayout: NextPage<PageProps> = ({
  puzzles,
  isFirstPage,
  isLastPage,
}) => {
  const [layout, setLayout] = useState<PuzzleLayoutType>(
    PuzzleLayoutType.Unknown
  );
  const [smallestPuzzleCount] = PAGINATION_COUNTS;
  const { query } = useRouter();
  const [count, page] = query.packsArgs || [smallestPuzzleCount, "1"];
  const puzzlesCount = toNumber(count);
  const pageNum = toNumber(page);
  const isPack = isTypePack(puzzles[0]);

  useEffect(() => {
    const puzzlesLayout = window.localStorage.getItem("puzzlesLayout");
    setLayout(
      puzzlesLayout ? JSON.parse(puzzlesLayout) : PuzzleLayoutType.List
    );
  }, []);

  const setView = (gridLayout: PuzzleLayoutType) => {
    setLayout(gridLayout);
    window.localStorage.setItem("puzzlesLayout", JSON.stringify(gridLayout));
  };

  return (
    <Wrapper>
      <Head>
        <title>Infinity Keys Puzzles</title>
      </Head>

      {layout !== PuzzleLayoutType.Unknown && (
        <div className="w-full">
          <LayoutButtons
            isGrid={layout === PuzzleLayoutType.Grid}
            puzzlesCount={puzzlesCount}
            setView={setView}
            urlBase={collectionBaseUrl(isPack)}
          />

          <ul
            role="list"
            className={clsx(
              "grid grid-cols-1 gap-6 py-8 sm:grid-cols-2",
              layout === PuzzleLayoutType.Grid
                ? "md:grid-cols-3 lg:grid-cols-4"
                : "lg:grid-cols-3 xl:grid-cols-4"
            )}
          >
            {puzzles.map((puzzle) => {
              const data = thumbnailData(puzzle);
              return (
                <li key={data.id}>
                  <PuzzleThumbnail
                    isGrid={layout === PuzzleLayoutType.Grid}
                    id={data.id}
                    name={data.name}
                    url={data.url}
                    cloudinary_id={data.cloudinary_id}
                  />
                </li>
              );
            })}
          </ul>

          <PuzzlesPagination
            isFirstPage={isFirstPage}
            isLastPage={isLastPage}
            pageNum={pageNum}
            puzzlesCount={puzzlesCount}
            urlBase={collectionBaseUrl(isPack)}
          />
        </div>
      )}
    </Wrapper>
  );
};
export default PuzzlesLayout;
