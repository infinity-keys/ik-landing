import { useEffect, useState } from "react";
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
  const layout =
    width < 1280 ? ThumbnailGridLayoutType.List : ThumbnailGridLayoutType.Grid;

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(
    async (container: Container | undefined) => {
      await console.log(container);
    },
    []
  );

  return (
    <div className="p-6 min-h-screen max-w-[1400px] mx-auto flex flex-col justify-center relative">
      <div className="absolute top-0 left-0 w-full h-full">
        <Particles
          id="tsparticles"
          options={stars}
          init={particlesInit}
          loaded={particlesLoaded}
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
      delay: 0.05,
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
          value: 5,
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
            outMode: "destroy",
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
      anim: {
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

const confetti = {
  background: {
    color: {
      value: "#000000",
    },
  },
  fullScreen: {
    enable: true,
    zIndex: -1,
  },
  particles: {
    bounce: {
      vertical: {
        value: 0,
      },
      horizontal: {
        value: 0,
      },
    },
    color: {
      value: ["#1E00FF", "#FF0061", "#E1FF00", "#00FF9E"],
      animation: {
        enable: true,
        speed: 30,
      },
    },
    move: {
      decay: 0.1,
      direction: "top",
      enable: true,
      gravity: {
        acceleration: 9.81,
        enable: true,
        maxSpeed: 200,
      },
      outModes: {
        top: "none",
        default: "destroy",
        bottom: "bounce",
      },
      speed: {
        min: 50,
        max: 150,
      },
    },
    number: {
      value: 0,
      limit: 300,
    },
    opacity: {
      value: 1,
      animation: {
        enable: false,
        startValue: "max",
        destroy: "min",
        speed: 0.3,
        sync: true,
      },
    },
    rotate: {
      value: {
        min: 0,
        max: 360,
      },
      direction: "random",
      move: true,
      animation: {
        enable: true,
        speed: 60,
      },
    },
    tilt: {
      direction: "random",
      enable: true,
      move: true,
      value: {
        min: 0,
        max: 360,
      },
      animation: {
        enable: true,
        speed: 60,
      },
    },
    shape: {
      type: ["circle", "square", "polygon"],
      options: {
        polygon: [
          {
            sides: 5,
          },
          {
            sides: 6,
          },
        ],
      },
    },
    size: {
      value: 3,
    },
    roll: {
      darken: {
        enable: true,
        value: 30,
      },
      enlighten: {
        enable: true,
        value: 30,
      },
      enable: true,
      speed: {
        min: 15,
        max: 25,
      },
    },
    wobble: {
      distance: 30,
      enable: true,
      move: true,
      speed: {
        min: -15,
        max: 15,
      },
    },
  },
  emitters: {
    position: {
      x: 50,
      y: 100,
    },
    size: {
      width: 0,
      height: 0,
    },
    rate: {
      quantity: 10,
      delay: 0.1,
    },
  },
};
