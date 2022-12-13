export const schema = gql`
  type OrganizationUser {
    id: String!
    organization: Organization!
    orgId: String!
    user: User!
    userId: String!
    userOrgRole: OrgRole!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  enum OrgRole {
    MANAGER
    MEMBER
  }

  type Query {
    organizationUsers: [OrganizationUser!]! @requireAuth
    organizationUser(id: String!): OrganizationUser @requireAuth
  }

  input CreateOrganizationUserInput {
    orgId: String!
    userId: String!
    userOrgRole: OrgRole!
  }

  input UpdateOrganizationUserInput {
    orgId: String
    userId: String
    userOrgRole: OrgRole
  }

  type Mutation {
    createOrganizationUser(
      input: CreateOrganizationUserInput!
    ): OrganizationUser! @requireAuth
    updateOrganizationUser(
      id: String!
      input: UpdateOrganizationUserInput!
    ): OrganizationUser! @requireAuth
    deleteOrganizationUser(id: String!): OrganizationUser! @requireAuth
  }
`
