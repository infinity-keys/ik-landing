import type { Prisma, OrganizationUser } from '@prisma/client'

import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.OrganizationUserCreateArgs>({
  organizationUser: {
    one: {
      data: {
        updatedAt: '2022-11-15T05:58:53.166Z',
        organization: {
          create: {
            name: 'String',
            slug: 'String2587207',
            updatedAt: '2022-11-15T05:58:53.166Z',
          },
        },
        user: { create: { updatedAt: '2022-11-15T05:58:53.166Z' } },
      },
    },
    two: {
      data: {
        updatedAt: '2022-11-15T05:58:53.166Z',
        organization: {
          create: {
            name: 'String',
            slug: 'String9673686',
            updatedAt: '2022-11-15T05:58:53.166Z',
          },
        },
        user: { create: { updatedAt: '2022-11-15T05:58:53.166Z' } },
      },
    },
  },
})

export type StandardScenario = ScenarioData<
  OrganizationUser,
  'organizationUser'
>
