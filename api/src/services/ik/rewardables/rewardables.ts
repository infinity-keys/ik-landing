import { PAGINATION_COUNTS } from '@infinity-keys/constants'
import type { QueryResolvers } from 'types/graphql'

import { db } from 'src/lib/db'

export const rewardableBySlug: QueryResolvers['rewardableBySlug'] = ({
  slug,
  type,
}) => {
  return db.rewardable.findUnique({
    where: {
      slug_type: {
        slug,
        type,
      },
    },
  })
}

export const rewardablesCollection: QueryResolvers['rewardablesCollection'] =
  async ({ type, page = 1, count = 16 }) => {
    const skip = (page - 1) * count
    const [smallestPaginationCount] = PAGINATION_COUNTS
    const take = PAGINATION_COUNTS.includes(count)
      ? count
      : smallestPaginationCount

    return {
      rewardables: await db.rewardable.findMany({
        where: { type, listPublicly: true },
        take,
        skip,
        orderBy: { createdAt: 'desc' },
      }),
      totalCount: await db.rewardable.count({
        where: { type, listPublicly: true },
      }),
    }
  }
