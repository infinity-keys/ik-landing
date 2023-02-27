import Link from "next/link";
import Avatar from "boring-avatars";
import clsx from "clsx";
import CheckIcon from "@heroicons/react/24/solid/CheckIcon";

import MinimalKeyLogo from "@components/svg/minimal-key-logo-svg";
import CloudImage from "./cloud-image";
import { ThumbnailProgress } from "@lib/types";
import { FormattedThumbnailType } from "@lib/utils";

interface ThumbnailProps extends FormattedThumbnailType {
  isGrid: boolean;
  progress?: ThumbnailProgress;
}

const Thumbnail = ({
  name,
  id,
  isGrid,
  url,
  cloudinary_id,
  progress = ThumbnailProgress.Unknown,
}: ThumbnailProps) => {
  return (
    <div
      className={clsx(
        "puzzle-thumb bg-blue-800 rounded-lg shadow cursor-pointer relative",
        {
          "flex flex-col text-center": isGrid,
        }
      )}
    >
      {progress === ThumbnailProgress.Completed && (
        <div className="bg-turquoise/40 h-6 w-6 flex items-center justify-center rounded-full absolute top-0 right-0 translate-x-1/3 -translate-y-1/3  sm:top-2 sm:right-2 sm:translate-x-0 sm:translate-y-0">
          <CheckIcon className="h-4 w-4 text-turquoise" />
        </div>
      )}
      <Link href={url}>
        <div
          className={clsx(
            "flex-1 flex",
            isGrid ? "p-8 flex-col" : "items-center p-4 lg:px-6"
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
                <div className="next-image-block scale-105	">
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
                colors={["#101D42", "#E400FF", "#3FCCBB", "#8500AC", "#303B5B"]}
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
              <div className="w-8 h-8 text-turquoise">
                <MinimalKeyLogo />
              </div>
            </dd>
          </dl>
        </div>
      </Link>
    </div>
  );
};

export default Thumbnail;
