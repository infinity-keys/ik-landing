export * as factories from './generated/factories'
export { IKAchievementABI__factory } from './generated/factories/IKAchievementABI__factory'
export { default as balanceOf1155 } from './balanceOf1155.json'
export { default as balanceOf721 } from './balanceOf721.json'

import {
  AVAX_CHAIN_ID,
  AVAX_RPC,
  CONTRACT_ADDRESS_AVAX,
  CONTRACT_ADDRESS_ETH,
  CONTRACT_ADDRESS_OPTIMISM,
  CONTRACT_ADDRESS_POLYGON,
  ETH_CHAIN_ID,
  ETH_RPC,
  OPTIMISM_CHAIN_ID,
  OPTIMISM_RPC,
  POLYGON_CHAIN_ID,
  POLYGON_RPC,
} from '@infinity-keys/constants'
import { ethers } from 'ethers'

import { IKAchievementABI__factory } from './generated/factories/IKAchievementABI__factory'

export const contractLookup: {
  [key: number]: ReturnType<typeof IKAchievementABI__factory.connect>
} = {
  [ETH_CHAIN_ID]: IKAchievementABI__factory.connect(
    CONTRACT_ADDRESS_ETH,
    new ethers.providers.JsonRpcProvider(ETH_RPC)
  ),
  [POLYGON_CHAIN_ID]: IKAchievementABI__factory.connect(
    CONTRACT_ADDRESS_POLYGON,
    new ethers.providers.JsonRpcProvider(POLYGON_RPC)
  ),
  [AVAX_CHAIN_ID]: IKAchievementABI__factory.connect(
    CONTRACT_ADDRESS_AVAX,
    new ethers.providers.JsonRpcProvider(AVAX_RPC)
  ),
  [OPTIMISM_CHAIN_ID]: IKAchievementABI__factory.connect(
    CONTRACT_ADDRESS_OPTIMISM,
    new ethers.providers.JsonRpcProvider(OPTIMISM_RPC)
  ),
}
