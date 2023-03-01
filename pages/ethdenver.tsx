import { NextPage } from "next";

import { gqlApiSdk } from "@lib/server";
import { GetEthDenverQuery } from "@lib/generated/graphql";

import GridLayout from "@components/thumbnail-grid/grid-layout";
import Wrapper from "@components/wrapper";
import Seo from "@components/seo";
import { thumbnailData } from "@lib/utils";

export interface PageProps {
  packs: GetEthDenverQuery["packs"];
  puzzles: GetEthDenverQuery["puzzles"];
}

const EthDenver: NextPage<PageProps> = ({ packs, puzzles }) => {
  const listData = [...packs, ...puzzles].map((item) => thumbnailData(item));

  return (
    <Wrapper>
      <Seo title="Eth Denver | Infinity Keys" url="ethdenver" />

      <GridLayout
        thumbnailList={listData}
        isFirstPage={true}
        isLastPage={true}
        noDropdown
      />
    </Wrapper>
  );
};

export default EthDenver;

export async function getStaticProps(): Promise<{ props: PageProps }> {
  const gql = await gqlApiSdk();
  const { packs, puzzles } = await gql.GetEthDenver();

  return {
    props: {
      packs,
      puzzles,
    },
  };
}
