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
    solved: [Solve]!
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
    roles: [SiteRole]!
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
    roles: [SiteRole]!
  }

  type Mutation {
    createUser(input: CreateUserInput!): User! @requireAuth
    updateUser(id: String!, input: UpdateUserInput!): User! @requireAuth
    deleteUser(id: String!): User! @requireAuth
  }
`
