import { NextPage } from "next";

import { gqlApiSdk } from "@lib/server";
import { PublicPuzzlesQuery } from "@lib/generated/graphql";
import { PAGINATION_COUNTS } from "@lib/constants";
import PuzzlesLayout from "@components/puzzles-layout";

interface PageProps {
  puzzles: PublicPuzzlesQuery["puzzles"];
  isFirstPage: Boolean;
  isLastPage: Boolean;
}

interface PageParams {
  params: {
    puzzlesArgs?: [string, string];
  };
}

const Puzzles: NextPage<PageProps> = ({ puzzles, isFirstPage, isLastPage }) => {
  return (
    <PuzzlesLayout
      puzzles={puzzles}
      isFirstPage={isFirstPage}
      isLastPage={isLastPage}
    />
  );
};

export default Puzzles;

export async function getStaticPaths() {
  const gql = await gqlApiSdk();
  const { count } = await gql.PublicPuzzles();
  const numberOfPuzzles = count.aggregate?.count || 0;

  const paths = PAGINATION_COUNTS.map((puzzlesPerPage) => {
    const numOfPages = Math.ceil(numberOfPuzzles / puzzlesPerPage);

    return [...Array(numOfPages).keys()].map((pageNum) => {
      const defaultPage =
        puzzlesPerPage === PAGINATION_COUNTS[0] && pageNum === 0;

      const slug = {
        params: {
          puzzlesArgs: [puzzlesPerPage.toString(), (pageNum + 1).toString()],
        },
      };
      return slug;
    });
  }).flat();

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({
  params,
}: PageParams): Promise<{ props: PageProps }> {
  const { puzzlesArgs } = params;
  const [puzzlesPerPage, page] = puzzlesArgs || ["8", "1"];

  const limit = parseInt(puzzlesPerPage);
  const offset = limit * (parseInt(page) - 1);

  const gql = await gqlApiSdk();
  const { puzzles, count } = await gql.PublicPuzzles({
    limit,
    offset,
  });

  const numberOfPuzzles = count.aggregate?.count || 0;
  const numOfPages = Math.ceil(numberOfPuzzles / parseInt(puzzlesPerPage));

  const isFirstPage = parseInt(page) === 1;
  const isLastPage = numOfPages === parseInt(page);

  return {
    props: {
      puzzles,
      isFirstPage,
      isLastPage,
    },
  };
}

paths: [
  { params: { puzzlesArgs: ["8", "1"] } },
  { params: { puzzlesArgs: ["8", "2"] } },
  { params: { puzzlesArgs: ["16", "1"] } },
  { params: { puzzlesArgs: ["32", "1"] } },
  { params: { puzzlesArgs: ["64", "1"] } },
];
