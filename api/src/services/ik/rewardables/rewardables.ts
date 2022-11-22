import type { QueryResolvers } from 'types/graphql'

import { db } from 'src/lib/db'

export const rewardableBySlug: QueryResolvers['rewardableBySlug'] = ({
  slug,
}) => {
  const query = db.rewardable.findUnique({
    where: { slug },
    // Guarantee steps are always in asc order
    // select: {
    //   id: true,
    //   name: true,
    //   slug: true,
    //   explanation: true,
    //   createdAt: true,
    //   updatedAt: true,
    //   listPublicly: true,
    //   type: true,
    //   orgId: true,
    //   puzzle: {
    //     select: {
    //       id: true,
    //       steps: {
    //         orderBy: {
    //           stepSortWeight: 'asc',
    //         },
    //         select: {
    //           id: true,
    //           stepSortWeight: true,
    //         },
    //       },
    //     },
    //   },
    // },
    // include: {
    //   puzzle: {
    //     include: {
    //       steps: {
    //         orderBy: {
    //           stepSortWeight: 'asc',
    //         },
    //       },
    //     },
    //   },
    // },
  })
  console.log('Clearly in rewardableBySlug resolver')
  query.then((output) => console.log(output.puzzle.steps))

  return query
}
