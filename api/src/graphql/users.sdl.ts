export const schema = gql`
  type User {
    id: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    authId: String
    address: String
    externalAddress: String
    email: String
    lensProfile: String
    roles: [SiteRole]!
    organizations: [OrganizationUser]!
    submissions: [Submission]!
    attempts: [Attempt]!
    solves: [Solve]!
    userRewards: [UserReward]!
    stepsSolvedCount: Int
    puzzlesSolvedCount: Int
    packsSolvedCount: Int
    nftsSolvedCount: Int
    discordConnection: DiscordConnection
    lensKeypConnection: [LensKeypConnection]!
  }

  enum SiteRole {
    ADMIN
    VERIFIED
    ANONYMOUS
    LENS_FORM
    CREATOR_TOOLS_TESTER
  }

  type Query {
    users: [User!]! @requireAuth(roles: ["ADMIN"])
    user: User @requireAuth
  }

  input CreateUserInput {
    authId: String
    address: String
    externalAddress: String
    email: String
    lensProfile: String
    roles: [SiteRole]!
  }

  input UpdateUserInput {
    authId: String
    address: String
    externalAddress: String
    email: String
    lensProfile: String
    roles: [SiteRole]
  }

  type Mutation {
    createUser(input: CreateUserInput!): User! @requireAuth(roles: ["ADMIN"])
    updateUser(input: UpdateUserInput!): User!
      @requireAuth(roles: ["VERIFIED", "ADMIN"])
    deleteUser(id: String!): User! @requireAuth(roles: ["ADMIN"])
  }
`
