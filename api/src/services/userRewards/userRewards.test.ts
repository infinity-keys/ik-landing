import type { UserReward } from '@prisma/client'

import {
  userRewards,
  userReward,
  createUserReward,
  updateUserReward,
  deleteUserReward,
} from './userRewards'
import type { StandardScenario } from './userRewards.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('userRewards', () => {
  scenario('returns all userRewards', async (scenario: StandardScenario) => {
    const result = await userRewards()

    expect(result.length).toEqual(Object.keys(scenario.userReward).length)
  })

  scenario(
    'returns a single userReward',
    async (scenario: StandardScenario) => {
      const result = await userReward({ id: scenario.userReward.one.id })

      expect(result).toEqual(scenario.userReward.one)
    }
  )

  scenario('creates a userReward', async (scenario: StandardScenario) => {
    const result = await createUserReward({
      input: {
        userId: scenario.userReward.two.userId,
        rewardableId: scenario.userReward.two.rewardableId,
      },
    })

    expect(result.userId).toEqual(scenario.userReward.two.userId)
    expect(result.rewardableId).toEqual(scenario.userReward.two.rewardableId)
  })

  scenario('updates a userReward', async (scenario: StandardScenario) => {
    const original = (await userReward({
      id: scenario.userReward.one.id,
    })) as UserReward
    const result = await updateUserReward({
      id: original.id,
      input: { userId: scenario.userReward.two.userId },
    })

    expect(result.userId).toEqual(scenario.userReward.two.userId)
  })

  scenario('deletes a userReward', async (scenario: StandardScenario) => {
    const original = (await deleteUserReward({
      id: scenario.userReward.one.id,
    })) as UserReward
    const result = await userReward({ id: original.id })

    expect(result).toEqual(null)
  })
})
