import { discordStrategy } from 'src/lib/passport'

export const handler = async (event, context) => {
  console.log('************************* callback')

  const strategy = discordStrategy()
  const code = event.queryStringParameters.code

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

        strategy.userProfile(accessToken, (err, profile) => {
          if (err) reject(err)
          console.log('!!callback')
          // At this point, you have the user's Discord profile
          // You would typically save it to your database here
          // For now, we'll just resolve with the profile
          resolve(profile)
        })
      }
    )
  })
}
