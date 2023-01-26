import { useEffect, useState } from 'react'

import { PAGINATION_COUNTS } from '@infinity-keys/constants'
import { buildUrlString, ThumbnailGridLayoutType } from '@infinity-keys/core'
import clsx from 'clsx'
import loCapitalize from 'lodash/capitalize'
import type { FindRewardables } from 'types/graphql'

import { routes, useParams } from '@redwoodjs/router'

import GridLayoutButtons from 'src/components/GridLayoutButtons/GridLayoutButtons'
import GridPagination from 'src/components/GridPagination/GridPagination'
import Seo from 'src/components/Seo/Seo'
import Thumbnail from 'src/components/Thumbnail/Thumbnail'

const buildUrl = (type) => {
  if (type === 'PUZZLE') {
    return {
      collection: '/puzzles',
      single: routes.puzzleLanding,
    }
  }
  if (type === 'PACK') {
    return {
      collection: '/packs',
      single: routes.packLanding,
    }
  }
}

const RewardablesList = ({
  rewardables,
  totalCount,
}: FindRewardables['rewardablesCollection']) => {
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
  const collectionType = rewardables[0].type

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
        title={`Infinity Keys ${loCapitalize(rewardables[0].type)}s`}
        url={buildUrlString(`/puzzles`)}
      />

      {layout !== ThumbnailGridLayoutType.Unknown && (
        <>
          <GridLayoutButtons
            isGrid={layout === ThumbnailGridLayoutType.Grid}
            thumbnailCount={thumbnailCount}
            setView={setView}
            urlBase={buildUrl(collectionType).collection}
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
              return (
                <li key={rewardable.id}>
                  <Thumbnail
                    isGrid={layout === ThumbnailGridLayoutType.Grid}
                    id={rewardable.id}
                    name={rewardable.name}
                    href={buildUrl(collectionType).single({
                      slug: rewardable.slug,
                    })}
                    cloudinaryId={rewardable.nfts[0]?.cloudinaryId}
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
            urlBase={buildUrl(collectionType).collection}
          />
        </>
      )}
    </>
  )
}

export default RewardablesList
