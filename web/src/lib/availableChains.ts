import {
  AVAX_CHAIN_ID,
  ETH_CHAIN_ID,
  OPTIMISM_CHAIN_ID,
  POLYGON_CHAIN_ID,
} from '@infinity-keys/constants'
import { AvailableChains } from 'types/graphql'

export const availableChainLookup: {
  [key: number]: AvailableChains
} = {
  [ETH_CHAIN_ID]: 'ETH',
  [POLYGON_CHAIN_ID]: 'POLY',
  [AVAX_CHAIN_ID]: 'AVAX',
  [OPTIMISM_CHAIN_ID]: 'OPT',
}

export const isValidAvailableChain = (
  chain: number | undefined,
  availableChains: (AvailableChains | null)[]
) => {
  if (typeof chain === 'undefined') return false
  const chainEnum = availableChainLookup[chain]
  return availableChains.includes(chainEnum)
}
