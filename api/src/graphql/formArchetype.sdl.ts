export const schema = gql`
  # replaced with "rewardable" below in "type Mutation"
  type CreateBurdPuzzleResponse {
    success: Boolean!
  }

  # we made this custon b.c. rewardableId is required
  # on input CreatePuzzleInput {} in puzzles.sdl.ts
  input BurdPuzzleInput {
    isAnon: Boolean!
  }

  # let's trigger a change to the file again!
  # and again till this work!!!
  input CreateBurdPuzzleInput {
    rewardable: CreateRewardableInput!
    puzzle: BurdPuzzleInput!
    # steps: [CreateStepInput!]!
  }

  type Mutation {
    # I already have the types that exist for a step, so you don't need a
    # CreateBurdStepType...
    createBurdPuzzle(input: CreateBurdPuzzleInput!): Rewardable!
      @requireAuth(roles: ["ADMIN"])
  }
`
// DON'T FIGHT: you don't need to run types in dev mode after changing this
// Actually this isn't true 4 now..
