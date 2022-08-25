import Link from "next/link";
import clsx from "clsx";
import ArrowLeftIcon from "@heroicons/react/20/solid/ArrowLeftIcon";
import ArrowRightIcon from "@heroicons/react/20/solid/ArrowRightIcon";

import { PAGINATION_COUNTS } from "@lib/constants";

export interface PaginationProps {
  isFirstPage: Boolean;
  isLastPage: Boolean;
  thumbnailCount: number;
  pageNum: number;
  urlBase: string;
}

const Pagination = ({
  isFirstPage,
  isLastPage,
  thumbnailCount,
  pageNum,
  urlBase,
}: PaginationProps) => {
  const [smallestThumbnailCount] = PAGINATION_COUNTS;
  const toDefaultPage =
    thumbnailCount === smallestThumbnailCount && pageNum === 2;

  return (
    <div
      className={clsx(
        "flex mb-8",
        isFirstPage && !isLastPage ? "justify-end" : "justify-between"
      )}
    >
      {!isFirstPage && (
        <Link
          href={
            toDefaultPage
              ? urlBase
              : `${urlBase}/${thumbnailCount}/${pageNum - 1}`
          }
        >
          <a className="previous flex items-center bg-white/10 p-2 rounded-md px-4 py-2 hover:bg-white/20 transition">
            <ArrowLeftIcon className="h-4 w-4 mr-2" aria-hidden="true" />{" "}
            Previous
          </a>
        </Link>
      )}

      {!isLastPage && (
        <Link href={`${urlBase}/${thumbnailCount}/${pageNum + 1}`}>
          <a className="next flex items-center bg-white/10 p-2 rounded-md px-4 py-2 hover:bg-white/20 transition">
            Next
            <ArrowRightIcon className="h-4 w-4 ml-2" aria-hidden="true" />
          </a>
        </Link>
      )}
    </div>
  );
};

export default Pagination;
