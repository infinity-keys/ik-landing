import type { OrganizationUser } from '@prisma/client'

import {
  organizationUsers,
  organizationUser,
  createOrganizationUser,
  updateOrganizationUser,
  deleteOrganizationUser,
} from './organizationUsers'
import type { StandardScenario } from './organizationUsers.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('organizationUsers', () => {
  scenario(
    'returns all organizationUsers',
    async (scenario: StandardScenario) => {
      const result = await organizationUsers()

      expect(result.length).toEqual(
        Object.keys(scenario.organizationUser).length
      )
    }
  )

  scenario(
    'returns a single organizationUser',
    async (scenario: StandardScenario) => {
      const result = await organizationUser({
        id: scenario.organizationUser.one.id,
      })

      expect(result).toEqual(scenario.organizationUser.one)
    }
  )

  scenario('creates a organizationUser', async (scenario: StandardScenario) => {
    const result = await createOrganizationUser({
      input: {
        orgId: scenario.organizationUser.two.orgId,
        userId: scenario.organizationUser.two.userId,
        updatedAt: '2022-11-15T05:58:53.139Z',
      },
    })

    expect(result.orgId).toEqual(scenario.organizationUser.two.orgId)
    expect(result.userId).toEqual(scenario.organizationUser.two.userId)
    expect(result.updatedAt).toEqual(new Date('2022-11-15T05:58:53.139Z'))
  })

  scenario('updates a organizationUser', async (scenario: StandardScenario) => {
    const original = (await organizationUser({
      id: scenario.organizationUser.one.id,
    })) as OrganizationUser
    const result = await updateOrganizationUser({
      id: original.id,
      input: { updatedAt: '2022-11-16T05:58:53.139Z' },
    })

    expect(result.updatedAt).toEqual(new Date('2022-11-16T05:58:53.139Z'))
  })

  scenario('deletes a organizationUser', async (scenario: StandardScenario) => {
    const original = (await deleteOrganizationUser({
      id: scenario.organizationUser.one.id,
    })) as OrganizationUser
    const result = await organizationUser({ id: original.id })

    expect(result).toEqual(null)
  })
})
