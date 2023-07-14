import type { LensKeypConnection } from '@prisma/client'

import {
  lensKeypConnections,
  lensKeypConnection,
  createLensKeypConnection,
  updateLensKeypConnection,
  deleteLensKeypConnection,
} from './lensKeypConnections'
import type { StandardScenario } from './lensKeypConnections.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe.skip('lensKeypConnections', () => {
  scenario(
    'returns all lensKeypConnections',
    async (scenario: StandardScenario) => {
      const result = await lensKeypConnections()

      expect(result.length).toEqual(
        Object.keys(scenario.lensKeypConnection).length
      )
    }
  )

  scenario(
    'returns a single lensKeypConnection',
    async (scenario: StandardScenario) => {
      const result = await lensKeypConnection({
        id: scenario.lensKeypConnection.one.id,
      })

      expect(result).toEqual(scenario.lensKeypConnection.one)
    }
  )

  scenario(
    'creates a lensKeypConnection',
    async (scenario: StandardScenario) => {
      const result = await createLensKeypConnection({
        input: {
          updatedAt: '2023-07-10T19:07:57.752Z',
          userId: scenario.lensKeypConnection.two.userId,
          lensAddress: 'String',
          keypAddress: 'String',
        },
      })

      expect(result.updatedAt).toEqual(new Date('2023-07-10T19:07:57.752Z'))
      expect(result.userId).toEqual(scenario.lensKeypConnection.two.userId)
      expect(result.lensAddress).toEqual('String')
      expect(result.keypAddress).toEqual('String')
    }
  )

  scenario(
    'updates a lensKeypConnection',
    async (scenario: StandardScenario) => {
      const original = (await lensKeypConnection({
        id: scenario.lensKeypConnection.one.id,
      })) as LensKeypConnection
      const result = await updateLensKeypConnection({
        id: original.id,
        input: { updatedAt: '2023-07-11T19:07:57.752Z' },
      })

      expect(result.updatedAt).toEqual(new Date('2023-07-11T19:07:57.752Z'))
    }
  )

  scenario(
    'deletes a lensKeypConnection',
    async (scenario: StandardScenario) => {
      const original = (await deleteLensKeypConnection({
        id: scenario.lensKeypConnection.one.id,
      })) as LensKeypConnection
      const result = await lensKeypConnection({ id: original.id })

      expect(result).toEqual(null)
    }
  )
})
