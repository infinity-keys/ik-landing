import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario({
  // Define the "fixture" to write into your test database here
  // See guide: https://redwoodjs.com/docs/testing#scenarios
  user: {
    social: {
      data: {
        email: 'social@login.com',
      },
    },
    wallet: {
      data: {
        id: 'wallet-id',
        authId: 'wallet-auth-id',
        externalAddress: '1234',
      },
    },
  },
})

export type StandardScenario = ScenarioData<unknown>
