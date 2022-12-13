import type { Prisma, Organization } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.OrganizationCreateArgs>({
  organization: {
    one: {
      data: {
        name: 'String',
        slug: 'String6265634',
        updatedAt: '2022-11-15T05:59:02.179Z',
      },
    },
    two: {
      data: {
        name: 'String',
        slug: 'String8294106',
        updatedAt: '2022-11-15T05:59:02.179Z',
      },
    },
  },
})

export type StandardScenario = ScenarioData<Organization, 'organization'>
