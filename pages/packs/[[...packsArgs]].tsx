import { NextPage } from "next";

import { gqlApiSdk } from "@lib/server";
import { GetAllPublicPacksQuery } from "@lib/generated/graphql";
import { PACK_COLLECTION_BASE, PAGINATION_COUNTS } from "@lib/constants";
import { thumbnailData } from "@lib/utils";

import GridLayout from "@components/thumbnail-grid/grid-layout";
import Wrapper from "@components/wrapper";
import Seo from "@components/seo";

export interface PageProps {
  packs: GetAllPublicPacksQuery["packs"];
  isFirstPage: boolean;
  isLastPage: boolean;
}

interface PageParams {
  params: {
    packsArgs: [string, string] | null;
  };
}

const Packs: NextPage<PageProps> = ({ packs, isFirstPage, isLastPage }) => {
  const listData = packs.map((item) => thumbnailData(item));

  return (
    <Wrapper>
      <Seo title="Infinity Keys Packs" url="packs" />

      <GridLayout
        thumbnailList={listData}
        isFirstPage={isFirstPage}
        isLastPage={isLastPage}
        urlBase={`/${PACK_COLLECTION_BASE}`}
      />
    </Wrapper>
  );
};

export default Packs;

export async function getStaticPaths() {
  const gql = await gqlApiSdk();
  const { count } = await gql.GetAllPublicPacks();
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
  const { packs, count } = await gql.GetAllPublicPacks({
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
