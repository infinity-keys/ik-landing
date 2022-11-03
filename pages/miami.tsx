import { useEffect, useState } from "react";
import { NextPage } from "next";
import useSWR from "swr";

import Seo from "@components/seo";

import { buildTokenIdParams, thumbnailData } from "@lib/utils";
import clsx from "clsx";
import EventThumbnail from "@components/event-thumbnail";
import { ThumbnailGridLayoutType, ThumbnailProgress } from "@lib/types";
import useCurrentWidth from "@hooks/useCurrentWidth";
import Image from "next/image";

import LensLogo from "@components/svg/partner-logos/lens_logo-svg";
import SagaLogo from "@components/svg/partner-logos/saga_logo-png";
import SanLogo from "@components/svg/partner-logos/san_logo-png";
import PnLogo from "@components/svg/partner-logos/pn_logo-png";
import IslandersLogo from "@components/svg/partner-logos/islanders_logo-png";
import RehashLogo from "@components/svg/partner-logos/rehash_logo-jpeg";

/*
 @TODO
  - type fetcher args
  - table in db
      landing route
      partner logos (array of cloudinary ids)
      puzzles
      simple name
  - get tokens from db
  - can we test minting new token live somehow?
  - style
*/

const REFRESH_RATE = 1000 * 30;
// const fetcher = (...args) => fetch(...args).then((res) => res.json());

const MiamiPage: NextPage = (props) => {
  // const [shouldRefresh, setShouldRefresh] = useState(true);
  // const tokenIds = [0, 1, 45];
  // const tokenIdsParams = buildTokenIdParams(tokenIds);

  // const { data, error } = useSWR(
  //   "/api/minter/check-minted?" + tokenIdsParams,
  //   fetcher,
  //   {
  //     refreshInterval: shouldRefresh ? REFRESH_RATE : 0,
  //     revalidateOnFocus: shouldRefresh,
  //   }
  // );

  // useEffect(() => {
  //   // if all tokens have been minted, stop pinging the api
  //   const allMinted = data?.tokensMinted.every((b: boolean) => b);
  //   if (allMinted) setShouldRefresh(false);
  // }, [data]);
  const [exampleCompleted, setExampleCompleted] = useState([
    false,
    false,
    false,
    false,
    false,
  ]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setExampleCompleted([true, false, false, false, false]);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const width = useCurrentWidth();
  const layout =
    width < 1280 ? ThumbnailGridLayoutType.List : ThumbnailGridLayoutType.Grid;

  return (
    <div className="p-6 min-h-screen max-w-[1400px] mx-auto flex flex-col justify-center">
      <Seo title="Miami" />
      <div className="">
        <ul
          className={clsx(
            "grid grid-cols-1 gap-6 py-8 max-w-md mx-auto xl:mt-6 my-10 w-full xl:max-w-none xl:grid-cols-5"
          )}
        >
          {example.puzzles.map((puzzle, index) => {
            const data = thumbnailData(puzzle);
            return (
              <li key={data.id}>
                <EventThumbnail
                  isGrid={layout === ThumbnailGridLayoutType.Grid}
                  id={data.id}
                  name={data.name}
                  cloudinary_id={data.cloudinary_id}
                  progress={
                    exampleCompleted[index]
                      ? ThumbnailProgress.Completed
                      : ThumbnailProgress.NotCompleted
                  }
                />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
export default MiamiPage;

const example = {
  puzzles: [
    {
      simple_name: "Halloween Spooktacular",
      landing_route: "halloween-spooktacular",
      puzzle_id: "8d44a660-e06c-4cf4-be4f-b30aa59a521a",
      nft: {
        tokenId: 59,
        nft_metadatum: {
          cloudinary_id: "ik-alpha-trophies/halloween-2_bobgoe",
        },
      },
    },
    {
      simple_name: "Thriller Nights",
      landing_route: "thriller-nights",
      puzzle_id: "8343e0b1-336f-4b51-9471-00a01547de11",
      nft: {
        tokenId: 60,
        nft_metadatum: {
          cloudinary_id: "ik-alpha-trophies/halloween-3_c8a4ra",
        },
      },
    },
    {
      simple_name: "Halloween Movie?",
      landing_route: "halloween-movie",
      puzzle_id: "a1362b5d-449d-4233-a721-e50a8d428643",
      nft: {
        tokenId: 62,
        nft_metadatum: {
          cloudinary_id: "ik-alpha-trophies/halloween-5_t3bdxc",
        },
      },
    },
    {
      simple_name: "Peek-A-Boo",
      landing_route: "peek-a-boo",
      puzzle_id: "af2d1358-8b6c-4682-bdec-ece7d2099237",
      nft: {
        tokenId: 63,
        nft_metadatum: {
          cloudinary_id: "ik-alpha-trophies/halloween-6_w7s3wc",
        },
      },
    },
    {
      simple_name: "The Gold Bug",
      landing_route: "the-gold-bug",
      puzzle_id: "8ba69734-e545-4941-ae1e-cfe1d73b6cbb",
      nft: {
        tokenId: 61,
        nft_metadatum: {
          cloudinary_id: "ik-alpha-trophies/halloween-4_js4u9s",
        },
      },
    },
  ],
  puzzlesNftIds: [58, 59, 60, 62, 63, 61],
  pack: {
    simpleName: "halloween-pack",
    packSuccessMessage: "",
    name: "Halloween Pack",
    nftId: 64,
    cloudinaryId: "ik-alpha-trophies/halloween-pack_banrde",
  },
};
