import type { MutationResolvers } from 'types/graphql'

import { db } from 'src/lib/db'

export const upsertUser: MutationResolvers['upsertUser'] = ({
  authId,
  email,
}) => {
  return db.user.upsert({
    create: {
      email,
      authId,
      roles: ['VERIFIED'],
    },
    where: {
      authId,
    },
    update: {
      lastLoggedIn: new Date().toISOString(),
    },
  })
}
