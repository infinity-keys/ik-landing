export const schema = gql`
  type StepLensApi {
    id: String!
    step: Step!
    stepId: String!
    checkType: LensCheckType!
    followedUserIds: [String]
  }

  enum LensCheckType {
    HAS_COMPLETED_PROFILE
    HAS_GENESIS_POST
    IS_FOLLOWING_USER
  }

  type Query {
    stepLensApis: [StepLensApi!]! @requireAuth
    stepLensApi(id: String!): StepLensApi @requireAuth
  }

  input CreateStepLensApiInput {
    stepId: String!
    checkType: LensCheckType!
    followedUserIds: [String]
  }

  input UpdateStepLensApiInput {
    stepId: String
    checkType: LensCheckType
    followedUserIds: [String]
  }

  type Mutation {
    createStepLensApi(input: CreateStepLensApiInput!): StepLensApi! @requireAuth
    updateStepLensApi(
      id: String!
      input: UpdateStepLensApiInput!
    ): StepLensApi! @requireAuth
    deleteStepLensApi(id: String!): StepLensApi! @requireAuth
  }
`
