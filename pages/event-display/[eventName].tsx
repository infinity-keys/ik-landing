import { useEffect, useRef, useState } from "react";
import { NextPage } from "next";
import useSWR, { Fetcher } from "swr";

import Seo from "@components/seo";
import { EventDisplayQuery, PublicPuzzlesQuery } from "@lib/generated/graphql";

import { buildTokenIdParams, thumbnailData } from "@lib/utils";
import clsx from "clsx";
import EventThumbnail from "@components/event-thumbnail";
import { ThumbnailGridLayoutType, ThumbnailProgress } from "@lib/types";
import useCurrentWidth from "@hooks/useCurrentWidth";
import { gqlApiSdk } from "@lib/server";
import { isNumber } from "lodash";

import { useCallback } from "react";
import Particles from "react-tsparticles";
import type { Container, Engine } from "tsparticles-engine";
import { loadFull } from "tsparticles";
import Heading from "@components/heading";
import Flicker from "@components/flicker";

import { stars, fireworks } from "@lib/tsParticles";
import Image from "next/image";
import IkTurquoiseKey from "@components/svg/ik-turquoise-key";

export interface EventPageProps {
  puzzles?: PublicPuzzlesQuery["puzzles"];
  tokenIds: number[];
  eventName: string;
}
interface EventPageParams {
  params: {
    eventName: string;
  };
}

// how often SWR should query the api route (in milliseconds)
const REFRESH_RATE = 1000 * 30;

const fetcher: Fetcher<{ tokensMinted: boolean[] }, string> = (...args) =>
  fetch(...args).then((res) => res.json());

const EventPage: NextPage<EventPageProps> = ({
  eventName,
  puzzles,
  tokenIds,
}) => {
  // // should be set to false when we no longer want to query
  // // the api route, (e.g. when all tokens have been minted)
  // const [shouldRefresh, setShouldRefresh] = useState(true);
  // const tokenIdsParams = buildTokenIdParams(tokenIds);
  const [completed, setCompleted] = useState(false);

  const width = useCurrentWidth();
  const containerRef = useRef<Container>(null);

  const layout =
    width < 1280 ? ThumbnailGridLayoutType.List : ThumbnailGridLayoutType.Grid;

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine);
  }, []);

  // const { data: tokenData } = useSWR(
  //   "/api/minter/check-minted?" + tokenIdsParams,
  //   fetcher,
  //   {
  //     refreshInterval: shouldRefresh ? REFRESH_RATE : 0,
  //     revalidateOnFocus: shouldRefresh,
  //   }
  // );

  // useEffect(() => {
  //   // if all tokens have been minted, stop pinging the api
  //   const allMinted = tokenData?.tokensMinted.every((b: boolean) => b);
  //   if (allMinted) {
  //     setShouldRefresh(false);
  //     setCompleted(true);
  //   }
  // }, [tokenData]);

  useEffect(() => {
    if (completed) containerRef?.current?.play();
  }, [completed]);

  const [exampleCompleted, setExampleCompleted] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
  ]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setExampleCompleted([true, true, false, false, false, false]);
      // setCompleted(true);
    }, 3000);

    const timer2 = setTimeout(() => {
      setExampleCompleted([true, true, true, true, true, true]);
      setCompleted(true);
    }, 6000);
    return () => {
      clearTimeout(timer);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <div>
      <Seo title={eventName} />

      <Particles
        id="particlesStars"
        options={stars}
        init={particlesInit}
        className="z-0"
      />
      <Particles
        container={containerRef}
        id="particlesFireworks"
        options={fireworks}
        init={particlesInit}
        className="z-0"
      />

      <div className="p-4 min-h-screen max-w-[2160px] mx-auto flex flex-col">
        <div className="">
          <span className="inline-block -rotate-90 -ml-3 -mb-4">
            <IkTurquoiseKey height={120} width={120} />
          </span>
          <p className="text-white text-lg 2xl:text-2xl">
            There&apos;s treasure everywhere
          </p>
        </div>

        <div className="flex-1 flex flex-col justify-center relative">
          <div className="relative z-10">
            <ul
              className={clsx(
                "grid grid-cols-1 gap-5 py-8 max-w-md mx-auto xl:mt-6 my-10 w-full xl:max-w-none xl:grid-cols-5"
              )}
            >
              {puzzles?.map((puzzle, index) => {
                const data = thumbnailData(puzzle);

                return (
                  <li key={data.id} className="h-full">
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

            <div className="text-center uppercase text-4xl 2xl:text-6xl">
              <Heading as="h1" visual="unset">
                {completed ? (
                  <Flicker bold>All keys unlocked</Flicker>
                ) : (
                  <>
                    Five keys - <Flicker bold>find them all</Flicker>
                  </>
                )}
              </Heading>
            </div>
          </div>
        </div>

        {completed && (
          <div className="flex justify-center items-center absolute top-0 left-0 w-full h-full z-10 bg-black/50 animate-fadeInOut border-8 border-amber-400">
            <div className="bg-clip-text gold-gradient animate-bgMove">
              <p className="text-dynamic-xl font-bold text-transparent">
                UNLOCKED
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default EventPage;

export async function getStaticProps({
  params: { eventName },
}: EventPageParams): Promise<{ props: EventPageProps }> {
  const gql = await gqlApiSdk();

  const { event_displays } = await gql.EventDisplay({ eventName });
  const event = event_displays[0];

  const puzzles = event.pack.pack_puzzles.map(({ puzzle }) => puzzle);
  const tokenIds = puzzles.map(({ nft }) => nft?.tokenId);

  if (!tokenIds.every(isNumber)) {
    throw new Error("Either no NFTs or NFT IDs are not numbers");
  }

  return {
    props: {
      eventName: event.simple_name,
      puzzles,
      tokenIds,
    },
  };
}

export async function getStaticPaths() {
  const gql = await gqlApiSdk();
  const { event_displays } = await gql.AllEventDisplayRoutes();

  const paths = event_displays.map(
    ({ landing_route }: { landing_route: string }) => ({
      params: {
        eventName: landing_route,
      },
    })
  );

  return {
    paths,
    fallback: false,
  };
}
