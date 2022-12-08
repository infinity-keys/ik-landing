import { Chain } from '@rainbow-me/rainbowkit'

import { AVAX_RPC } from './rpc'

//AVAX PARAMS
export const AVAX_CHAIN_ID = 43114
export const CONTRACT_ADDRESS_AVAX =
  '0xB40fD6825a366081192d890d2760113C066761Ef'
export const AVAX_MARKETPLACE_LINK = `https://joepegs.com/item/${CONTRACT_ADDRESS_AVAX}/`

// ETH PARAMS
export const ETH_CHAIN_ID = 1
export const CONTRACT_ADDRESS_ETH = '0x54b743D6055e3BBBF13eb2C748A3783516156e5B'
export const ETH_MARKETPLACE_LINK = `https://opensea.io/assets/ethereum/${CONTRACT_ADDRESS_ETH}/`

// POLYGON PARAMS
export const POLYGON_CHAIN_ID = 137
export const CONTRACT_ADDRESS_POLYGON =
  '0x7e8E97A66A935061B2f5a8576226175c4fdE0ff9'
export const POLYGON_MARKETPLACE_LINK = `https://opensea.io/assets/matic/${CONTRACT_ADDRESS_POLYGON}/`

// OPTIMISM PARAMS
export const OPTIMISM_CHAIN_ID = 10
export const CONTRACT_ADDRESS_OPTIMISM =
  '0x54b743D6055e3BBBF13eb2C748A3783516156e5B'
export const OPTIMISM_MARKETPLACE_LINK = `https://quixotic.io/asset/${CONTRACT_ADDRESS_OPTIMISM}/`

export const chainIds = [
  ETH_CHAIN_ID,
  POLYGON_CHAIN_ID,
  AVAX_CHAIN_ID,
  OPTIMISM_CHAIN_ID,
]

export const contractAddressLookup: {
  [key: number]: string
} = {
  [ETH_CHAIN_ID]: CONTRACT_ADDRESS_ETH,
  [POLYGON_CHAIN_ID]: CONTRACT_ADDRESS_POLYGON,
  [AVAX_CHAIN_ID]: CONTRACT_ADDRESS_AVAX,
  [OPTIMISM_CHAIN_ID]: CONTRACT_ADDRESS_OPTIMISM,
}

export const marketplaceLookup: {
  [key: number]: string
} = {
  [ETH_CHAIN_ID]: ETH_MARKETPLACE_LINK,
  [POLYGON_CHAIN_ID]: POLYGON_MARKETPLACE_LINK,
  [AVAX_CHAIN_ID]: AVAX_MARKETPLACE_LINK,
  [OPTIMISM_CHAIN_ID]: OPTIMISM_MARKETPLACE_LINK,
}

// RAINBOW KIT PARAMS
export const avalancheChain: Chain = {
  id: AVAX_CHAIN_ID,
  name: 'Avalanche',
  network: 'avalanche',
  iconUrl:
    'https://imgs.search.brave.com/z9yKFLDCxwvzME6aZ--pxDVktu1ADl9nHdt4ykAbjMk/rs:fit:40:40:1/g:ce/aHR0cHM6Ly9hc3Nl/dHMuY29pbmdlY2tv/LmNvbS9jb2lucy9p/bWFnZXMvMTI1NTkv/bGFyZ2UvY29pbi1y/b3VuZC1yZWQucG5n/PzE2MDQwMjE4MTg',
  iconBackground: '#fff',
  nativeCurrency: {
    decimals: 18,
    name: 'Avalanche',
    symbol: 'AVAX',
  },
  rpcUrls: {
    default: AVAX_RPC,
  },
  blockExplorers: {
    default: { name: 'SnowTrace', url: 'https://snowtrace.io' },
    etherscan: { name: 'SnowTrace', url: 'https://snowtrace.io' },
  },
  testnet: false,
}
