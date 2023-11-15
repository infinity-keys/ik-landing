export const schema = gql`
  type User {
    id: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    lastLoggedIn: DateTime!
    nonce: String
    authId: String
    username: String
    address: String
    externalAddress: String
    email: String
    lensProfile: String
    avatar: String
    roles: [SiteRole]!
    organizations: [OrganizationUser]!
    submissions: [Submission]!
    attempts: [Attempt]!
    solves: [Solve]!
    userRewards: [UserReward]!
    stepsSolvedCount: Int!
    puzzlesSolvedCount: Int!
    packsSolvedCount: Int!
    nftsSolvedCount: Int!
    refreshToken: String
    accessToken: String
    oauth: [OAuth]!
    oauthConnection: [OAuthConnection]!
    discordConnection: DiscordConnection
    lensKeypConnection: [LensKeypConnection]!
  }

  enum SiteRole {
    ADMIN
    VERIFIED
    ANONYMOUS
    LENS_FORM
  }

  type Query {
    users: [User!]! @requireAuth(roles: ["ADMIN"])
    user: User @requireAuth
  }

  input CreateUserInput {
    lastLoggedIn: DateTime!
    nonce: String
    authId: String
    username: String
    address: String
    externalAddress: String
    email: String
    lensProfile: String
    avatar: String
    roles: [SiteRole]!
    refreshToken: String
    accessToken: String
  }

  input UpdateUserInput {
    lastLoggedIn: DateTime
    nonce: String
    authId: String
    username: String
    address: String
    externalAddress: String
    email: String
    lensProfile: String
    avatar: String
    roles: [SiteRole]
    refreshToken: String
    accessToken: String
  }

  type Mutation {
    createUser(input: CreateUserInput!): User! @requireAuth(roles: ["ADMIN"])
    updateUser(input: UpdateUserInput!): User!
      @requireAuth(roles: ["VERIFIED", "ADMIN"])
    deleteUser(id: String!): User! @requireAuth(roles: ["ADMIN"])
  }
`
