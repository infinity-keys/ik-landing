import { useEffect, useState } from 'react'
import { useAuth } from '@redwoodjs/auth'

import { PAGINATION_COUNTS } from '@infinity-keys/constants'
import {
  buildUrlString,
  ThumbnailGridLayoutType,
  ThumbnailProgress,
} from '@infinity-keys/core'
import clsx from 'clsx'
import loCapitalize from 'lodash/capitalize'
import type { FindRewardables } from 'types/graphql'

import { useParams } from '@redwoodjs/router'

import GridLayoutButtons from 'src/components/GridLayoutButtons/GridLayoutButtons'
import GridPagination from 'src/components/GridPagination/GridPagination'
import Seo from 'src/components/Seo/Seo'
import Thumbnail from 'src/components/Thumbnail/Thumbnail'
import { rewardableLandingRoute } from 'src/lib/urlBuilders'

import { GridLandingRouteType } from 'src/lib/urlBuilders'

const RewardablesList = ({
  rewardables,
  totalCount,
  landingRoute,
}: FindRewardables['rewardablesCollection'] & {
  landingRoute?: GridLandingRouteType
}) => {
  const { isAuthenticated } = useAuth()
  const { page, count } = useParams()
  const [layout, setLayout] = useState<ThumbnailGridLayoutType>(
    ThumbnailGridLayoutType.Unknown
  )
  const pageNum = parseInt(page, 10) || 1
  const countNum = parseInt(count, 10)

  const [smallestThumbnailCount] = PAGINATION_COUNTS
  const thumbnailCount =
    !count || !PAGINATION_COUNTS.includes(countNum)
      ? smallestThumbnailCount
      : countNum
  const isLastPage = pageNum * thumbnailCount >= totalCount

  const isFirstPage = !pageNum || pageNum === 1
  const rewardableType = rewardables[0].type

  useEffect(() => {
    const thumbnailGridLayout = window.localStorage.getItem(
      'thumbnailGridLayout'
    )
    setLayout(
      thumbnailGridLayout
        ? JSON.parse(thumbnailGridLayout)
        : ThumbnailGridLayoutType.List
    )
  }, [])

  const setView = (gridLayout: ThumbnailGridLayoutType) => {
    setLayout(gridLayout)
    window.localStorage.setItem(
      'thumbnailGridLayout',
      JSON.stringify(gridLayout)
    )
  }

  return (
    <>
      <Seo
        title={`${loCapitalize(rewardables[0].type)}s`}
        url={buildUrlString(`/puzzles`)}
      />

      {layout !== ThumbnailGridLayoutType.Unknown && (
        <>
          <GridLayoutButtons
            isGrid={layout === ThumbnailGridLayoutType.Grid}
            thumbnailCount={thumbnailCount}
            setView={setView}
            rewardableType={landingRoute || rewardableType}
          />

          <ul
            className={clsx(
              'grid grid-cols-1 gap-6 py-8 sm:grid-cols-2',
              layout === ThumbnailGridLayoutType.Grid
                ? 'md:grid-cols-3 lg:grid-cols-4'
                : 'lg:grid-cols-3 xl:grid-cols-4'
            )}
          >
            {rewardables.map((rewardable) => {
              const solvedArray =
                rewardable.type === 'PACK'
                  ? rewardable.asParent.map(
                      ({ childRewardable }) =>
                        !!childRewardable.userRewards.length
                    )
                  : rewardable.puzzle.steps.map(
                      ({ hasUserCompletedStep }) => hasUserCompletedStep
                    )

              return (
                <li
                  key={rewardable.id}
                  className="flex justify-center sm:block"
                >
                  <Thumbnail
                    isGrid={layout === ThumbnailGridLayoutType.Grid}
                    id={rewardable.id}
                    name={rewardable.name}
                    href={rewardableLandingRoute({
                      type: rewardable.type,
                      slug: rewardable.slug,
                      anonPuzzle: rewardable.puzzle?.isAnon,
                    })}
                    cloudinaryId={rewardable.nfts[0]?.cloudinaryId}
                    progress={
                      rewardable.userRewards.length
                        ? ThumbnailProgress.Completed
                        : ThumbnailProgress.Unknown
                    }
                    solvedArray={isAuthenticated ? solvedArray : []}
                  />
                </li>
              )
            })}
          </ul>

          <GridPagination
            isFirstPage={isFirstPage}
            isLastPage={isLastPage}
            pageNum={pageNum || 1}
            thumbnailCount={thumbnailCount}
            rewardableType={landingRoute || rewardableType}
          />
        </>
      )}
    </>
  )
}

export default RewardablesList
