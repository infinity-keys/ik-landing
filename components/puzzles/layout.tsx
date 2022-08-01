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
import { PageProps } from "pages/puzzles/[[...puzzlesArgs]]";

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
  const [count, page] = query.puzzlesArgs || [smallestPuzzleCount, "1"];
  const puzzlesCount = toNumber(count);
  const pageNum = toNumber(page);

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
        <>
          <LayoutButtons
            isGrid={layout === PuzzleLayoutType.Grid}
            puzzlesCount={puzzlesCount}
            setView={setView}
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
            {puzzles.map(({ puzzle_id, landing_route, simple_name }) => (
              <li key={puzzle_id}>
                <PuzzleThumbnail
                  isGrid={layout === PuzzleLayoutType.Grid}
                  {...{ puzzle_id, landing_route, simple_name }}
                />
              </li>
            ))}
          </ul>

          <PuzzlesPagination
            isFirstPage={isFirstPage}
            isLastPage={isLastPage}
            pageNum={pageNum}
            puzzlesCount={puzzlesCount}
          />
        </>
      )}
    </Wrapper>
  );
};
export default PuzzlesLayout;
