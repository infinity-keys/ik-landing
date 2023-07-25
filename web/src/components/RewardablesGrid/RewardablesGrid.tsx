import { useEffect, useState } from 'react'

import { PAGINATION_COUNTS } from '@infinity-keys/constants'
import { ThumbnailGridLayoutType, ThumbnailProgress } from '@infinity-keys/core'
import clsx from 'clsx'
import type { FindRewardables } from 'types/graphql'

import { useParams } from '@redwoodjs/router'

import { useAuth } from 'src/auth'
import GridLayoutButtons from 'src/components/GridLayoutButtons/GridLayoutButtons'
import GridPagination from 'src/components/GridPagination/GridPagination'
import Thumbnail from 'src/components/Thumbnail/Thumbnail'
import { rewardableLandingRoute } from 'src/lib/urlBuilders'
import { GridLandingRouteType } from 'src/lib/urlBuilders'

import Wrapper from '../Wrapper/Wrapper'

const RewardablesList = ({
  rewardables,
  totalCount,
  landingRoute,
  labeled,
}: FindRewardables['rewardablesCollection'] & {
  landingRoute?: GridLandingRouteType
  labeled: FindRewardables['labeled']
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
    <Wrapper>
      <div className="w-full">
        {labeled && labeled?.length > 0 && (
          <div className="mb-8">
            <p className="py-4 text-3xl font-bold">Featured Puzzles</p>
            <ul
              className={clsx(
                'grid grid-cols-1 gap-6 sm:grid-cols-2',
                'md:grid-cols-3 lg:grid-cols-4'
              )}
            >
              {labeled.map((rewardable) => {
                if (!rewardable) return null
                const solvedArray =
                  rewardable.type === 'PACK'
                    ? rewardable.asParent.map(
                        (parent) => !!parent?.childRewardable.userRewards.length
                      )
                    : rewardable?.puzzle?.steps.map(
                        (step) => !!step?.hasUserCompletedStep
                      )

                return (
                  <li
                    key={rewardable.id}
                    className="flex justify-center sm:block"
                  >
                    <Thumbnail
                      isGrid={true}
                      id={rewardable.id}
                      name={rewardable.name}
                      href={rewardableLandingRoute({
                        type: rewardable.type,
                        slug: rewardable.slug,
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
          </div>
        )}

        {layout !== ThumbnailGridLayoutType.Unknown && (
          <div>
            <p className="py-4 text-3xl font-bold" data-cy="grid-label">
              Puzzles
            </p>

            <GridLayoutButtons
              isGrid={layout === ThumbnailGridLayoutType.Grid}
              thumbnailCount={thumbnailCount}
              setView={setView}
              rewardableType={landingRoute || rewardableType}
            />

            <ul
              className={clsx(
                'grid grid-cols-1 gap-6 pt-12 sm:grid-cols-2',
                layout === ThumbnailGridLayoutType.Grid
                  ? 'md:grid-cols-3 lg:grid-cols-4'
                  : 'lg:grid-cols-3 xl:grid-cols-4'
              )}
            >
              {rewardables
                .filter(({ sortType }) => !sortType)
                .map((rewardable) => {
                  const solvedArray =
                    rewardable.type === 'PACK'
                      ? rewardable.asParent.map(
                          (parent) =>
                            !!parent?.childRewardable.userRewards.length
                        )
                      : rewardable?.puzzle?.steps.map(
                          (step) => !!step?.hasUserCompletedStep
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
          </div>
        )}
      </div>
    </Wrapper>
  )
}

export default RewardablesList
