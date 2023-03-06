import { RewardableType } from 'types/graphql'

import { routes } from '@redwoodjs/router'

//
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
