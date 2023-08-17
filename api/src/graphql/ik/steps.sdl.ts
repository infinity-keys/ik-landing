export const schema = gql`
  type Query {
    stepBySlug(slug: String!, stepNum: Int!): Step! @requireAuth
  }
`
