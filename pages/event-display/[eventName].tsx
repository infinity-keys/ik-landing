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

// how often SWR should query the api route
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
  //   if (allMinted) setShouldRefresh(false);
  // }, [tokenData]);

  const [exampleCompleted, setExampleCompleted] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
  ]);

  const [options, setOptions] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setExampleCompleted([true, false, false, false, false, false]);
      setOptions(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const width = useCurrentWidth();
  const containerRef = useRef<Container>(null);

  const layout =
    width < 1280 ? ThumbnailGridLayoutType.List : ThumbnailGridLayoutType.Grid;

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine);
  }, []);

  useEffect(() => {
    if (containerRef && containerRef.current && options) {
      console.log("containerRef.current: ", containerRef.current);
      containerRef.current.play();
    }
  }, [options]);

  return (
    <div className="p-6 min-h-screen max-w-[1400px] mx-auto flex flex-col justify-center relative">
      <div className="absolute top-0 left-0 w-full h-full">
        <Particles
          id="tsparticles"
          options={stars}
          init={particlesInit}
          className="z-0"
        />
      </div>
      <div className="absolute top-0 left-0 w-full h-full">
        <Particles
          container={containerRef}
          id="tsparticles2"
          options={fire}
          init={particlesInit}
          className="z-0"
        />
      </div>
      <Seo title={eventName} />
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

  // https://nextjs.org/docs/api-reference/data-fetching/get-static-paths
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

const fire = {
  autoPlay: false,
  fullScreen: {
    enable: true,
  },
  detectRetina: true,
  background: {
    color: "transparent",
  },
  fpsLimit: 60,
  emitters: {
    direction: "top",
    life: {
      count: 0,
      duration: 0.01,
      delay: 0.1,
    },
    rate: {
      delay: 0.15,
      quantity: 1,
    },
    size: {
      width: 50,
      height: 0,
    },
    position: {
      y: 100,
      x: 50,
    },
  },
  particles: {
    number: {
      value: 0,
    },
    destroy: {
      mode: "split",
      split: {
        count: 2,
        factor: { value: 1 / 3 },
        rate: {
          value: 10,
        },
        particles: {
          color: {
            value: ["#5bc0eb", "#fde74c", "#9bc53d", "#e55934", "#fa7921"],
          },
          stroke: {
            width: 0,
          },
          number: {
            value: 0,
          },
          collisions: {
            enable: false,
          },
          opacity: {
            value: 1,
            animation: {
              enable: true,
              speed: 0.3,
              minimumValue: 0.1,
              sync: false,
              startValue: "max",
              destroy: "min",
            },
          },
          shape: {
            type: "circle",
          },
          size: {
            value: { min: 0.5, max: 2 },
            animation: {
              enable: false,
            },
          },
          life: {
            count: 1,
            duration: {
              value: {
                min: 1,
                max: 2,
              },
            },
          },
          move: {
            enable: true,
            gravity: {
              enable: false,
            },
            speed: 2,
            direction: "none",
            random: true,
            straight: false,
            outMode: {
              default: "destroy",
            },
          },
        },
      },
    },
    life: {
      count: 0.3,
    },
    shape: {
      type: "line",
    },
    size: {
      value: { min: 1, max: 100 },
      animation: {
        enable: true,
        sync: true,
        speed: 100,
        startValue: "random",
        destroy: "min",
      },
    },
    stroke: {
      color: {
        value: "#324f9e",
      },
      width: 1,
    },
    rotate: {
      path: true,
    },
    move: {
      enable: true,
      gravity: {
        acceleration: 15,
        enable: true,
        inverse: true,
        maxSpeed: 100,
      },
      speed: { min: 10, max: 15 },
      outModes: {
        default: "destroy",
        top: "none",
      },
      trail: {
        fillColor: "#101D42",
        enable: false,
        length: 10,
      },
    },
  },
};

const stars = {
  fullScreen: {
    enable: true,
    zIndex: 1,
  },
  particles: {
    number: {
      value: 75,
      density: {
        enable: true,
        value_area: 800,
      },
    },
    color: {
      value: "#3FCCBB",
    },
    shape: {
      type: "circle",
    },
    opacity: {
      value: 1,
      random: true,
      animation: {
        enable: true,
        speed: 1,
        opacity_min: 0,
        sync: false,
      },
    },
    size: {
      value: 3,
      random: true,
      anim: {
        enable: true,
        speed: 4,
        size_min: 0.3,
        sync: false,
      },
    },
    line_linked: {
      enable: false,
    },
    move: {
      enable: false,
    },
  },
  interactivity: {
    events: {
      onhover: {
        enable: false,
      },
      onclick: {
        enable: false,
      },
      resize: false,
    },
    modes: {
      grab: {
        distance: 400,
        line_linked: {
          opacity: 1,
        },
      },
      bubble: {
        distance: 250,
        size: 0,
        duration: 2,
        opacity: 0,
        speed: 3,
      },
      push: {
        particles_nb: 4,
      },
      remove: {
        particles_nb: 2,
      },
    },
  },
  retina_detect: true,
  background: {
    color: "transparent",
    position: "50% 50%",
    repeat: "no-repeat",
    size: "20%",
  },
};
