import { NextPage } from "next";
import Head from "next/head";

import Wrapper from "@components/wrapper";
import { gqlApiSdk } from "@lib/server";
import CloudImage from "@components/cloud-image";
import Minter from "@components/minter";

interface ClaimsPageProps {
  nftTokenIds: number[];
  cloudinary_id?: string;
  nftWalletAgeCheck: boolean;
}

interface ClaimsPageParams {
  params: { success: string };
}

const ClaimFlow: NextPage<ClaimsPageProps> = ({
  nftTokenIds,
  cloudinary_id,
  nftWalletAgeCheck,
}) => {
  const tokenId = nftTokenIds[0]; // @TODO: for now, take the first, but handle multiple soon

  return (
    <Wrapper>
      <Head>
        <title>Infinity Keys</title>
      </Head>

      <div className="flex flex-col items-center text-center">
        {cloudinary_id && (
          <CloudImage height={260} width={260} id={cloudinary_id} />
        )}

        <Minter
          tokenId={tokenId}
          gatedIds={[]}
          nftWalletAgeCheck={nftWalletAgeCheck}
        />
      </div>
    </Wrapper>
  );
};

export default ClaimFlow;

export async function getStaticProps({
  params: { success },
}: ClaimsPageParams): Promise<{ props: ClaimsPageProps }> {
  const gql = await gqlApiSdk();

  const { nfts } = await gql.GetNftIdByPuzzleSuccessRoute({
    successRoute: success,
  });
  const nftTokenIds = nfts.map((nft) => nft.tokenId);

  const { puzzles } = await gql.PuzzleInfoBySuccess({ success });

  const nft = puzzles.length ? puzzles[0].nft : null;

  return {
    props: {
      nftTokenIds,
      cloudinary_id: nft?.nft_metadatum?.cloudinary_id || "",
      nftWalletAgeCheck: nft?.wallet_age_check || false,
    },
  };
}

export async function getStaticPaths() {
  const gql = await gqlApiSdk();
  const { nfts } = await gql.GetAllNftClaims();

  // https://nextjs.org/docs/api-reference/data-fetching/get-static-paths
  const paths = nfts.map((nft) => ({
    params: {
      success: nft.puzzle.success_route,
    },
  }));

  return {
    paths,
    fallback: false,
  };
}
