import type { QueryResolvers } from 'types/graphql'

import { db } from 'src/lib/db'

export const stepBySlug: QueryResolvers['stepBySlug'] = async ({
  slug,
  stepNum,
}) => {
  const rewardable = await db.rewardable.findUnique({
    where: {
      slug_type: {
        slug,
        type: 'PUZZLE',
      },
    },
    select: {
      puzzle: {
        select: {
          steps: {
            where: {
              stepSortWeight: stepNum,
            },
          },
        },
      },
    },
  })

  if (!rewardable?.puzzle?.steps[0]) {
    throw new Error('Could not find step')
  }

  return rewardable.puzzle.steps[0]
}
