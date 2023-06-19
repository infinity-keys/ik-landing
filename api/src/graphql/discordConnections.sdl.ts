export const schema = gql`
  type DiscordConnection {
    id: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    user: User!
    userId: String!
    accessToken: String!
    refreshToken: String!
    discordId: String!
  }

  type Query {
    discordConnections: [DiscordConnection!]! @requireAuth
    discordConnection(id: String!): DiscordConnection @requireAuth
  }

  input CreateDiscordConnectionInput {
    userId: String!
    accessToken: String!
    refreshToken: String!
    discordId: String!
  }

  input UpdateDiscordConnectionInput {
    userId: String
    accessToken: String
    refreshToken: String
    discordId: String
  }

  type Mutation {
    createDiscordConnection(
      input: CreateDiscordConnectionInput!
    ): DiscordConnection! @requireAuth(roles: ["ADMIN"])
    updateDiscordConnection(
      id: String!
      input: UpdateDiscordConnectionInput!
    ): DiscordConnection! @requireAuth(roles: ["ADMIN"])
    deleteDiscordConnection(id: String!): DiscordConnection!
      @requireAuth(roles: ["ADMIN"])
  }
`
