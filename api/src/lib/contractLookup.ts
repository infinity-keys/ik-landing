import { ConnectionInfo } from '@ethersproject/web'
import { IKAchievementABI__factory } from '@infinity-keys/contracts'
import { ethers } from 'ethers'

import { AVAX_RPC, ETH_RPC, OPTIMISM_RPC, POLYGON_RPC } from './rpc'
import {
  AVAX_CHAIN_ID,
  CONTRACT_ADDRESS_AVAX,
  CONTRACT_ADDRESS_ETH,
  CONTRACT_ADDRESS_OPTIMISM,
  CONTRACT_ADDRESS_POLYGON,
  ETH_CHAIN_ID,
  OPTIMISM_CHAIN_ID,
  POLYGON_CHAIN_ID,
} from './walletConstants'

export const chainRPCLookup: {
  [key: number]: string
} = {
  [ETH_CHAIN_ID]: ETH_RPC,
  [POLYGON_CHAIN_ID]: POLYGON_RPC,
  [AVAX_CHAIN_ID]: AVAX_RPC,
  [OPTIMISM_CHAIN_ID]: OPTIMISM_RPC,
}
type Provider = ethers.providers.JsonRpcProvider | undefined

const ethProvider: Provider = undefined
const optimismProvider: Provider = undefined
const polygonProvider: Provider = undefined
const avaxProvider: Provider = undefined

const setUpProvider = (
  provider: Provider,
  options: string | ConnectionInfo | undefined
) => {
  if (provider) return provider
  provider = new ethers.providers.JsonRpcProvider(options)
  return provider
}

export const providerLookup: { [key: number]: Provider } = {
  [POLYGON_CHAIN_ID]: setUpProvider(polygonProvider, POLYGON_RPC),
  [AVAX_CHAIN_ID]: setUpProvider(avaxProvider, AVAX_RPC),
  [ETH_CHAIN_ID]: setUpProvider(ethProvider, ETH_RPC),
  [OPTIMISM_CHAIN_ID]: setUpProvider(optimismProvider, OPTIMISM_RPC),
}

export const contractLookup: {
  [key: number]: ReturnType<typeof IKAchievementABI__factory.connect>
} = {
  [POLYGON_CHAIN_ID]: IKAchievementABI__factory.connect(
    CONTRACT_ADDRESS_POLYGON,
    setUpProvider(polygonProvider, POLYGON_RPC)
  ),
  [AVAX_CHAIN_ID]: IKAchievementABI__factory.connect(
    CONTRACT_ADDRESS_AVAX,
    setUpProvider(avaxProvider, AVAX_RPC)
  ),
  [ETH_CHAIN_ID]: IKAchievementABI__factory.connect(
    CONTRACT_ADDRESS_ETH,
    setUpProvider(ethProvider, ETH_RPC)
  ),
  [OPTIMISM_CHAIN_ID]: IKAchievementABI__factory.connect(
    CONTRACT_ADDRESS_OPTIMISM,
    setUpProvider(optimismProvider, OPTIMISM_RPC)
  ),
}
