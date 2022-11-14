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
      setExampleCompleted([true, false, false, false, false, false]);
      setCompleted(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="p-6 min-h-screen max-w-[1400px] mx-auto flex flex-col justify-center relative">
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

      <div className="relative z-10">
        <ul
          className={clsx(
            "grid grid-cols-1 gap-6 py-8 max-w-md mx-auto xl:mt-6 my-10 w-full xl:max-w-none xl:grid-cols-5"
          )}
        >
          {puzzles?.map((puzzle, index) => {
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

        <div className="text-center uppercase">
          <Heading as="h1">
            Five keys - <Flicker bold>find them all</Flicker>
          </Heading>
        </div>
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
