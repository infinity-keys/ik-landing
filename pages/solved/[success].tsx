import type { NextPage } from "next";
import Image from "next/image";

import { gqlApiSdk } from "@lib/server";
import Wrapper from "@components/wrapper";
import WalletEmail from "@components/wallet-email";
import Link from "next/link";
import Markdown from "@components/markdown";
import Seo from "@components/seo";
import ButtonSocialTwitter from "@components/button-social-twitter";
import Button from "@components/button";
import { PACK_LANDING_BASE, PUZZLE_COLLECTION_BASE } from "@lib/constants";

interface SuccessPageProps {
  name: string;
  puzzleId: string;
  successMessage?: string;
  nftId?: string;
  pack: {
    packRoute?: string;
    parentPackName?: string;
    buttonText?: string;
  };
}
interface SuccessPageParams {
  params: { success: string };
}

const Dev: NextPage<SuccessPageProps> = ({
  puzzleId,
  name,
  successMessage,
  nftId,
  pack,
}) => {
  const { packRoute, parentPackName, buttonText } = pack;
  return (
    <Wrapper>
      <Seo title="Congrats!" />

      <div className="max-w-sm">
        <div className="pt-4 md:pt-14 pb-4 block w-full">
          <Link href="/">
            <a>
              <Image src="/logo.svg" width={100} height={63} alt="IK logo" />
            </a>
          </Link>
        </div>

        {/* {successMessage && (
          <div className="pb-16 text-center text-lg text-gray-100 max-w-2xl mx-auto">
            <Markdown>{successMessage}</Markdown>
          </div>
        )} */}

        <main className="flex flex-col grow-0 items-center justify-center w-full flex-1">
          <WalletEmail
            puzzleId={puzzleId}
            successMessage={successMessage}
            nftId={nftId}
            name={name}
          />

          <div className="pt-12 w-full">
            <Button
              href={
                parentPackName
                  ? `/${PACK_LANDING_BASE}/${packRoute}`
                  : `/${PUZZLE_COLLECTION_BASE}`
              }
              text={
                parentPackName
                  ? buttonText || `Go to ${parentPackName}`
                  : "Solve More Puzzles"
              }
              variant="outline"
              fullWidth
            />
          </div>

          <div className="py-6 flex">
            <div className="w-full flex items-center justify-center">
              <ButtonSocialTwitter />
            </div>
          </div>
        </main>
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
  const [{ puzzle_id, simple_name, success_message, nft, pack_puzzles }] =
    puzzles;

  const parentPack = pack_puzzles[0]?.pack || null;

  return {
    props: {
      name: success,
      puzzleId: puzzle_id,
      successMessage: success_message || "",
      nftId: nft?.tokenId.toString() || "",
      pack: {
        packRoute: parentPack?.simple_name || "",
        parentPackName: parentPack?.pack_name || "",
        buttonText: parentPack?.button_text || "",
      },
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
