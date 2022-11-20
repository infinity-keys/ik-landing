import type { Rewardable } from '@prisma/client'

import {
  rewardables,
  rewardable,
  createRewardable,
  updateRewardable,
  deleteRewardable,
} from './rewardables'
import type { StandardScenario } from './rewardables.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('rewardables', () => {
  scenario('returns all rewardables', async (scenario: StandardScenario) => {
    const result = await rewardables()

    expect(result.length).toEqual(Object.keys(scenario.rewardable).length)
  })

  scenario(
    'returns a single rewardable',
    async (scenario: StandardScenario) => {
      const result = await rewardable({ id: scenario.rewardable.one.id })

      expect(result).toEqual(scenario.rewardable.one)
    }
  )

  scenario('creates a rewardable', async (scenario: StandardScenario) => {
    const result = await createRewardable({
      input: {
        updatedAt: '2022-11-20T21:02:16.032Z',
        name: 'String',
        slug: 'String8485461',
        explanation: 'String',
        type: 'PUZZLE',
        orgId: scenario.rewardable.two.orgId,
      },
    })

    expect(result.updatedAt).toEqual(new Date('2022-11-20T21:02:16.032Z'))
    expect(result.name).toEqual('String')
    expect(result.slug).toEqual('String8485461')
    expect(result.explanation).toEqual('String')
    expect(result.type).toEqual('PUZZLE')
    expect(result.orgId).toEqual(scenario.rewardable.two.orgId)
  })

  scenario('updates a rewardable', async (scenario: StandardScenario) => {
    const original = (await rewardable({
      id: scenario.rewardable.one.id,
    })) as Rewardable
    const result = await updateRewardable({
      id: original.id,
      input: { updatedAt: '2022-11-21T21:02:16.032Z' },
    })

    expect(result.updatedAt).toEqual(new Date('2022-11-21T21:02:16.032Z'))
  })

  scenario('deletes a rewardable', async (scenario: StandardScenario) => {
    const original = (await deleteRewardable({
      id: scenario.rewardable.one.id,
    })) as Rewardable
    const result = await rewardable({ id: original.id })

    expect(result).toEqual(null)
  })
})
