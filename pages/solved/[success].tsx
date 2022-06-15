import type { NextPage } from "next";
import Image from "next/image";
import Head from "next/head";

import { gqlApiSdk } from "@lib/server";
import Wrapper from "@components/wrapper";
import WalletEmail from "@components/forms/wallet-email";
import Link from "next/link";

interface SuccessPageProps {
  name: string;
  puzzleId: string;
  successMessage?: string;
}
interface SuccessPageParams {
  params: { success: string };
}

const Dev: NextPage<SuccessPageProps> = ({
  puzzleId,
  name,
  successMessage,
}) => {
  return (
    <Wrapper>
      <Head>
        <title>Congrats</title>
      </Head>

      <div className="ik-page radial-bg scanlines">
        <div className="container px-4 flex flex-col items-center justify-center min-h-screen max-w-sm ">
          <header className="pt-4 md:pt-14 pb-4 block w-full">
            <Link href="/">
              <a>
                <Image src="/logo.svg" width={100} height={63} alt="IK logo" />
              </a>
            </Link>
          </header>

          <main className="flex flex-col items-center justify-center w-full flex-1">
            <WalletEmail puzzleId={puzzleId} successMessage={successMessage} />
          </main>
        </div>
      </div>
    </Wrapper>
  );
};

export default Dev;

export async function getStaticProps({
  params: { success },
}: SuccessPageParams): Promise<{ props: SuccessPageProps }> {
  const gql = await gqlApiSdk();
  const { puzzles } = await gql.PuzzleInfoBySuccess({ success });
  const [{ puzzle_id, simple_name, success_message }] = puzzles;

  return {
    props: {
      name: simple_name,
      puzzleId: puzzle_id,
      successMessage: success_message || "",
    },
  };
}

export async function getStaticPaths() {
  const gql = await gqlApiSdk();
  const { puzzles } = await gql.AllSuccessRoutes();

  // https://nextjs.org/docs/api-reference/data-fetching/get-static-paths
  const paths = puzzles.map((p) => ({
    params: {
      success: p.success_route,
    },
  }));

  return {
    paths,
    fallback: false,
  };
}
