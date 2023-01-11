import { useEffect, useState } from 'react'

import { PAGINATION_COUNTS } from '@infinity-keys/constants'
import { buildUrlString, ThumbnailGridLayoutType } from '@infinity-keys/core'
import clsx from 'clsx'
import type { FindRewardables } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'

import GridLayoutButtons from 'src/components/GridLayoutButtons/GridLayoutButtons'
import GridPagination from 'src/components/GridPagination/GridPagination'
import Seo from 'src/components/Seo/Seo'
import Thumbnail from 'src/components/Thumbnail/Thumbnail'
import Wrapper from 'src/components/Wrapper/Wrapper'

const RewardablesList = ({ rewardables }: FindRewardables) => {
  const [layout, setLayout] = useState<ThumbnailGridLayoutType>(
    ThumbnailGridLayoutType.Unknown
  )
  const [smallestThumbnailCount] = PAGINATION_COUNTS
  // const [count, page] = query.packsArgs ||
  //   query.puzzlesArgs || [smallestThumbnailCount, "1"];
  const thumbnailCount = 16
  const pageNum = 1
  const isPack = true

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
      <Seo title="Infinity Keys Puzzles" url={buildUrlString(`/puzzles`)} />

      <main className="">
        {layout !== ThumbnailGridLayoutType.Unknown && (
          <div className="w-full">
            <GridLayoutButtons
              isGrid={layout === ThumbnailGridLayoutType.Grid}
              thumbnailCount={thumbnailCount}
              setView={setView}
              urlBase={'puzzle'}
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
                // const data = thumbnailData(thumbnail)
                return (
                  <li key={rewardable.id}>
                    <Thumbnail
                      isGrid={layout === ThumbnailGridLayoutType.Grid}
                      id={rewardable.id}
                      name={rewardable.name}
                      href={`/puzzle/${rewardable.slug}`}
                      // cloudinary_id={'laskdj'}
                    />
                  </li>
                )
              })}
            </ul>

            <GridPagination
              isFirstPage={false}
              isLastPage={false}
              pageNum={pageNum}
              thumbnailCount={thumbnailCount}
              urlBase={'puzzle'}
            />
          </div>
        )}
      </main>
    </Wrapper>
  )
}

export default RewardablesList
