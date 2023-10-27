import type { MutationResolvers } from 'types/graphql'

import { appendToSheet } from 'src/lib/googleSheets'
import { logger } from 'src/lib/logger'

const SPREADSHEET_ID = process.env.GOOGLE_SHEET_ID_WAITLIST_FORM

export const addWaitlistForm: MutationResolvers['addWaitlistForm'] = async ({
  input,
}) => {
  try {
    if (!SPREADSHEET_ID) {
      throw new Error('Missing SPREADSHEET_ID id in `waitlistForm`')
    }

    const now = new Date(Date.now())

    const response = await appendToSheet({
      spreadsheetId: SPREADSHEET_ID,
      values: [
        [
          input.email,
          input.sponsor,
          input.creator,
          input.player,
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
