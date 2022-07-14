import { useState, useEffect } from "react";
import { NextPage } from "next";
import Head from "next/head";
import clsx from "clsx";
import {
  ViewListIcon,
  ViewGridIcon,
  ArrowSmLeftIcon,
  ArrowSmRightIcon,
} from "@heroicons/react/solid";

import { PublicPuzzlesQuery } from "@lib/generated/graphql";
import Wrapper from "@components/wrapper";
import Header from "@components/header";
import Footer from "@components/footer";
import PuzzleThumbnail from "@components/puzzle-thumbnail";

interface PageProps {
  puzzles: PublicPuzzlesQuery["puzzles"];
}

const PuzzlesLayout: NextPage<PageProps> = ({ puzzles }) => {
  const [isGrid, setIsGrid] = useState<boolean | null>(null);

  useEffect(() => {
    const puzzlesView = window.localStorage.getItem("puzzlesView");
    setIsGrid(puzzlesView !== null ? JSON.parse(puzzlesView) : true);
  }, []);

  const setView = ({ gridView }: { gridView: boolean }) => {
    setIsGrid(gridView);
    window.localStorage.setItem("puzzlesView", JSON.stringify(gridView));
  };

  return (
    <Wrapper>
      <Head>
        <title>Infinity Keys Puzzles</title>
      </Head>
      <div className="radial-bg scanlines min-h-screen flex flex-col">
        <Header />

        <div className="px-4 flex-1 container">
          {isGrid !== null && (
            <>
              <button
                onClick={() => setView({ gridView: true })}
                aria-label="set grid view"
                className={clsx(
                  "border mr-2 bg-white/10 p-2 rounded-md transition-all duration-200",
                  isGrid
                    ? "border-white/20"
                    : "border-transparent text-gray-400"
                )}
              >
                <ViewGridIcon className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                onClick={() => setView({ gridView: false })}
                aria-label="set list view"
                className={clsx(
                  "border mt-8 bg-white/10 p-2 rounded-md transition-all duration-200	",
                  !isGrid
                    ? "border-white/20"
                    : "border-transparent text-gray-400"
                )}
              >
                <ViewListIcon className="h-5 w-5" aria-hidden="true" />
              </button>

              <ul
                role="list"
                className={clsx(
                  "grid grid-cols-1 gap-6 py-8 sm:grid-cols-2",
                  isGrid
                    ? "md:grid-cols-3 lg:grid-cols-4"
                    : "lg:grid-cols-3 xl:grid-cols-4"
                )}
              >
                {puzzles.map(({ puzzle_id, landing_route, simple_name }) => (
                  <li key={puzzle_id} className="">
                    <PuzzleThumbnail
                      isGrid={isGrid}
                      {...{ puzzle_id, landing_route, simple_name }}
                    />
                  </li>
                ))}
              </ul>
              <div className="flex justify-between mb-8">
                <button className="flex items-center bg-white/10 p-2 rounded-md px-4 py-2 hover:bg-white/20 transition">
                  <ArrowSmLeftIcon
                    className="h-4 w-4 mr-2"
                    aria-hidden="true"
                  />{" "}
                  Previous
                </button>
                <button className="flex items-center bg-white/10 p-2 rounded-md px-4 py-2 hover:bg-white/20 hover:text transition ">
                  Next
                  <ArrowSmRightIcon
                    className="h-4 w-4 ml-2"
                    aria-hidden="true"
                  />
                </button>
              </div>
            </>
          )}
        </div>

        <Footer />
      </div>
    </Wrapper>
  );
};
export default PuzzlesLayout;
