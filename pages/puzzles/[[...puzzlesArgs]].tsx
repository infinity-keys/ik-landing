import { NextPage } from "next";

import { gqlApiSdk } from "@lib/server";
import { PublicPuzzlesQuery } from "@lib/generated/graphql";
import { PAGINATION_COUNTS } from "@lib/constants";
import GridLayout from "@components/thumbnail-grid/grid-layout";
import Wrapper from "@components/wrapper";
import Head from "next/head";

export interface PageProps {
  puzzles: PublicPuzzlesQuery["puzzles"];
  isFirstPage: Boolean;
  isLastPage: Boolean;
}

interface PageParams {
  params: {
    puzzlesArgs: [string, string] | null;
  };
}

const Puzzles: NextPage<PageProps> = ({ puzzles, isFirstPage, isLastPage }) => {
  return (
    <Wrapper>
      <Head>
        <title>Infinity Keys Puzzles</title>
      </Head>

      <GridLayout
        thumbnailList={puzzles}
        isFirstPage={isFirstPage}
        isLastPage={isLastPage}
      />
    </Wrapper>
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
          puzzlesArgs: defaultPage
            ? null // catches /puzzles with no params
            : [puzzlesPerPage.toString(), (pageNum + 1).toString()],
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
  const [puzzlesPerPage, page] = puzzlesArgs || ["16", "1"];

  const limit = parseInt(puzzlesPerPage);
  const pageNum = parseInt(page);
  const offset = limit * (pageNum - 1);

  const gql = await gqlApiSdk();
  const { puzzles, count } = await gql.PublicPuzzles({
    limit,
    offset,
  });

  const numberOfPuzzles = count.aggregate?.count || 0;
  const numOfPages = Math.ceil(numberOfPuzzles / limit);

  return {
    props: {
      puzzles,
      isFirstPage: pageNum === 1,
      isLastPage: numOfPages === pageNum,
    },
  };
}
