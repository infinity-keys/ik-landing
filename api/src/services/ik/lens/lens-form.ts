import type { MutationResolvers } from 'types/graphql'

import { AuthenticationError } from '@redwoodjs/graphql-server'

import { hasRole } from 'src/lib/auth'
import { appendToSheet } from 'src/lib/googleSheets'
import { logger } from 'src/lib/logger'
import { checkBalance } from 'src/lib/web3/check-balance'
import { updateUser } from 'src/services/users/users'

// The IK achievement token ids that make a user eligible for a Lens account
const LENS_ACCOUNT_TOKEN_IDS = [153, 169]

export const addLensFormRole: MutationResolvers['addLensFormRole'] = async ({
  externalAddress,
}) => {
  if (!context.currentUser?.address) {
    throw new AuthenticationError('Please sign in')
  }

  // They have already gone through this check
  if (hasRole('LENS_FORM')) {
    return { success: true }
  }

  const { claimed } = await checkBalance({
    account: context.currentUser.address,
    externalAddress: externalAddress ?? undefined,
    tokenIds: LENS_ACCOUNT_TOKEN_IDS,
  })

  if (!claimed) {
    return {
      success: false,
    }
  }

  await updateUser({
    input: {
      roles: [...context.currentUser.roles, 'LENS_FORM'],
    },
  })

  return {
    success: true,
  }
}

const SPREADSHEET_ID = process.env.GOOGLE_SHEET_ID_LENS_FORM

export const addLensForm: MutationResolvers['addLensForm'] = async ({
  input,
}) => {
  try {
    if (!SPREADSHEET_ID) {
      throw new Error('Missing SPREADSHEET_ID id in `lensForm`')
    }

    const now = new Date(Date.now())

    const response = await appendToSheet({
      spreadsheetId: SPREADSHEET_ID,
      values: [
        [
          input.name,
          input.walletAddress,
          input.socialLinkOne,
          input.socialLinkTwo,
          now.toISOString(),
        ],
      ],
    })

    return {
      success: response.statusText === 'OK',
    }
  } catch (e) {
    logger.error('Error in `/waitlistForm`', e)
    return {
      success: false,
    }
  }
}
