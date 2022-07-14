import { NextPage } from "next";

import { gqlApiSdk } from "@lib/server";
import { PublicPuzzlesQuery } from "@lib/generated/graphql";
import PuzzlesLayout from "@components/puzzles-layout";

interface PageProps {
  puzzles: PublicPuzzlesQuery["puzzles"];
}

const Puzzles: NextPage<PageProps> = ({ puzzles }) => {
  return <PuzzlesLayout puzzles={puzzles} />;
};
export default Puzzles;

export async function getStaticPaths() {
  const gql = await gqlApiSdk();
  const { puzzles } = await gql.PublicPuzzles();
  const pages = Math.ceil(puzzles.length / 2) - 1;

  const pagesToGo = Array.from({ length: pages }, (v, i) => i + 1);
  const paths = pagesToGo.map((p) => ({
    params: {
      pid: p === 1 ? null : [p.toString()],
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({
  params,
}): Promise<{ props: PageProps }> {
  const { pid } = params;
  const offset = pid ? (pid - 1) * 2 : 0;

  const gql = await gqlApiSdk();
  const { puzzles } = await gql.PublicPuzzles({
    limit: 3,
    offset,
  });

  return {
    props: {
      puzzles,
    },
  };
}
