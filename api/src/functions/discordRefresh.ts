import { discordStrategy } from 'src/lib/passport'

export const handler = async (event, context) => {
  const strategy = discordStrategy()

  // Replace with the actual logic to get the refresh token from your database
  const refreshToken = 'd3sP3p1yxha8K1moKl1mrFxYDIhrth'

  return new Promise((resolve, reject) => {
    strategy._oauth2.getOAuthAccessToken(
      refreshToken,
      {
        grant_type: 'refresh_token',
        redirect_uri:
          'http://localhost:8910/.redwood/functions/discordCallback',
      },
      (err, newAccessToken, newRefreshToken) => {
        console.log({ newAccessToken, newRefreshToken })
        if (err) reject(err)

        // Save the new access token and refresh token to your database here

        resolve({ accessToken: newAccessToken, refreshToken: newRefreshToken })
      }
    )
  })
}
