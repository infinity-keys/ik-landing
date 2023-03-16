import Bars4Icon from '@heroicons/react/20/solid/Bars4Icon'
import Squares2X2Icon from '@heroicons/react/20/solid/Squares2X2Icon'
import { PAGINATION_COUNTS } from '@infinity-keys/constants'
import { ThumbnailGridLayoutType } from '@infinity-keys/core'
import clsx from 'clsx'
import { RewardableType } from 'types/graphql'

import Dropdown from 'src/components/GridDropdown/GridDropdown'

export interface GridLayoutButtonsProps {
  isGrid: boolean
  thumbnailCount: number
  rewardableType: RewardableType
  setView: (gridLayout: ThumbnailGridLayoutType) => void
}

const GridLayoutButtons = ({
  isGrid,
  thumbnailCount,
  rewardableType,
  setView,
}: GridLayoutButtonsProps) => {
  const [smallestThumbnailCount] = PAGINATION_COUNTS

  return (
    <div className="mt-8 flex">
      <button
        onClick={() => setView(ThumbnailGridLayoutType.List)}
        aria-label="set list view"
        className={clsx(
          'mr-2 rounded-md border bg-white/10 p-2 transition-all duration-200',
          !isGrid ? 'border-white/20' : 'border-transparent text-gray-400'
        )}
      >
        <Bars4Icon className="h-5 w-5" aria-hidden="true" />
      </button>
      <button
        onClick={() => setView(ThumbnailGridLayoutType.Grid)}
        aria-label="set grid view"
        className={clsx(
          'rounded-md border bg-white/10 p-2 transition-all duration-200 hover:bg-white/20',
          isGrid ? 'border-white/20' : 'border-transparent text-gray-400'
        )}
      >
        <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
      </button>
      <Dropdown
        rewardableType={rewardableType}
        currentCount={thumbnailCount || smallestThumbnailCount}
      />
    </div>
  )
}

export default GridLayoutButtons
