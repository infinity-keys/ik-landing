import { useState } from "react";
import { NextPage } from "next";
import Head from "next/head";
import clsx from "clsx";
// import { MailIcon, PhoneIcon } from '@heroicons/react/solid'

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
  const [isGrid, setIsGrid] = useState(true);
  const gridlist =
    "grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 py-8";
  const gridlistitem = "col-span-1 divide-y divide-gray-200";

  return (
    <Wrapper>
      <Head>
        <title>Infinity Keys Puzzles</title>
      </Head>
      <div className="radial-bg scanlines min-h-screen flex flex-col">
        <Header />

        <div className="px-4 flex-1 container">
          <button onClick={() => setIsGrid(!isGrid)}>toggle</button>
          <ul
            role="list"
            className={clsx(
              "grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 py-8",
              { "lg:grid-cols-4": isGrid }
            )}
          >
            {[...Array(50).keys()].map(
              ({ puzzle_id, landing_route, simple_name }) => (
                <li key={puzzle_id} className="">
                  <PuzzleThumbnail
                    grid={isGrid}
                    {...{ puzzle_id, landing_route, simple_name }}
                  />
                </li>
              )
            )}
          </ul>
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
