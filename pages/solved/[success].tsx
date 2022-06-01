import type { NextPage } from "next";
import dynamic from "next/dynamic";
import Image from "next/image";
import Head from "next/head";

import { gqlApiSdk } from "@lib/server";
import Wrapper from "@components/wrapper";

const LandingForm = dynamic(() => import('@components/forms/landing'));
const DevForm = dynamic(() => import('@components/forms/dev'));
const AvalancheForm = dynamic(() => import('@components/forms/avalanche'));
const InstagramForm = dynamic(() => import('@components/forms/instagram'));

interface SuccessPageProps {
  name: string;
  puzzleId: string;
}
interface SuccessPageParams {
  params: { success: string }
}

const Dev: NextPage<SuccessPageProps> = ({ puzzleId, name }) => {
  return (
    <Wrapper>
      <Head>
        <title>Congrats</title>
      </Head>

      <div className="ik-page radial-bg scanlines">
        <div className="container px-4 flex flex-col items-center justify-center min-h-screen max-w-sm ">
          <header className="pt-4 md:pt-14 pb-4 block w-full">
            <Image src="/logo.svg" width={100} height={63} alt="IK logo" />
          </header>

          <main className="flex flex-col items-center justify-center w-full flex-1">
            {name === 'dev' && <DevForm puzzleId={puzzleId} />}
            {name === 'landing' && <LandingForm puzzleId={puzzleId} />}
            {name === 'avalanche' && <AvalancheForm puzzleId={puzzleId} />}
            {name === 'instagram' && <InstagramForm puzzleId={puzzleId} />}
          </main>
        </div>
      </div>
    </Wrapper>
  );
};

export default Dev;

export async function getStaticProps({ params: { success } }: SuccessPageParams): Promise<{ props: SuccessPageProps }> {
  const gql = await gqlApiSdk();
  const { puzzles } = await gql.PuzzleInfoBySuccess({ success });
  const [{ puzzle_id, simple_name }] = puzzles;

  return {
    props: {
      name: simple_name,
      puzzleId: puzzle_id,
    },
  }
}

export async function getStaticPaths() {
  const gql = await gqlApiSdk();
  const { puzzles } = await gql.AllSuccessRoutes();

  // https://nextjs.org/docs/api-reference/data-fetching/get-static-paths
  const paths = puzzles.map(p => ({
    params: {
      success: p.success_route
    }
  }))

  return {
    paths,
    fallback: false,
  }
}
