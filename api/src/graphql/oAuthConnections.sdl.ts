export const schema = gql`
  type OAuthConnection {
    id: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    user: User!
    userId: String!
    type: String!
    revoked: Boolean!
    refreshToken: String
    accessToken: String!
    expiration: DateTime
  }

  input CreateOAuthConnectionInput {
    userId: String!
    type: String!
    revoked: Boolean!
    refreshToken: String
    accessToken: String!
    expiration: DateTime
  }

  input UpdateOAuthConnectionInput {
    userId: String
    type: String
    revoked: Boolean
    refreshToken: String
    accessToken: String
    expiration: DateTime
  }
`
