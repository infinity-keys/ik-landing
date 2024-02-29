import { MutationResolvers } from 'types/graphql'

import { AuthenticationError } from '@redwoodjs/graphql-server'

import { hasRole } from 'src/lib/auth'
import { logger } from 'src/lib/logger'
import { updateUser } from 'src/services/users/users'

export const addCreatorToolsRole: MutationResolvers['addCreatorToolsRole'] =
  async () => {
    try {
      if (!context.currentUser) {
        throw new AuthenticationError('Please sign in')
      }

      if (hasRole('CREATOR_TOOLS_TESTER')) {
        return { success: true }
      }

      await updateUser({
        input: {
          roles: [...context.currentUser.roles, 'CREATOR_TOOLS_TESTER'],
        },
      })

      logger.info(
        `Added 'CREATOR_TOOLS_TESTER' role to user: ${context.currentUser.id}`
      )

      return {
        success: true,
      }
    } catch (e) {
      logger.error('Error in `addCreatorToolsRole`', e)

      return {
        success: false,
      }
    }
  }
