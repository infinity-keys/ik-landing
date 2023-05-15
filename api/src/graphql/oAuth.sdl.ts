export const schema = gql`
  type OAuth {
    state: String!
    codeChallenge: String!
    codeVerifier: String!
    createdAt: DateTime!
    user: User
    userId: String
  }

  type LoginUrl {
    type: String!
    text: String
    url: String
  }

  type CodeGrantResponse {
    action: String
    text: String
    status: CodeGrantStatus
  }

  type RevokeResponse {
    status: CodeGrantStatus
  }

  type Mutation {
    oAuthUrl(type: String!): LoginUrl! @requireAuth
    codeGrant(type: String!, code: String!, state: String): CodeGrantResponse!
      @skipAuth
    revokeOAuth(type: String!): RevokeResponse! @requireAuth
  }

  enum CodeGrantStatus {
    SUCCESS
    FAILED
  }
`
