import type { MutationResolvers } from 'types/graphql'

import { AuthenticationError } from '@redwoodjs/graphql-server'

import { hasRole } from 'src/lib/auth'
import { db } from 'src/lib/db'
import { checkBalance } from 'src/lib/web3/check-balance'
import { updateUser } from 'src/services/users/users'

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

export const addLensFormRole: MutationResolvers['addLensFormRole'] = async ({
  externalAddress,
}) => {
  if (!context.currentUser?.address) {
    throw new AuthenticationError('Please sign in')
  }

  if (hasRole('LENS_FORM')) {
    return { success: true }
  }

  const { claimedTokens } = await checkBalance({
    account: context.currentUser.address,
    externalAddress: externalAddress ?? undefined,
    // @TODO: put this somewhere else
    tokenIds: [1, 2, 35],
  })

  const hasClaimed = claimedTokens?.some((b) => b)

  if (!hasClaimed) {
    return {
      success: false,
    }
  }

  const user = await updateUser({
    input: {
      roles: [...context.currentUser.roles, 'LENS_FORM'],
    },
  })

  return {
    success: true,
  }
}
