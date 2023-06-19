import type { Prisma, DiscordConnection } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.DiscordConnectionCreateArgs>({
  discordConnection: {
    one: {
      data: {
        updatedAt: '2023-06-19T16:45:09.683Z',
        accessToken: 'String',
        refreshToken: 'String',
        discordId: 'String',
        user: { create: { updatedAt: '2023-06-19T16:45:09.683Z' } },
      },
    },
    two: {
      data: {
        updatedAt: '2023-06-19T16:45:09.683Z',
        accessToken: 'String',
        refreshToken: 'String',
        discordId: 'String',
        user: { create: { updatedAt: '2023-06-19T16:45:09.683Z' } },
      },
    },
  },
})

export type StandardScenario = ScenarioData<
  DiscordConnection,
  'discordConnection'
>
