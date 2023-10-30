export const schema = gql`
  type AddWaitlistFormResponse {
    success: Boolean
  }

  input AddWaitlistFormInput {
    email: String!
    sponsor: Boolean
    creator: Boolean
    player: Boolean
  }

  type Mutation {
    addWaitlistForm(input: AddWaitlistFormInput!): AddWaitlistFormResponse!
      @skipAuth
  }
`
