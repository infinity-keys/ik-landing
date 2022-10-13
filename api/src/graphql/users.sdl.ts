export const schema = gql`
  type User {
    userId: String!
    createdAt: DateTime!
    username: String
    publicAddress: String
    nonce: String!
    email: String
    twitterProfile: String
    discordProfile: String
    lensProfile: String
  }

  type Query {
    users: [User!]! @requireAuth
    user(userId: String!): User @requireAuth
  }

  input CreateUserInput {
    username: String
    publicAddress: String
    nonce: String!
    email: String
    twitterProfile: String
    discordProfile: String
    lensProfile: String
  }

  input UpdateUserInput {
    username: String
    publicAddress: String
    nonce: String
    email: String
    twitterProfile: String
    discordProfile: String
    lensProfile: String
  }

  type Mutation {
    createUser(input: CreateUserInput!): User! @requireAuth
    updateUser(userId: String!, input: UpdateUserInput!): User! @requireAuth
    deleteUser(userId: String!): User! @requireAuth
  }
`
