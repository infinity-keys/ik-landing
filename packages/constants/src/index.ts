import { Chain } from '@rainbow-me/rainbowkit'

// JWT stuff
export const IK_ID_COOKIE = 'ik-id'
export const IK_CLAIMS_NAMESPACE = 'https://infinitykeys.io'
export const PUZZLE_COOKIE_NAME = `ik-puzzles`
export const ANONYMOUS_USER_ID = 'ANON'

// Crypto stuff
export const ETH_ADDRESS_REGEX = /^0x[a-fA-F0-9]{40}$/
export const welcome = 'Thanks for playing :)'

// Email stuff
export const SENDGRID_SENDER_ACCOUNT = 'noreply@infinitykeys.io'

// Route stuff, see utils.ts:Routes
export const URL_ORIGIN =
  typeof window !== 'undefined'
    ? window.location.origin
    : 'http://localhost:8910'
export const PACK_COLLECTION_BASE = 'packs'
export const PACK_LANDING_BASE = 'pack'
export const PUZZLE_COLLECTION_BASE = 'puzzles'
export const PUZZLE_LANDING_BASE = 'puzzle'
export const PUZZLE_SUCCESS_BASE = 'solved'
export const PUZZLE_FAILED_BASE = 'puzzle' // back to landing

// Puzzles per page
export const PAGINATION_COUNTS = [32, 64, 128]

// Cloudinary
export const CLOUDINARY_CLOUD_NAME = 'infinity-keys'

// Web3 stuff
// AVAX PARAMS
export const AVAX_CHAIN_ID = 43114
export const CONTRACT_ADDRESS_AVAX =
  '0xB40fD6825a366081192d890d2760113C066761Ef'
export const AVAX_MARKETPLACE_LINK = `https://joepegs.com/item/avalanche/${CONTRACT_ADDRESS_AVAX}/`

// ETH PARAMS
export const ETH_CHAIN_ID = 1
export const CONTRACT_ADDRESS_ETH = '0x54b743D6055e3BBBF13eb2C748A3783516156e5B'
export const ETH_MARKETPLACE_LINK = `https://opensea.io/assets/ethereum/${CONTRACT_ADDRESS_ETH}/`

// GNOSIS PARAMS
export const GNOSIS_CHAIN_ID = 100

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

// REPLACE WITH GOERLI PARAMS
// // RINKEBY PARAMS
// export const RINKEBY_CHAIN_ID = 4;
// export const CONTRACT_ADDRESS_RINKEBY =
//   "0x831684656038388D9361FfAacec6763003033eC4";
// export const RINKEBYSCAN_TRACKER = "https://rinkeby.etherscan.io";
// export const RINKEBY_MARKETPLACE_LINK = `https://testnets.opensea.io/assets/rinkeby/${CONTRACT_ADDRESS_RINKEBY}/`;

//COMMENT RINKEBY HERE FOR PROD
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

export const chainRPCNameLookup: {
  [key: number]: string
} = {
  [ETH_CHAIN_ID]: 'homestead',
  [POLYGON_CHAIN_ID]: 'matic',
  [AVAX_CHAIN_ID]: 'avax',
  [OPTIMISM_CHAIN_ID]: 'optimism',
}

export const chainIdLookup: {
  [key: number]: string
} = {
  [ETH_CHAIN_ID]: 'Ethereum',
  [POLYGON_CHAIN_ID]: 'Polygon',
  [AVAX_CHAIN_ID]: 'Avalanche',
  [OPTIMISM_CHAIN_ID]: 'Optimism',
}

export const marketplaceLookup: {
  [key: number]: string
} = {
  [ETH_CHAIN_ID]: ETH_MARKETPLACE_LINK,
  [POLYGON_CHAIN_ID]: POLYGON_MARKETPLACE_LINK,
  [AVAX_CHAIN_ID]: AVAX_MARKETPLACE_LINK,
  [OPTIMISM_CHAIN_ID]: OPTIMISM_MARKETPLACE_LINK,
}

export const marketplaceNameLookup: {
  [key: number]: string
} = {
  [ETH_CHAIN_ID]: 'OpenSea',
  [POLYGON_CHAIN_ID]: 'OpenSea',
  [AVAX_CHAIN_ID]: 'Joepegs',
  [OPTIMISM_CHAIN_ID]: 'Quixotic',
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
    default: 'https://api.avax.network/ext/bc/C/rpc',
  },
  blockExplorers: {
    default: { name: 'SnowTrace', url: 'https://snowtrace.io' },
    etherscan: { name: 'SnowTrace', url: 'https://snowtrace.io' },
  },
  testnet: false,
}
