export const schema = gql`
  type LensKeypConnection {
    id: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    user: User!
    userId: String!
    lensAddress: String!
    keypAddress: String!
  }

  type Query {
    lensKeypConnections: [LensKeypConnection!]! @requireAuth(roles: ["ADMIN"])
    lensKeypConnection(id: String!): LensKeypConnection
      @requireAuth(roles: ["ADMIN"])
  }

  input CreateLensKeypConnectionInput {
    userId: String!
    lensAddress: String!
    keypAddress: String!
  }

  input UpdateLensKeypConnectionInput {
    userId: String
    lensAddress: String
    keypAddress: String
  }

  type Mutation {
    createLensKeypConnection(
      input: CreateLensKeypConnectionInput!
    ): LensKeypConnection! @requireAuth(roles: ["ADMIN"])
    updateLensKeypConnection(
      id: String!
      input: UpdateLensKeypConnectionInput!
    ): LensKeypConnection! @requireAuth(roles: ["ADMIN"])
    deleteLensKeypConnection(id: String!): LensKeypConnection!
      @requireAuth(roles: ["ADMIN"])
  }
`
