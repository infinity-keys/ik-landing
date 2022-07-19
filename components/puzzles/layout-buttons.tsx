import clsx from "clsx";
import { ViewListIcon, ViewGridIcon } from "@heroicons/react/solid";
import PuzzlesDropdown from "@components/puzzles/dropdown";
import { GridType } from "@components/puzzles/layout";

export interface LayoutButtonsProps {
  isGrid: boolean;
  puzzlesCount: number;
  setView: (gridLayout: GridType) => void;
}

const LayoutButtons = ({
  isGrid,
  puzzlesCount,
  setView,
}: LayoutButtonsProps) => {
  return (
    <div className="flex mt-8">
      <button
        onClick={() => setView(GridType.List)}
        aria-label="set list view"
        className={clsx(
          "border mr-2 bg-white/10 p-2 rounded-md transition-all duration-200",
          !isGrid ? "border-white/20" : "border-transparent text-gray-400"
        )}
      >
        <ViewListIcon className="h-5 w-5" aria-hidden="true" />
      </button>
      <button
        onClick={() => setView(GridType.Grid)}
        aria-label="set grid view"
        className={clsx(
          "border bg-white/10 p-2 rounded-md transition-all duration-200 hover:bg-white/20",
          isGrid ? "border-white/20" : "border-transparent text-gray-400"
        )}
      >
        <ViewGridIcon className="h-5 w-5" aria-hidden="true" />
      </button>
      <PuzzlesDropdown currentCount={puzzlesCount || 8} />
    </div>
  );
};

export default LayoutButtons;
