import { useState, useEffect } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";

import toNumber from "lodash/toNumber";
import clsx from "clsx";

import Thumbnail from "@components/thumbnail";
import Pagination from "@components/thumbnail-grid/pagination";
import LayoutButtons from "@components/thumbnail-grid/layout-buttons";
import { PAGINATION_COUNTS } from "@lib/constants";
import { ThumbnailGridLayoutType } from "@lib/types";
import { FormattedThumbnailType } from "@lib/utils";

export interface PageProps {
  thumbnailList: FormattedThumbnailType[];
  isFirstPage: boolean;
  isLastPage: boolean;
  noDropdown?: boolean;
  urlBase?: string;
}

const GridLayout: NextPage<PageProps> = ({
  thumbnailList,
  isFirstPage,
  isLastPage,
  urlBase,
  noDropdown = false,
}) => {
  const [layout, setLayout] = useState<ThumbnailGridLayoutType>(
    ThumbnailGridLayoutType.Unknown
  );
  const [smallestThumbnailCount] = PAGINATION_COUNTS;
  const { query } = useRouter();
  const [count, page] = query.packsArgs ||
    query.puzzlesArgs || [smallestThumbnailCount, "1"];
  const thumbnailCount = toNumber(count);
  const pageNum = toNumber(page);

  useEffect(() => {
    const thumbnailGridLayout = window.localStorage.getItem(
      "thumbnailGridLayout"
    );
    setLayout(
      thumbnailGridLayout
        ? JSON.parse(thumbnailGridLayout)
        : ThumbnailGridLayoutType.List
    );
  }, []);

  const setView = (gridLayout: ThumbnailGridLayoutType) => {
    setLayout(gridLayout);
    window.localStorage.setItem(
      "thumbnailGridLayout",
      JSON.stringify(gridLayout)
    );
  };

  return (
    <>
      {layout !== ThumbnailGridLayoutType.Unknown && (
        <div className="w-full">
          <LayoutButtons
            isGrid={layout === ThumbnailGridLayoutType.Grid}
            thumbnailCount={thumbnailCount}
            setView={setView}
            urlBase={urlBase}
            noDropdown={noDropdown}
          />

          <ul
            role="list"
            className={clsx(
              "grid grid-cols-1 gap-6 py-8 sm:grid-cols-2",
              layout === ThumbnailGridLayoutType.Grid
                ? "md:grid-cols-3 lg:grid-cols-4"
                : "lg:grid-cols-3 xl:grid-cols-4"
            )}
          >
            {thumbnailList.map((thumbnail) => {
              return (
                <li key={thumbnail.id}>
                  <Thumbnail
                    isGrid={layout === ThumbnailGridLayoutType.Grid}
                    id={thumbnail.id}
                    name={thumbnail.name}
                    url={thumbnail.url}
                    cloudinary_id={thumbnail.cloudinary_id}
                  />
                </li>
              );
            })}
          </ul>

          {!noDropdown && urlBase && (
            <Pagination
              isFirstPage={isFirstPage}
              isLastPage={isLastPage}
              pageNum={pageNum}
              thumbnailCount={thumbnailCount}
              urlBase={urlBase}
            />
          )}
        </div>
      )}
    </>
  );
};
export default GridLayout;
