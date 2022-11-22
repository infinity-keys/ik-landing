export const schema = gql`
  type Query {
    rewardableBySlug(slug: String!): Rewardable @requireAuth
  }
`
