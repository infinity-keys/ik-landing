import passport from 'passport'
import DiscordStrategy from 'passport-discord'

export const discordStrategy = () => {
  const strategy = new DiscordStrategy(
    {
      clientID: process.env.DISCORD_TEST_CLIENT || '',
      clientSecret: process.env.DISCORD_TEST_SECRET || '',
      callbackURL: 'http://localhost:8910/.redwood/functions/discordCallback',
      scope: ['identify', 'guilds'],
    },
    function (accessToken, refreshToken, profile, done) {
      // Save the user data here
      console.log('!!passport')
      return done(null, profile)
    }
  )

  passport.use(strategy)

  return strategy
}
