import { NextPage } from "next";
import Head from "next/head";

// @TODO: remove when updated with Ham's layout
import Header from "@components/header";
import Footer from "@components/footer";
import Wrapper from "@components/wrapper";

import { gqlApiSdk } from "@lib/server";
import { GetPuzzlesByPackQuery } from "@lib/generated/graphql";

interface PageProps {
  puzzles: GetPuzzlesByPackQuery["puzzles"];
  puzzlesNftIds: number[];
  pack: {
    pack_name: string;
    nftId?: number;
  };
}

interface PageParams {
  params: {
    packName: string;
  };
}

const PacksPage: NextPage<PageProps> = ({ puzzles, puzzlesNftIds, pack }) => {
  return (
    <Wrapper>
      <Head>
        <title>{} - Infinity Keys</title>
      </Head>
      <Header />

      <div className="w-full pt-4 pb-4 min-h-screen radial-bg relative z-0">
        <div className="container">
          <p>Check back soon</p>
        </div>
      </div>

      <Footer />
    </Wrapper>
  );
};

export default PacksPage;

export async function getStaticPaths() {
  const gql = await gqlApiSdk();
  const { packs } = await gql.AllPacks();

  const paths = packs.map(({ simple_name }) => ({
    params: { packName: simple_name },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({
  params,
}: PageParams): Promise<{ props: PageProps }> {
  const { packName } = params;
  const gql = await gqlApiSdk();
  const { puzzles, pack } = await gql.GetPuzzlesByPack({ packName });
  console.log("pack: ", pack);
  const puzzlesNftIds = puzzles.map(({ nft }) => nft?.tokenId);

  return {
    props: {
      puzzles,
      puzzlesNftIds,
      pack: pack[0],
    },
  };
}
