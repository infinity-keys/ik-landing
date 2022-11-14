import Avatar from "boring-avatars";
import clsx from "clsx";
import CheckIcon from "@heroicons/react/24/solid/CheckIcon";

import MinimalKeyLogo from "@components/svg/minimal-key-logo-svg";
import CloudImage from "./cloud-image";
import { ThumbnailProgress } from "@lib/types";
import Sparkles from "./sparkles";
import { useEffect, useState } from "react";

interface ThumbnailProps {
  id: string;
  name: string;
  isGrid: boolean;
  cloudinary_id?: string;
  progress?: ThumbnailProgress;
}

const SPARKLE_ANIMATION_DURATION = 3500;

const EventThumbnail = ({
  name,
  id,
  isGrid,
  cloudinary_id,
  progress = ThumbnailProgress.Unknown,
}: ThumbnailProps) => {
  const [animationAvailable, setAnimationAvailable] = useState(true);

  // turns off sparkle animation
  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (progress === ThumbnailProgress.Completed) {
      timer = setTimeout(() => {
        setAnimationAvailable(false);
      }, SPARKLE_ANIMATION_DURATION);
    }

    return () => clearTimeout(timer);
  }, [progress]);

  return (
    <div className="shadow-3xl">
      <div
        className={clsx(
          "p-[2px] rounded-lg",
          progress === ThumbnailProgress.Completed
            ? "event-thumb-unlocked animate-pulseGoldGradient overflow-hidden relative"
            : "animate-pulseRed bg-[#cc3f3f]/50"
        )}
      >
        <div
          className={clsx(
            "puzzle-thumb bg-blue-800 rounded-md relative h-full",
            {
              "flex flex-col text-center": isGrid,
            }
          )}
        >
          {progress === ThumbnailProgress.Completed && (
            <Sparkles isRunning={animationAvailable} />
          )}

          <div
            className={clsx(
              "flex-1 flex",
              isGrid ? "py-8 px-6 flex-col" : "items-center p-4 lg:px-6"
            )}
          >
            <div
              className={clsx(
                "flex-shrink-0",
                isGrid ? "w-32 h-32 mx-auto" : "w-14 h-14 mr-4"
              )}
            >
              {cloudinary_id ? (
                <div className="overflow-hidden rounded-full">
                  <div
                    className={clsx(
                      "next-image-block scale-105",
                      progress !== ThumbnailProgress.Completed && "grayscale"
                    )}
                  >
                    <CloudImage
                      height={128}
                      width={128}
                      id={cloudinary_id}
                      circle
                    />
                  </div>
                </div>
              ) : (
                <Avatar
                  size={isGrid ? 128 : 56}
                  name={id}
                  variant="marble"
                  colors={[
                    "#101D42",
                    "#E400FF",
                    "#3FCCBB",
                    "#8500AC",
                    "#303B5B",
                  ]}
                />
              )}
            </div>

            <h3
              className={clsx("text-gray-200 text-sm font-medium", {
                "mt-6": isGrid,
              })}
            >
              {name}
            </h3>

            <dl
              className={clsx("flex-grow", {
                " mt-1 flex flex-col justify-between": isGrid,
              })}
            >
              <dt className="sr-only">Logo</dt>
              <dd
                className={clsx(
                  "flex",
                  isGrid ? "mt-4 justify-center" : "justify-end"
                )}
              >
                <div
                  className={clsx(
                    "w-8 h-8 ",
                    progress === ThumbnailProgress.Completed
                      ? "text-turquoise"
                      : "text-[#cc3f3f8e]"
                  )}
                >
                  <MinimalKeyLogo />
                </div>
              </dd>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventThumbnail;
