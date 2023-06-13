export const schema = gql`
  type StepLensApi {
    id: String!
    step: Step!
    stepId: String!
    checkType: LensCheckType!
    followedUserIds: [String]!
    requireAllFollowedUserIds: Boolean
  }

  enum LensCheckType {
    HAS_COMPLETED_PROFILE
    HAS_GENESIS_POST
    IS_FOLLOWING_USER
  }

  type Query {
    stepLensApis: [StepLensApi!]! @requireAuth(roles: ["ADMIN"])
    stepLensApi(id: String!): StepLensApi @requireAuth(roles: ["ADMIN"])
  }

  input CreateStepLensApiInput {
    stepId: String!
    checkType: LensCheckType!
    followedUserIds: [String]!
    requireAllFollowedUserIds: Boolean
  }

  input UpdateStepLensApiInput {
    stepId: String
    checkType: LensCheckType
    followedUserIds: [String]!
    requireAllFollowedUserIds: Boolean
  }

  type Mutation {
    createStepLensApi(input: CreateStepLensApiInput!): StepLensApi!
      @requireAuth(roles: ["ADMIN"])
    updateStepLensApi(
      id: String!
      input: UpdateStepLensApiInput!
    ): StepLensApi! @requireAuth(roles: ["ADMIN"])
    deleteStepLensApi(id: String!): StepLensApi! @requireAuth(roles: ["ADMIN"])
  }
`
