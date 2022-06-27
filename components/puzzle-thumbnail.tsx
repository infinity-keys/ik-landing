import Link from "next/link";
import Image from "next/image";
import Avatar from "boring-avatars";

import { routeLandingUrl } from "@lib/utils";
import MinimalKeyLogo from '@components/svg/minimal-key-logo-svg'

interface PuzzleThumbProps {
  landing_route: string;
  puzzle_id: string;
  simple_name: string;
}

const PuzzleThumbnail = (puzzle: PuzzleThumbProps) => {
  return (
    <div className="flex flex-col text-center bg-blue-800 rounded-lg shadow cursor-pointer">
      <Link href={routeLandingUrl(puzzle.landing_route)}>
        <div className="flex-1 flex flex-col p-8">
          <div className="w-32 h-32 flex-shrink-0 mx-auto">
            <Avatar
              size={128}
              name={puzzle.puzzle_id}
              variant="marble"
              colors={["#101D42", "#E400FF", "#3FCCBB", "#8500AC", "#303B5B"]}
            />
          </div>
          <h3 className="mt-6 text-gray-200 text-sm font-medium">
            {puzzle.simple_name}
          </h3>
          <dl className="mt-1 flex-grow flex flex-col justify-between">
            <dt className="sr-only">Logo</dt>
            <dd className="mt-4 flex justify-center">
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
