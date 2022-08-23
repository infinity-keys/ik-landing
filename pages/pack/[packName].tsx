import { NextPage } from "next";
import Head from "next/head";
import clsx from "clsx";
import isNumber from "lodash/isNumber";

import Wrapper from "@components/wrapper";
import Thumbnail from "@components/thumbnail";
import Alert from "@components/alert";

import { gqlApiSdk } from "@lib/server";
import { GetPuzzlesByPackQuery } from "@lib/generated/graphql";
import { ThumbnailGridLayoutType } from "@lib/types";
import { wallet } from "@lib/wallet";
import useCurrentWidth from "@hooks/useCurrentWidth";

import {
  AVAX_CHAIN_ID,
  ETH_CHAIN_ID,
  POLYGON_CHAIN_ID,
  openseaLink,
  joePegsLink,
  openseaPolygonLink,
} from "@lib/constants";
import { useState } from "react";
import { minterUtil } from "@lib/minter";
import LoadingIcon from "@components/loading-icon";
import { thumbnailData } from "@lib/utils";

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

const buttonData = [
  {
    chain_id: ETH_CHAIN_ID,
    name: "Ethereum",
  },
  {
    chain_id: AVAX_CHAIN_ID,
    name: "Avalanche",
  },
  {
    chain_id: POLYGON_CHAIN_ID,
    name: "Polygon",
  },
];

const PacksPage: NextPage<PageProps> = ({ puzzles, puzzlesNftIds, pack }) => {
  const gatedIds = puzzlesNftIds;
  const gatedIdsString = gatedIds.map((id) => `gatedIds=${id}`).join("&");
  const nftId = pack.nftId;

  const width = useCurrentWidth();
  const layout =
    width < 640 ? ThumbnailGridLayoutType.List : ThumbnailGridLayoutType.Grid;
  const [chain, setChain] = useState<number | undefined>();
  const [claimed, setClaimed] = useState<boolean>(false);
  const [account, setAccount] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [signature, setSignature] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const connectWallet = async () => {
    try {
      const { account, chain } = await wallet.trigger();
      setChain(chain);
      setAccount(account);

      setLoading(true);
      const claimedNft = await checkIfClaimed(account);
      setClaimed(claimedNft);

      if (claimedNft) {
        setLoading(false);
        return;
      }

      if (!nftId) return;
      const sig = await verify(account, nftId, chain);
      setSignature(sig);
    } catch (err) {
      console.log("err: ", err);
    }
  };

  const verify = async (account: string, tokenId: number, chain: number) => {
    setLoading(true);
    const url = `/api/minter/verify?account=${account}&tokenId=${tokenId.toString()}&chainId=${chain.toString()}&${gatedIdsString}`;

    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      setMessage(data?.message);
      setLoading(false);
      return data?.signature;
    }

    setLoading(false);
    throw await response.text();
  };

  const checkIfClaimed = async (account: string) => {
    const url = `/api/minter/check-claimed?account=${account}&tokenId=${nftId?.toString()}`;

    const response = await fetch(url);
    if (response.ok) return (await response.json()).claimed;
    else throw await response.text();
  };

  const mint = async () => {
    if (!nftId) return;

    setLoading(true);
    const minter = await minterUtil(nftId, signature);
    const { claimedStatus } = await minter.mint();
    setLoading(false);
    if (claimedStatus) setMessage("Congrats on claiming your NFT!");
    setClaimed(claimedStatus);
  };

  return (
    <Wrapper>
      <Head>
        <title>{pack.pack_name}</title>
      </Head>

      <div className="max-w-3xl">
        <p className="mt-10 sm:mt-14">
          To be eligible to claim the {pack.pack_name} Achievement you must
          successfully complete the following puzzles and claim the
          corresponding achievement NFT. All the NFTs must be claimed on the
          same chain to qualify.
        </p>

        <div className={clsx({ "opacity-0": width === 0 })}>
          <ul
            role="list"
            className={clsx(
              "grid grid-cols-1 gap-6 py-8 max-w-sm mx-auto sm:max-w-none sm:grid-cols-3 sm:mt-6",
              message || loading ? "my-12 sm:mb-0" : "my-10"
            )}
          >
            {puzzles.map((puzzle) => {
              const data = thumbnailData(puzzle);
              return (
                <li key={data.id}>
                  <Thumbnail
                    isGrid={layout === ThumbnailGridLayoutType.Grid}
                    id={data.id}
                    name={data.name}
                    url={data.url}
                    cloudinary_id={data.cloudinary_id}
                  />
                </li>
              );
            })}
          </ul>

          {message && (
            <div className="max-w-xl mx-auto mb-2 mt-2">
              <Alert text={message} />
            </div>
          )}

          {loading && (
            <div className="sm:mt-14">
              <LoadingIcon />
            </div>
          )}

          <div className="text-center mb-12">
            {!loading && (
              <div>
                {claimed ? (
                  <button
                    className={clsx(
                      "text-sm text-blue font-bold border-solid border-2 rounded-md py-2 px-4 mb-8 bg-turquoise border-turquoise hover:bg-turquoiseDark"
                    )}
                  >
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={`${
                        chain === ETH_CHAIN_ID
                          ? openseaLink
                          : chain === AVAX_CHAIN_ID
                          ? joePegsLink
                          : chain === POLYGON_CHAIN_ID
                          ? openseaPolygonLink
                          : openseaLink
                      }${nftId}`}
                    >
                      View NFT On{" "}
                      {chain === AVAX_CHAIN_ID ? "JoePegs" : "OpenSea"}
                    </a>
                  </button>
                ) : (
                  <button
                    className={clsx(
                      "text-sm text-blue font-bold border-solid border-2 rounded-md py-2 w-44 mb-8",

                      chain !== undefined && !signature
                        ? "bg-gray-150 border-gray-150"
                        : "bg-turquoise border-turquoise hover:bg-turquoiseDark"
                    )}
                    onClick={() => (signature ? mint() : connectWallet())}
                    disabled={chain !== undefined && !signature}
                  >
                    {signature
                      ? "Mint"
                      : !signature && chain !== undefined
                      ? "Wallet Connected"
                      : "Connect Wallet"}
                  </button>
                )}
              </div>
            )}

            {chain && (
              <div className="text-white/75 flex flex-col md:block">
                {buttonData.map(({ name, chain_id }) => (
                  <button
                    className={clsx(
                      "transition my-2 hover:text-white text-turquoise md:mx-4 md:my-0",
                      {
                        "text-white/50 hover:text-white/50": chain === chain_id,
                      }
                    )}
                    key={name}
                    onClick={async () => {
                      const newChain = (await wallet.switchChain(chain_id))
                        .chain;
                      if (chain !== newChain && nftId) {
                        setSignature(await verify(account, nftId, newChain));
                        setChain(newChain);
                      }
                    }}
                    disabled={chain === chain_id}
                  >
                    {chain === chain_id
                      ? `Connected to ${name}`
                      : `Switch to ${name}`}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default PacksPage;

export async function getStaticPaths() {
  const gql = await gqlApiSdk();
  const { packs } = await gql.GetAllPacks();

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
  const puzzlesNftIds = puzzles.map(({ nft }) => nft?.tokenId);

  if (!puzzlesNftIds.every(isNumber)) {
    throw new Error("Either no NFTs or NFT IDs are not numbers");
  }
  return {
    props: {
      puzzles,
      puzzlesNftIds,
      pack: pack[0],
    },
  };
}
