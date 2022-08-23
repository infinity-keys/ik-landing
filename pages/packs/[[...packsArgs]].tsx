import { NextPage } from "next";

import { gqlApiSdk } from "@lib/server";
import { GetAllPacksQuery } from "@lib/generated/graphql";
import { PAGINATION_COUNTS } from "@lib/constants";
import GridLayout from "@components/thumbnail-grid/grid-layout";
import Wrapper from "@components/wrapper";
import Head from "next/head";

export interface PageProps {
  packs: GetAllPacksQuery["packs"];
  isFirstPage: Boolean;
  isLastPage: Boolean;
}

interface PageParams {
  params: {
    packsArgs: [string, string] | null;
  };
}

const Packs: NextPage<PageProps> = ({ packs, isFirstPage, isLastPage }) => {
  return (
    <Wrapper>
      <Head>
        <title>Infinity Keys Packs</title>
      </Head>

      <GridLayout
        thumbnailList={packs}
        isFirstPage={isFirstPage}
        isLastPage={isLastPage}
      />
    </Wrapper>
  );
};

export default Packs;

export async function getStaticPaths() {
  const gql = await gqlApiSdk();
  const { count } = await gql.GetAllPacks();
  const numberOfPacks = count.aggregate?.count || 0;

  const paths = PAGINATION_COUNTS.map((packsPerPage) => {
    const numOfPages = Math.ceil(numberOfPacks / packsPerPage);

    return [...Array(numOfPages).keys()].map((pageNum) => {
      const defaultPage =
        packsPerPage === PAGINATION_COUNTS[0] && pageNum === 0;

      const slug = {
        params: {
          packsArgs: defaultPage
            ? null // catches /packs with no params
            : [packsPerPage.toString(), (pageNum + 1).toString()],
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
  const { packsArgs } = params;
  const [packsPerPage, page] = packsArgs || ["16", "1"];

  const limit = parseInt(packsPerPage);
  const pageNum = parseInt(page);
  const offset = limit * (pageNum - 1);

  const gql = await gqlApiSdk();
  const { packs, count } = await gql.GetAllPacks({
    limit,
    offset,
  });

  const numberOfPacks = count.aggregate?.count || 0;
  const numOfPages = Math.ceil(numberOfPacks / limit);

  return {
    props: {
      packs,
      isFirstPage: pageNum === 1,
      isLastPage: numOfPages === pageNum,
    },
  };
}
