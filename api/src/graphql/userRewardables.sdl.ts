// This is used to figure out which rewardables are to be displayed on
// a user's profile page.
export const schema = gql`
  enum RewardableType {
    PUZZLE
    PACK
    BUNDLE
  }
  # We need the rewardable's image displayed on the user's profile page
  # These are assigned to the Nft.
  type Nft {
    id: String!
    cloudinaryId: String!
  }

  # We need the correct rewardable
  type Rewardable {
    id: String!
    name: String!
    slug: String!
    organization: Organization!
  }

  type Organization {
    id: String!
    name: String!
  }

  type Query {
    userRewardables(userId: String!): [Rewardable!]! @requireAuth
  }
`
