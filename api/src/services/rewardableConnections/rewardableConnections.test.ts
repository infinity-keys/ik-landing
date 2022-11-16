import type { RewardableConnection } from '@prisma/client'

import {
  rewardableConnections,
  rewardableConnection,
  createRewardableConnection,
  updateRewardableConnection,
  deleteRewardableConnection,
} from './rewardableConnections'
import type { StandardScenario } from './rewardableConnections.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('rewardableConnections', () => {
  scenario(
    'returns all rewardableConnections',
    async (scenario: StandardScenario) => {
      const result = await rewardableConnections()

      expect(result.length).toEqual(
        Object.keys(scenario.rewardableConnection).length
      )
    }
  )

  scenario(
    'returns a single rewardableConnection',
    async (scenario: StandardScenario) => {
      const result = await rewardableConnection({
        id: scenario.rewardableConnection.one.id,
      })

      expect(result).toEqual(scenario.rewardableConnection.one)
    }
  )

  scenario(
    'creates a rewardableConnection',
    async (scenario: StandardScenario) => {
      const result = await createRewardableConnection({
        input: {
          parentId: scenario.rewardableConnection.two.parentId,
          childId: scenario.rewardableConnection.two.childId,
          updatedAt: '2022-11-15T05:32:31.320Z',
        },
      })

      expect(result.parentId).toEqual(
        scenario.rewardableConnection.two.parentId
      )
      expect(result.childId).toEqual(scenario.rewardableConnection.two.childId)
      expect(result.updatedAt).toEqual(new Date('2022-11-15T05:32:31.320Z'))
    }
  )

  scenario(
    'updates a rewardableConnection',
    async (scenario: StandardScenario) => {
      const original = (await rewardableConnection({
        id: scenario.rewardableConnection.one.id,
      })) as RewardableConnection
      const result = await updateRewardableConnection({
        id: original.id,
        input: { updatedAt: '2022-11-16T05:32:31.321Z' },
      })

      expect(result.updatedAt).toEqual(new Date('2022-11-16T05:32:31.321Z'))
    }
  )

  scenario(
    'deletes a rewardableConnection',
    async (scenario: StandardScenario) => {
      const original = (await deleteRewardableConnection({
        id: scenario.rewardableConnection.one.id,
      })) as RewardableConnection
      const result = await rewardableConnection({ id: original.id })

      expect(result).toEqual(null)
    }
  )
})
