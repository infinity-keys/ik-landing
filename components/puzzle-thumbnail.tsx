import Link from "next/link";
import Avatar from "boring-avatars";
import clsx from "clsx";

import { routeLandingUrl } from "@lib/utils";
import MinimalKeyLogo from "@components/svg/minimal-key-logo-svg";

interface PuzzleThumbProps {
  landing_route: string;
  puzzle_id: string;
  simple_name: string;
  isGrid: boolean;
}

const PuzzleThumbnail = (puzzle: PuzzleThumbProps) => {
  return (
    <div
      className={clsx(
        "puzzle-thumb bg-blue-800 rounded-lg shadow cursor-pointer",
        {
          "flex flex-col text-center": puzzle.isGrid,
        }
      )}
    >
      <Link href={routeLandingUrl(puzzle.landing_route)}>
        <div
          className={clsx(
            "flex-1 flex",
            puzzle.isGrid ? "p-8 flex-col" : "items-center p-4 lg:px-6"
          )}
        >
          <div
            className={clsx(
              "flex-shrink-0",
              puzzle.isGrid ? "w-32 h-32 mx-auto" : "mr-4"
            )}
          >
            <Avatar
              size={puzzle.isGrid ? 128 : 56}
              name={puzzle.puzzle_id}
              variant="marble"
              colors={["#101D42", "#E400FF", "#3FCCBB", "#8500AC", "#303B5B"]}
            />
          </div>
          <h3
            className={clsx("text-gray-200 text-sm font-medium", {
              "mt-6": puzzle.isGrid,
            })}
          >
            {puzzle.simple_name}
          </h3>
          <dl
            className={clsx("flex-grow", {
              " mt-1 flex flex-col justify-between": puzzle.isGrid,
            })}
          >
            <dt className="sr-only">Logo</dt>
            <dd
              className={clsx(
                "flex",
                puzzle.isGrid ? "mt-4 justify-center" : "justify-end"
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

export default PuzzleThumbnail;
