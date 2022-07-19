import { useState, useEffect } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";

import Head from "next/head";
import clsx from "clsx";

import Wrapper from "@components/wrapper";
import Header from "@components/header";
import Footer from "@components/footer";
import PuzzleThumbnail from "@components/puzzle-thumbnail";
import PuzzlesPagination from "@components/puzzles/pagination";
import LayoutButtons from "@components/puzzles/layout-buttons";

import { PageProps } from "pages/puzzles/[[...puzzlesArgs]]";

const PuzzlesLayout: NextPage<PageProps> = ({
  puzzles,
  isFirstPage,
  isLastPage,
}) => {
  const [layout, setLayout] = useState<"grid" | "list" | "unknown">("unknown");
  const { query } = useRouter();
  const [count, page] = query.puzzlesArgs || ["8", "1"];
  const puzzlesCount = parseInt(count);
  const pageNum = parseInt(page);

  useEffect(() => {
    const puzzlesLayout = window.localStorage.getItem("puzzlesLayout");
    setLayout(puzzlesLayout ? JSON.parse(puzzlesLayout) : "list");
  }, []);

  const setView = (gridLayout: "grid" | "list") => {
    setLayout(gridLayout);
    window.localStorage.setItem("puzzlesLayout", JSON.stringify(gridLayout));
  };

  return (
    <Wrapper>
      <Head>
        <title>Infinity Keys Puzzles</title>
      </Head>
      <div className="radial-bg scanlines min-h-screen flex flex-col">
        <Header />

        <div className="px-4 flex-1 container">
          {layout !== "unknown" && (
            <>
              <LayoutButtons
                isGrid={layout === "grid"}
                puzzlesCount={puzzlesCount}
                setView={setView}
              />

              <ul
                role="list"
                className={clsx(
                  "grid grid-cols-1 gap-6 py-8 sm:grid-cols-2",
                  layout === "grid"
                    ? "md:grid-cols-3 lg:grid-cols-4"
                    : "lg:grid-cols-3 xl:grid-cols-4"
                )}
              >
                {puzzles.map(({ puzzle_id, landing_route, simple_name }) => (
                  <li key={puzzle_id} className="">
                    <PuzzleThumbnail
                      isGrid={layout === "grid"}
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
        </div>

        <Footer />
      </div>
    </Wrapper>
  );
};
export default PuzzlesLayout;
