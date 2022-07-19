import { useState, useEffect } from "react";
import { NextPage } from "next";
import Head from "next/head";
import clsx from "clsx";

import ViewListIcon from "@heroicons/react/solid/ViewListIcon";
import ViewGridIcon from "@heroicons/react/solid/ViewGridIcon";

import { gqlApiSdk } from "@lib/server";
import { PublicPuzzlesQuery } from "@lib/generated/graphql";
import Wrapper from "@components/wrapper";
import Header from "@components/header";
import Footer from "@components/footer";
import PuzzleThumbnail from "@components/puzzle-thumbnail";

interface PageProps {
  puzzles: PublicPuzzlesQuery["puzzles"];
}

const Puzzles: NextPage<PageProps> = ({ puzzles }) => {
  const [layout, setLayout] = useState<"grid" | "list" | "unknown">("unknown");

  useEffect(() => {
    const puzzlesLayout = window.localStorage.getItem("puzzlesLayout");
    setLayout(puzzlesLayout ? JSON.parse(puzzlesLayout) : "grid");
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
              <button
                onClick={() => setView("grid")}
                aria-label="set grid view"
                className={clsx(
                  "border mr-2 bg-white/10 p-2 rounded-md transition-all duration-200",
                  layout === "grid"
                    ? "border-white/20"
                    : "border-transparent text-gray-400"
                )}
              >
                <ViewGridIcon className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                onClick={() => setView("list")}
                aria-label="set list view"
                className={clsx(
                  "border mt-8 bg-white/10 p-2 rounded-md transition-all duration-200	",
                  layout === "list"
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
            </>
          )}
        </div>

        <Footer />
      </div>
    </Wrapper>
  );
};
export default Puzzles;

export async function getStaticProps(): Promise<{ props: PageProps }> {
  const gql = await gqlApiSdk();
  const { puzzles } = await gql.PublicPuzzles();

  return {
    props: {
      puzzles,
    },
  };
}
