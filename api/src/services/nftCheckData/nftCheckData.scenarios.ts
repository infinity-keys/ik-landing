import type { Prisma, NftCheckDatum } from '@prisma/client'

import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.NftCheckDatumCreateArgs>({
  nftCheckDatum: { one: { data: {} }, two: { data: {} } },
})

export type StandardScenario = ScenarioData<NftCheckDatum, 'nftCheckDatum'>
