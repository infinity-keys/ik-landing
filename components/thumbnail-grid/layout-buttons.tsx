import clsx from "clsx";

import ViewListIcon from "@heroicons/react/solid/ViewListIcon";
import ViewGridIcon from "@heroicons/react/solid/ViewGridIcon";

import Dropdown from "@components/thumbnail-grid/dropdown";

import { ThumbnailLayoutType } from "@lib/types";
import { PAGINATION_COUNTS } from "@lib/constants";

export interface LayoutButtonsProps {
  isGrid: boolean;
  thumbnailCount: number;
  urlBase: string;
  setView: (gridLayout: ThumbnailLayoutType) => void;
}

const LayoutButtons = ({
  isGrid,
  thumbnailCount,
  urlBase,
  setView,
}: LayoutButtonsProps) => {
  const [smallestThumbnailCount] = PAGINATION_COUNTS;

  return (
    <div className="flex mt-8">
      <button
        onClick={() => setView(ThumbnailLayoutType.List)}
        aria-label="set list view"
        className={clsx(
          "border mr-2 bg-white/10 p-2 rounded-md transition-all duration-200",
          !isGrid ? "border-white/20" : "border-transparent text-gray-400"
        )}
      >
        <ViewListIcon className="h-5 w-5" aria-hidden="true" />
      </button>
      <button
        onClick={() => setView(ThumbnailLayoutType.Grid)}
        aria-label="set grid view"
        className={clsx(
          "border bg-white/10 p-2 rounded-md transition-all duration-200 hover:bg-white/20",
          isGrid ? "border-white/20" : "border-transparent text-gray-400"
        )}
      >
        <ViewGridIcon className="h-5 w-5" aria-hidden="true" />
      </button>
      <Dropdown
        urlBase={urlBase}
        currentCount={thumbnailCount || smallestThumbnailCount}
      />
    </div>
  );
};

export default LayoutButtons;
