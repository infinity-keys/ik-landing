import type { MutationResolvers } from 'types/graphql'

import { db } from 'src/lib/db'

export const upsertUser: MutationResolvers['upsertUser'] = ({
  authId,
  email,
}) => {
  return db.user.upsert({
    where: {
      authId,
    },
    update: {
      lastLoggedIn: new Date().toISOString(),
    },
    create: {
      email,
      authId,
      siteRole: 'VERIFIED',
    },
  })
}
