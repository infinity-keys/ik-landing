import { useEffect, useRef, useState, useCallback } from "react";
import { NextPage } from "next";
import Image from "next/image";
import useSWR, { Fetcher } from "swr";
import clsx from "clsx";
import { isNumber } from "lodash";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import Particles from "react-tsparticles";
import type { Container, Engine } from "tsparticles-engine";
import { loadFull } from "tsparticles";

import { PublicPuzzlesQuery } from "@lib/generated/graphql";
import { gqlApiSdk } from "@lib/server";
import { stars, fireworks } from "@lib/tsParticles";
import { ThumbnailGridLayoutType, ThumbnailProgress } from "@lib/types";
import { buildTokenIdParams, thumbnailData } from "@lib/utils";

import useCurrentWidth from "@hooks/useCurrentWidth";

import EventThumbnail from "@components/event-thumbnail";
import Flicker from "@components/flicker";
import Heading from "@components/heading";
import Seo from "@components/seo";
export interface EventPageProps {
  puzzles?: PublicPuzzlesQuery["puzzles"];
  tokenIds: number[];
  eventName: string;
  unlockText: string;
  flickerText: string;
  solidText: string;
}
interface EventPageParams {
  params: {
    eventName: string;
    unlockText: string;
  };
}

// how often SWR should query the api route (in milliseconds)
const REFRESH_RATE = 1000 * 30;
const LOTTIE_ANIMATION_URL =
  "https://assets6.lottiefiles.com/packages/lf20_IxoHFO.json";

const fetcher: Fetcher<{ tokensMinted: boolean[] }, string> = (...args) =>
  fetch(...args).then((res) => res.json());

const EventPage: NextPage<EventPageProps> = ({
  eventName,
  unlockText,
  flickerText,
  solidText,
  puzzles,
  tokenIds,
}) => {
  // set to false when we no longer want to query the api route,
  // (e.g. when all tokens have been minted)
  const [shouldRefresh, setShouldRefresh] = useState(true);
  const tokenIdsParams = buildTokenIdParams(tokenIds);
  const [completed, setCompleted] = useState(false);
  const [animationJson, setAnimationJson] = useState();

  const width = useCurrentWidth();
  const containerRef = useRef<Container>(null);
  const lottieRef = useRef<LottieRefCurrentProps>(null);

  const layout =
    width < 1280 ? ThumbnailGridLayoutType.List : ThumbnailGridLayoutType.Grid;

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine);
  }, []);

  const { data: tokenData } = useSWR(
    "/api/minter/check-minted?" + tokenIdsParams,
    fetcher,
    {
      refreshInterval: shouldRefresh ? REFRESH_RATE : 0,
      revalidateOnFocus: shouldRefresh,
    }
  );

  useEffect(() => {
    // if all tokens have been minted, stop pinging the api
    const allMinted = tokenData?.tokensMinted.every((b: boolean) => b);
    if (allMinted) {
      setShouldRefresh(false);
      setCompleted(true);
      lottieRef?.current?.play();
      containerRef?.current?.play();
    }
  }, [tokenData]);

  // gets the Lottie animation json file
  useEffect(() => {
    fetch(LOTTIE_ANIMATION_URL)
      .then((res) => res.json())
      .then((data) => setAnimationJson(data));
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
        <div className="text-center">
          <span className="inline-block -ml-2 my-2">
            <Image src="/logo.svg" width={140} height={77} alt="IK logo" />
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
                        tokenData?.tokensMinted[index]
                          ? ThumbnailProgress.Completed
                          : ThumbnailProgress.NotCompleted
                      }
                    />
                  </li>
                );
              })}
            </ul>

            <div className="text-center">
              <div className="uppercase text-4xl 2xl:text-6xl">
                <Heading as="h1" visual="unset">
                  {completed ? (
                    <Flicker bold>All keys unlocked</Flicker>
                  ) : (
                    <>
                      {solidText} <Flicker bold>{flickerText}</Flicker>
                    </>
                  )}
                </Heading>
              </div>
              {unlockText && (
                <p
                  className={clsx("text-white mt-4 text-2xl", {
                    invisible: !completed,
                  })}
                >
                  {unlockText}
                </p>
              )}
            </div>
          </div>
        </div>

        <div
          className={clsx(
            "flex justify-center items-center fixed top-0 left-0 w-full h-full z-10 bg-black/70 opacity-0 border-8 border-amber-400",
            completed && "animate-fadeInOut"
          )}
        >
          <div className="w-full">
            {animationJson && (
              <Lottie
                animationData={animationJson}
                lottieRef={lottieRef}
                loop={1}
                autoplay={false}
              />
            )}
          </div>
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
      unlockText: event.unlock_text || "",
      flickerText: event.flicker_text || "",
      solidText: event.solid_text || "",
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
