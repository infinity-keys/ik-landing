import { google } from 'googleapis'
import type { MutationResolvers } from 'types/graphql'

import { AuthenticationError } from '@redwoodjs/graphql-server'

import { hasRole } from 'src/lib/auth'
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

  const { claimedTokens } = await checkBalance({
    account: context.currentUser.address,
    externalAddress: externalAddress ?? undefined,
    tokenIds: LENS_ACCOUNT_TOKEN_IDS,
  })

  // Users just need to have claimed one of these
  const hasClaimed = claimedTokens?.some((b) => b)

  if (!hasClaimed) {
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

const sheets = google.sheets('v4')
const SPREADSHEET_ID = process.env.GOOGLE_SHEET_ID_LENS_FORM
const jwtClient = new google.auth.JWT(
  process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
  undefined,
  process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  ['https://www.googleapis.com/auth/spreadsheets']
)

export const addLensForm: MutationResolvers['addLensForm'] = async ({
  input,
}) => {
  await jwtClient.authorize()

  const now = new Date(Date.now())

  const response = await sheets.spreadsheets.values.append({
    auth: jwtClient,
    spreadsheetId: SPREADSHEET_ID,
    range: 'Submissions',
    valueInputOption: 'RAW',
    insertDataOption: 'INSERT_ROWS',
    requestBody: {
      values: [
        [
          input.name,
          input.walletAddress,
          input.socialLinkOne,
          input.socialLinkTwo,
          now.toISOString(),
        ],
      ],
    },
  })

  return {
    success: response.statusText === 'OK',
  }
}
