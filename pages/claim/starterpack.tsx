import { NextPage } from "next";
import Head from "next/head";

import { gqlApiSdk } from "@lib/server";
// @TODO: remove when updated with Ham's layout
import Header from "@components/header";
import Footer from "@components/footer";
import Wrapper from "@components/wrapper";
import { StarterPackPuzzlesQuery } from "@lib/generated/graphql";

interface PageProps {
  puzzles: StarterPackPuzzlesQuery["puzzles"];
}

const StarterPack: NextPage<PageProps> = ({ puzzles }) => {
  return (
    <Wrapper>
      <Head>
        <title>Starter Pack - Infinity Keys</title>
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

export default StarterPack;

export async function getStaticProps(): Promise<{ props: PageProps }> {
  const gql = await gqlApiSdk();
  const { puzzles } = await gql.StarterPackPuzzles();

  return {
    props: {
      puzzles,
    },
  };
}
