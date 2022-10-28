export const schema = gql`
  type Mutation {
    createSubmissionWithOptionalEmail(
      input: CreateSubmissionInput!
    ): Submission! @requireAuth
  }
`
