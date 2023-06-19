import type { DiscordConnection } from '@prisma/client'

import {
  discordConnections,
  discordConnection,
  createDiscordConnection,
  updateDiscordConnection,
  deleteDiscordConnection,
} from './discordConnections'
import type { StandardScenario } from './discordConnections.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('discordConnections', () => {
  scenario(
    'returns all discordConnections',
    async (scenario: StandardScenario) => {
      const result = await discordConnections()

      expect(result.length).toEqual(
        Object.keys(scenario.discordConnection).length
      )
    }
  )

  scenario(
    'returns a single discordConnection',
    async (scenario: StandardScenario) => {
      const result = await discordConnection({
        id: scenario.discordConnection.one.id,
      })

      expect(result).toEqual(scenario.discordConnection.one)
    }
  )

  scenario(
    'creates a discordConnection',
    async (scenario: StandardScenario) => {
      const result = await createDiscordConnection({
        input: {
          updatedAt: '2023-06-19T16:45:09.668Z',
          userId: scenario.discordConnection.two.userId,
          accessToken: 'String',
          refreshToken: 'String',
          discordId: 'String',
        },
      })

      expect(result.updatedAt).toEqual(new Date('2023-06-19T16:45:09.668Z'))
      expect(result.userId).toEqual(scenario.discordConnection.two.userId)
      expect(result.accessToken).toEqual('String')
      expect(result.refreshToken).toEqual('String')
      expect(result.discordId).toEqual('String')
    }
  )

  scenario(
    'updates a discordConnection',
    async (scenario: StandardScenario) => {
      const original = (await discordConnection({
        id: scenario.discordConnection.one.id,
      })) as DiscordConnection
      const result = await updateDiscordConnection({
        id: original.id,
        input: { updatedAt: '2023-06-20T16:45:09.668Z' },
      })

      expect(result.updatedAt).toEqual(new Date('2023-06-20T16:45:09.668Z'))
    }
  )

  scenario(
    'deletes a discordConnection',
    async (scenario: StandardScenario) => {
      const original = (await deleteDiscordConnection({
        id: scenario.discordConnection.one.id,
      })) as DiscordConnection
      const result = await discordConnection({ id: original.id })

      expect(result).toEqual(null)
    }
  )
})
