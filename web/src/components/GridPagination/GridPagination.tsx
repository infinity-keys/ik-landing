import ArrowLeftIcon from '@heroicons/react/20/solid/ArrowLeftIcon'
import ArrowRightIcon from '@heroicons/react/20/solid/ArrowRightIcon'
import { PAGINATION_COUNTS } from '@infinity-keys/constants'
import clsx from 'clsx'
import { RewardableType } from 'types/graphql'

import { Link } from '@redwoodjs/router'

import { rewardableGridRoute, GridLandingRouteType } from 'src/lib/urlBuilders'

export interface GridPaginationProps {
  isFirstPage: boolean
  isLastPage: boolean
  thumbnailCount: number
  pageNum: number
  rewardableType: GridLandingRouteType
}

const GridPagination = ({
  isFirstPage,
  isLastPage,
  thumbnailCount,
  pageNum,
  rewardableType,
}: GridPaginationProps) => {
  const [smallestThumbnailCount] = PAGINATION_COUNTS
  const toDefaultPage =
    thumbnailCount === smallestThumbnailCount && pageNum === 2

  return (
    <div
      className={clsx(
        'mb-8 flex',
        isFirstPage && !isLastPage ? 'justify-end' : 'justify-between'
      )}
    >
      {!isFirstPage && (
        <Link
          to={
            toDefaultPage
              ? rewardableGridRoute({ type: rewardableType })
              : rewardableGridRoute({
                  type: rewardableType,
                  perPageCount: thumbnailCount,
                  pageNum: pageNum - 1,
                })
          }
          className="previous flex items-center rounded-md bg-white/10 p-2 px-4 py-2 transition hover:bg-white/20"
        >
          <ArrowLeftIcon className="mr-2 h-4 w-4" aria-hidden="true" /> Previous
        </Link>
      )}

      {!isLastPage && (
        <Link
          to={rewardableGridRoute({
            type: rewardableType,
            perPageCount: thumbnailCount,
            pageNum: pageNum + 1,
          })}
          className="next flex items-center rounded-md bg-white/10 p-2 px-4 py-2 transition hover:bg-white/20"
        >
          Next
          <ArrowRightIcon className="ml-2 h-4 w-4" aria-hidden="true" />
        </Link>
      )}
    </div>
  )
}

export default GridPagination
