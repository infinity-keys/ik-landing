import clsx from "clsx";

import Bars4Icon from "@heroicons/react/20/solid/Bars4Icon";
import Squares2X2Icon from "@heroicons/react/20/solid/Squares2X2Icon";

import Dropdown from "@components/thumbnail-grid/dropdown";

import { ThumbnailGridLayoutType } from "@lib/types";
import { PAGINATION_COUNTS } from "@lib/constants";

export interface LayoutButtonsProps {
  isGrid: boolean;
  thumbnailCount: number;
  urlBase: string;
  setView: (gridLayout: ThumbnailGridLayoutType) => void;
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
        onClick={() => setView(ThumbnailGridLayoutType.List)}
        aria-label="set list view"
        className={clsx(
          "border mr-2 bg-white/10 p-2 rounded-md transition-all duration-200",
          !isGrid ? "border-white/20" : "border-transparent text-gray-400"
        )}
      >
        <Bars4Icon className="h-5 w-5" aria-hidden="true" />
      </button>
      <button
        onClick={() => setView(ThumbnailGridLayoutType.Grid)}
        aria-label="set grid view"
        className={clsx(
          "border bg-white/10 p-2 rounded-md transition-all duration-200 hover:bg-white/20",
          isGrid ? "border-white/20" : "border-transparent text-gray-400"
        )}
      >
        <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
      </button>
      <Dropdown
        urlBase={urlBase}
        currentCount={thumbnailCount || smallestThumbnailCount}
      />
    </div>
  );
};

export default LayoutButtons;
