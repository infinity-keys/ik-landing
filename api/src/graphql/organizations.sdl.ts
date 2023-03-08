export const schema = gql`
  type Organization {
    id: String!
    name: String!
    slug: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    users: [OrganizationUser]! @requireAuth(roles: ["ADMIN"])
    rewardables: [Rewardable]!
  }

  type Query {
    organizations: [Organization!]! @requireAuth(roles: ["ADMIN"])
    organization(id: String!): Organization @requireAuth(roles: ["ADMIN"])
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
      @requireAuth(roles: ["ADMIN"])
    updateOrganization(
      id: String!
      input: UpdateOrganizationInput!
    ): Organization! @requireAuth(roles: ["ADMIN"])
    deleteOrganization(id: String!): Organization!
      @requireAuth(roles: ["ADMIN"])
  }
`
