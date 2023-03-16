import { RewardableType } from 'types/graphql'

import { routes } from '@redwoodjs/router'

// Creates the landing page routes for our rewardables. Does not handle steps
export const rewardableLandingRoute = ({
  slug,
  type,
  anonPuzzle,
}: {
  slug: string
  type: RewardableType
  anonPuzzle?: boolean
}) => {
  switch (type) {
    case 'PUZZLE':
      return anonPuzzle
        ? routes.anonPuzzleLanding({ slug })
        : routes.puzzleLanding({ slug })
    case 'PACK':
      return routes.packLanding({ slug })
    // @TODO: enable this when we support bundles
    // case 'BUNDLE':
    //   return routes.bundleLanding({ slug })

    default:
      throw new Error(`rewardableLandingRoute type '${type}' not supported`)
  }
}
export const rewardableGridRoute = ({
  type,
  perPageCount,
  pageNum,
}: {
  type: RewardableType
  perPageCount?: number
  pageNum?: number
}) => {
  const paginated = perPageCount && pageNum

  switch (type) {
    case 'PUZZLE':
      return paginated
        ? routes.puzzlesPagination({ count: perPageCount, page: pageNum })
        : routes.puzzles()
    case 'PACK':
      return paginated
        ? routes.packsPagination({ count: perPageCount, page: pageNum })
        : routes.packs()

    // @TODO: enable this when we support bundles
    // case 'BUNDLE':
    //   return paginated
    //     ? routes.bundlesPagination({ count: perPageCount, page: pageNum })
    //     : routes.bundles()

    default:
      throw new Error(`rewardableGridRoute type '${type}' not supported`)
  }
}
