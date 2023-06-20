import type { APIGatewayEvent, Context } from 'aws-lambda'
import cookie from 'cookie'

import { db } from 'src/lib/db'
import { decryptAndDecompressText } from 'src/lib/encoding/encoding'
import { discordStrategy } from 'src/lib/passport'

export const handler = async (event: APIGatewayEvent, context: Context) => {
  console.log('************************* callback')
  console.log(event.headers.cookie)

  const strategy = discordStrategy()
  const { code, state } = event.queryStringParameters || {}

  const state2 = cookie.parse(event.headers.cookie || '')['state']

  const decrypt = decryptAndDecompressText(state2)
  console.log('stately: ', decrypt === state)

  return new Promise((resolve, reject) => {
    strategy._oauth2.getOAuthAccessToken(
      code,
      {
        grant_type: 'authorization_code',
        redirect_uri:
          'http://localhost:8910/.redwood/functions/discordCallback',
      },
      (err, accessToken, refreshToken) => {
        if (err) reject(err)

        strategy.userProfile(accessToken, async (err, profile) => {
          console.log('profile: ', profile)
          if (err) reject(err)
          const connection = await db.discordConnection.upsert({
            where: {
              userId: 'clfbeh0x90000l6z61p1dix7g',
            },
            create: {
              accessToken,
              refreshToken,
              discordId: profile.id,
              userId: 'clfbeh0x90000l6z61p1dix7g',
            },
            update: {
              accessToken,
              refreshToken,
              discordId: profile.id,
            },
          })
          console.log(connection)
          // At this point, you have the user's Discord profile
          // You would typically save it to your database here
          // For now, we'll just resolve with the profile
          resolve(profile)
        })
      }
    )
  })
}
