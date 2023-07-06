export const schema = gql`
  type SyncDiscordRolesResponse {
    success: Boolean!
    message: String
    errors: [String]
  }

  type Mutation {
    syncDiscordRoles: SyncDiscordRolesResponse! @requireAuth
  }
`
