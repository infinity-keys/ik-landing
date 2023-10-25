import { google } from 'googleapis'
import type { MutationResolvers } from 'types/graphql'

const sheets = google.sheets('v4')
const SPREADSHEET_ID = process.env.GOOGLE_SHEET_ID_WAITLIST_FORM
const jwtClient = new google.auth.JWT(
  process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
  undefined,
  process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  ['https://www.googleapis.com/auth/spreadsheets']
)

export const addWaitlistForm: MutationResolvers['addWaitlistForm'] = async ({
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
          input.email,
          input.sponsor,
          input.creator,
          input.player,
          now.toISOString(),
        ],
      ],
    },
  })

  return {
    success: response.statusText === 'OK',
  }
}
