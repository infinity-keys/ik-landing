import { MutationResolvers } from 'types/graphql'

import { AuthenticationError } from '@redwoodjs/graphql-server'

import { db } from 'src/lib/db'
import { logger } from 'src/lib/logger'

export const upsertLensKeypConnect: MutationResolvers['upsertLensKeypConnect'] =
  async ({ lensAddress }) => {
    try {
      if (!context.currentUser?.id) {
        throw new AuthenticationError('Must be logged in')
      }

      // Delete connection when user disconnects their Lens account
      if (!lensAddress) {
        await db.lensKeypConnection.delete({
          where: {
            userId: context.currentUser.id,
          },
        })

        return {
          success: true,
        }
      }

      const user = await db.user.findUniqueOrThrow({
        where: { id: context.currentUser.id },
        select: { address: true },
      })

      if (!user?.address) {
        throw new Error("Cannot find user's Keyp wallet")
      }

      await db.lensKeypConnection.upsert({
        where: { userId: context.currentUser.id },
        create: {
          userId: context.currentUser.id,
          keypAddress: user.address,
          lensAddress,
        },
        update: {
          lensAddress,
        },
      })

      return {
        success: true,
      }
    } catch (e) {
      logger.error('Error in `upsertLensKeypConnect`', e)

      return {
        errors: [
          ...(e instanceof Error
            ? [e.message]
            : ['Error connecting Lens and Keyp accounts']),
        ],
      }
    }
  }
