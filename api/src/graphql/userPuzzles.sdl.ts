export const schema = gql`
  type UserPuzzle {
    id: String!
    user: User!
    userId: String!
    name: String!
    slug: String!
    explanation: String!
    successMessage: String!
    challenge: String!
    solution: String
    imageUrl: String
  }

  type Query {
    userPuzzles: [UserPuzzle!]! @requireAuth
    userPuzzle(id: String!): UserPuzzle @requireAuth
  }

  input CreateUserPuzzleInput {
    userId: String!
    name: String!
    slug: String!
    explanation: String!
    successMessage: String!
    challenge: String!
    solution: String
    imageUrl: String
  }

  input UpdateUserPuzzleInput {
    userId: String
    name: String
    slug: String
    explanation: String
    successMessage: String
    challenge: String
    solution: String
    imageUrl: String
  }

  type Mutation {
    createUserPuzzle(input: CreateUserPuzzleInput!): UserPuzzle! @requireAuth
    updateUserPuzzle(id: String!, input: UpdateUserPuzzleInput!): UserPuzzle!
      @requireAuth
    deleteUserPuzzle(id: String!): UserPuzzle! @requireAuth
  }
`
