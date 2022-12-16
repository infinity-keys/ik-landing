export const schema = gql`
  type User {
    id: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    lastLoggedIn: DateTime!
    nonce: String!
    authId: String
    username: String
    publicAddress: String
    email: String
    twitterProfile: String
    discordProfile: String
    lensProfile: String
    siteRole: SiteRole!
    organizations: [OrganizationUser]!
    submissions: [Submission]!
    attempts: [Attempt]!
  }

  enum SiteRole {
    ADMIN
    VERIFIED
    ANONYMOUS
  }

  type Query {
    users: [User!]! @requireAuth
    user(authId: String!): User @requireAuth
  }

  input CreateUserInput {
    lastLoggedIn: DateTime!
    nonce: String!
    authId: String
    username: String
    publicAddress: String
    email: String
    twitterProfile: String
    discordProfile: String
    lensProfile: String
    siteRole: SiteRole!
  }

  input UpdateUserInput {
    lastLoggedIn: DateTime
    nonce: String
    authId: String
    username: String
    publicAddress: String
    email: String
    twitterProfile: String
    discordProfile: String
    lensProfile: String
    siteRole: SiteRole
  }

  type Mutation {
    createUser(input: CreateUserInput!): User! @requireAuth
    updateUser(id: String!, input: UpdateUserInput!): User! @requireAuth
    deleteUser(id: String!): User! @requireAuth
  }
`
