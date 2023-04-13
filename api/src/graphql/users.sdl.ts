export const schema = gql`
  type User {
    id: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    lastLoggedIn: DateTime!
    nonce: String!
    authId: String
    username: String
    email: String
    twitterProfile: String
    discordProfile: String
    lensProfile: String
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
  }

  enum SiteRole {
    ADMIN
    VERIFIED
    ANONYMOUS
  }

  type Query {
    users: [User!]! @requireAuth(roles: ["ADMIN"])
    user: User @requireAuth
  }

  input CreateUserInput {
    lastLoggedIn: DateTime!
    nonce: String!
    authId: String
    username: String
    email: String
    twitterProfile: String
    discordProfile: String
    lensProfile: String
  }

  input UpdateUserInput {
    lastLoggedIn: DateTime
    nonce: String
    authId: String
    username: String
    email: String
    twitterProfile: String
    discordProfile: String
    lensProfile: String
  }

  type Mutation {
    createUser(input: CreateUserInput!): User! @requireAuth(roles: ["ADMIN"])
    updateUser(input: UpdateUserInput!): User! @requireAuth(roles: ["VERIFIED"])
    deleteUser(id: String!): User! @requireAuth(roles: ["ADMIN"])
  }
`
