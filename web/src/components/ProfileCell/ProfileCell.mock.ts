// Define your own mock data here:
export const standard = (/* vars, { ctx, req } */) => ({
  user: {
    id: '42',
    username: 'John Doe',
    email: 'johndoe@gmail.com',
    twitterProfile: 'https://twitter.com/johndoe',
    discordProfile: 'https://discord.com/johndoe',
    lensProfile: 'https://lens.xyz/johndoe',
    authId: 'auth0|1234567890',
    stepsSolvedCount: 1,
    puzzlesSolvedCount: 0,
    packsSolvedCount: 0,
    nftsSolvedCount: 0,
    userRewards: [
      {
        id: '1',
      },
    ],
  },
})
