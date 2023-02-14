import type { MutationResolvers } from 'types/graphql'

import { context } from '@redwoodjs/graphql-server'

import { db } from 'src/lib/db'
import { reconcileProgress } from 'src/services/ik/rewardables'

export const upsertUser: MutationResolvers['upsertUser'] = ({
  authId,
  email,
}) => {
  return db.user.upsert({
    create: {
      email,
      authId,
      siteRole: 'VERIFIED',
    },
    where: {
      authId,
    },
    update: {
      lastLoggedIn: new Date().toISOString(),
    },
  })
}
