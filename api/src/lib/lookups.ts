import { ConnectionInfo } from '@ethersproject/web'
import {
  AVAX_CHAIN_ID,
  CONTRACT_ADDRESS_AVAX,
  CONTRACT_ADDRESS_ETH,
  CONTRACT_ADDRESS_OPTIMISM,
  CONTRACT_ADDRESS_POLYGON,
  ETH_CHAIN_ID,
  OPTIMISM_CHAIN_ID,
  POLYGON_CHAIN_ID,
  GNOSIS_CHAIN_ID,
} from '@infinity-keys/constants'
import { IKAchievementABI__factory } from '@infinity-keys/contracts'
import { ethers } from 'ethers'

import { AVAX_RPC, ETH_RPC, OPTIMISM_RPC, POLYGON_RPC, GNOSIS_RPC } from './rpc'

export const chainRPCLookup: {
  [key: number]: string
} = {
  [ETH_CHAIN_ID]: ETH_RPC,
  [POLYGON_CHAIN_ID]: POLYGON_RPC,
  [AVAX_CHAIN_ID]: AVAX_RPC,
  [OPTIMISM_CHAIN_ID]: OPTIMISM_RPC,
  [GNOSIS_CHAIN_ID]: GNOSIS_RPC,
}

type Provider = ethers.providers.JsonRpcProvider | undefined

/* eslint-disable prefer-const */
let ethProvider: Provider = undefined
let optimismProvider: Provider = undefined
let polygonProvider: Provider = undefined
let avaxProvider: Provider = undefined
let gnosisProvider: Provider = undefined
/* eslint-enable prefer-const */

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
  [GNOSIS_CHAIN_ID]: setUpProvider(gnosisProvider, GNOSIS_RPC),
  [AVAX_CHAIN_ID]: setUpProvider(avaxProvider, AVAX_RPC),
  [ETH_CHAIN_ID]: setUpProvider(ethProvider, {
    url: ETH_RPC,
    headers: {
      Origin: 'clb3yaxak0001356n8iawecm4.infinitykeys.io',
    },
  }),
  [OPTIMISM_CHAIN_ID]: setUpProvider(optimismProvider, {
    url: OPTIMISM_RPC,
    headers: {
      Origin: 'clb3yaxak0001356n8iawecm4.infinitykeys.io',
    },
  }),
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
    setUpProvider(ethProvider, {
      url: ETH_RPC,
      headers: {
        Origin: 'clb3yaxak0001356n8iawecm4.infinitykeys.io',
      },
    })
  ),
  [OPTIMISM_CHAIN_ID]: IKAchievementABI__factory.connect(
    CONTRACT_ADDRESS_OPTIMISM,
    setUpProvider(optimismProvider, {
      url: OPTIMISM_RPC,
      headers: {
        Origin: 'clb3yaxak0001356n8iawecm4.infinitykeys.io',
      },
    })
  ),
}
