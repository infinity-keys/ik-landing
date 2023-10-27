import { google } from 'googleapis'

const sheets = google.sheets('v4')

export const jwtClient = new google.auth.JWT(
  process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
  undefined,
  process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  ['https://www.googleapis.com/auth/spreadsheets']
)

export const appendToSheet = async <T>({
  spreadsheetId,
  values,
}: {
  spreadsheetId: string
  values: T[][]
}) => {
  await jwtClient.authorize()

  const response = await sheets.spreadsheets.values.append({
    auth: jwtClient,
    spreadsheetId,
    range: 'Submissions',
    valueInputOption: 'RAW',
    insertDataOption: 'INSERT_ROWS',
    requestBody: {
      values,
    },
  })

  return response
}
