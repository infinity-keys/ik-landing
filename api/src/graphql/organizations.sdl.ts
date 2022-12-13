export const schema = gql`
  type Organization {
    id: String!
    name: String!
    slug: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    users: [OrganizationUser]!
    rewardables: [Rewardable]!
  }

  type Query {
    organizations: [Organization!]! @requireAuth
    organization(id: String!): Organization @requireAuth
  }

  input CreateOrganizationInput {
    name: String!
    slug: String!
  }

  input UpdateOrganizationInput {
    name: String
    slug: String
  }

  type Mutation {
    createOrganization(input: CreateOrganizationInput!): Organization!
      @requireAuth
    updateOrganization(
      id: String!
      input: UpdateOrganizationInput!
    ): Organization! @requireAuth
    deleteOrganization(id: String!): Organization! @requireAuth
  }
`
