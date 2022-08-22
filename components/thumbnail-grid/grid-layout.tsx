import { useState, useEffect } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";

import toNumber from "lodash/toNumber";
import clsx from "clsx";

import Thumbnail from "@components/thumbnail";
import Pagination from "@components/thumbnail-grid/pagination";
import LayoutButtons from "@components/thumbnail-grid/layout-buttons";
import { PAGINATION_COUNTS } from "@lib/constants";
import { ThumbnailLayoutType } from "@lib/types";
import { collectionBaseUrl, isTypePack, thumbnailData } from "@lib/utils";

import { GetAllPacksQuery, PublicPuzzlesQuery } from "@lib/generated/graphql";

export interface PageProps {
  thumbnailList: PublicPuzzlesQuery["puzzles"] | GetAllPacksQuery["packs"];
  isFirstPage: Boolean;
  isLastPage: Boolean;
}

const GridLayout: NextPage<PageProps> = ({
  thumbnailList,
  isFirstPage,
  isLastPage,
}) => {
  const [layout, setLayout] = useState<ThumbnailLayoutType>(
    ThumbnailLayoutType.Unknown
  );
  const [smallestThumbnailCount] = PAGINATION_COUNTS;
  const { query } = useRouter();
  const [count, page] = query.packsArgs ||
    query.puzzlesArgs || [smallestThumbnailCount, "1"];
  const thumbnailCount = toNumber(count);
  const pageNum = toNumber(page);
  const isPack = isTypePack(thumbnailList[0]);

  useEffect(() => {
    const thumbnailLayout = window.localStorage.getItem("thumbnailLayout");
    setLayout(
      thumbnailLayout ? JSON.parse(thumbnailLayout) : ThumbnailLayoutType.List
    );
  }, []);

  const setView = (gridLayout: ThumbnailLayoutType) => {
    setLayout(gridLayout);
    window.localStorage.setItem("thumbnailLayout", JSON.stringify(gridLayout));
  };

  return (
    <>
      {layout !== ThumbnailLayoutType.Unknown && (
        <div className="w-full">
          <LayoutButtons
            isGrid={layout === ThumbnailLayoutType.Grid}
            thumbnailCount={thumbnailCount}
            setView={setView}
            urlBase={collectionBaseUrl(isPack)}
          />

          <ul
            role="list"
            className={clsx(
              "grid grid-cols-1 gap-6 py-8 sm:grid-cols-2",
              layout === ThumbnailLayoutType.Grid
                ? "md:grid-cols-3 lg:grid-cols-4"
                : "lg:grid-cols-3 xl:grid-cols-4"
            )}
          >
            {thumbnailList.map((thumbnail) => {
              const data = thumbnailData(thumbnail);
              return (
                <li key={data.id}>
                  <Thumbnail
                    isGrid={layout === ThumbnailLayoutType.Grid}
                    id={data.id}
                    name={data.name}
                    url={data.url}
                    cloudinary_id={data.cloudinary_id}
                  />
                </li>
              );
            })}
          </ul>

          <Pagination
            isFirstPage={isFirstPage}
            isLastPage={isLastPage}
            pageNum={pageNum}
            thumbnailCount={thumbnailCount}
            urlBase={collectionBaseUrl(isPack)}
          />
        </div>
      )}
    </>
  );
};
export default GridLayout;
