import Link from "next/link";
import clsx from "clsx";

import { ArrowSmLeftIcon, ArrowSmRightIcon } from "@heroicons/react/solid";

export interface PuzzlesPaginationProps {
  isFirstPage: Boolean;
  isLastPage: Boolean;
  puzzlesCount: number;
  pageNum: number;
}

const PuzzlesPagination = ({
  isFirstPage,
  isLastPage,
  puzzlesCount,
  pageNum,
}: PuzzlesPaginationProps) => {
  return (
    <div
      className={clsx(
        "flex mb-8",
        isFirstPage && !isLastPage ? "justify-end" : "justify-between"
      )}
    >
      {!isFirstPage && (
        <Link href={`/puzzles/${puzzlesCount}/${pageNum - 1}`}>
          <a className="flex items-center bg-white/10 p-2 rounded-md px-4 py-2 hover:bg-white/20 transition">
            <ArrowSmLeftIcon className="h-4 w-4 mr-2" aria-hidden="true" />{" "}
            Previous
          </a>
        </Link>
      )}

      {!isLastPage && (
        <Link href={`/puzzles/${puzzlesCount}/${pageNum + 1}`}>
          <a className="flex items-center bg-white/10 p-2 rounded-md px-4 py-2 hover:bg-white/20 transition">
            Next
            <ArrowSmRightIcon className="h-4 w-4 ml-2" aria-hidden="true" />
          </a>
        </Link>
      )}
    </div>
  );
};

export default PuzzlesPagination;
