import type { QueryResolvers } from 'types/graphql'

import { db } from 'src/lib/db'

export const rewardableBySlug: QueryResolvers['rewardableBySlug'] = ({
  slug,
}) => {
  return db.rewardable.findUnique({
    where: { slug },
  })
}
