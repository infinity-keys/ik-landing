import { Chain } from "@rainbow-me/rainbowkit";
import { IKAchievementABI__factory } from "./generated/ethers-contract";
import { ethers } from "ethers";

//AVAX PARAMS
export const AVAX_CHAIN_ID = 43114;
export const CONTRACT_ADDRESS_AVAX =
  "0xB40fD6825a366081192d890d2760113C066761Ef";
export const AVAX_RPC = "https://api.avax.network/ext/bc/C/rpc";
export const AVAX_MARKETPLACE_LINK = `https://joepegs.com/item/${CONTRACT_ADDRESS_AVAX}/`;

// ETH PARAMS
export const ETH_CHAIN_ID = 1;
export const CONTRACT_ADDRESS_ETH =
  "0x54b743D6055e3BBBF13eb2C748A3783516156e5B";
export const ETH_RPC = `https://mainnet.infura.io/v3/c10d222a5bae4a8e97fad0915b06ff5d`;
export const ETH_MARKETPLACE_LINK = `https://opensea.io/assets/ethereum/${CONTRACT_ADDRESS_ETH}/`;

// POLYGON PARAMS
export const POLYGON_CHAIN_ID = 137;
export const CONTRACT_ADDRESS_POLYGON =
  "0x7e8E97A66A935061B2f5a8576226175c4fdE0ff9";
export const POLYGON_RPC = "https://polygon-rpc.com";
export const POLYGON_MARKETPLACE_LINK = `https://opensea.io/assets/matic/${CONTRACT_ADDRESS_POLYGON}/`;

// OPTIMISM PARAMS
export const OPTIMISM_CHAIN_ID = 10;
export const OPTIMISM_RPC =
  "https://optimism-mainnet.infura.io/v3/c10d222a5bae4a8e97fad0915b06ff5d";
export const CONTRACT_ADDRESS_OPTIMISM =
  "0x54b743D6055e3BBBF13eb2C748A3783516156e5B";
export const OPTIMISM_MARKETPLACE_LINK = `https://quixotic.io/asset/${CONTRACT_ADDRESS_OPTIMISM}/`;

export const chainIds = [
  ETH_CHAIN_ID,
  POLYGON_CHAIN_ID,
  AVAX_CHAIN_ID,
  OPTIMISM_CHAIN_ID,
];

export const contractAddressLookup: {
  [key: number]: string;
} = {
  [ETH_CHAIN_ID]: CONTRACT_ADDRESS_ETH,
  [POLYGON_CHAIN_ID]: CONTRACT_ADDRESS_POLYGON,
  [AVAX_CHAIN_ID]: CONTRACT_ADDRESS_AVAX,
  [OPTIMISM_CHAIN_ID]: CONTRACT_ADDRESS_OPTIMISM,
};

export const contractLookup: {
  [key: number]: ReturnType<typeof IKAchievementABI__factory.connect>;
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
};

export const marketplaceLookup: {
  [key: number]: string;
} = {
  [ETH_CHAIN_ID]: ETH_MARKETPLACE_LINK,
  [POLYGON_CHAIN_ID]: POLYGON_MARKETPLACE_LINK,
  [AVAX_CHAIN_ID]: AVAX_MARKETPLACE_LINK,
  [OPTIMISM_CHAIN_ID]: OPTIMISM_MARKETPLACE_LINK,
};

// RAINBOW KIT PARAMS
export const avalancheChain: Chain = {
  id: AVAX_CHAIN_ID,
  name: "Avalanche",
  network: "avalanche",
  iconUrl:
    "https://imgs.search.brave.com/z9yKFLDCxwvzME6aZ--pxDVktu1ADl9nHdt4ykAbjMk/rs:fit:40:40:1/g:ce/aHR0cHM6Ly9hc3Nl/dHMuY29pbmdlY2tv/LmNvbS9jb2lucy9p/bWFnZXMvMTI1NTkv/bGFyZ2UvY29pbi1y/b3VuZC1yZWQucG5n/PzE2MDQwMjE4MTg",
  iconBackground: "#fff",
  nativeCurrency: {
    decimals: 18,
    name: "Avalanche",
    symbol: "AVAX",
  },
  rpcUrls: {
    default: AVAX_RPC,
  },
  blockExplorers: {
    default: { name: "SnowTrace", url: "https://snowtrace.io" },
    etherscan: { name: "SnowTrace", url: "https://snowtrace.io" },
  },
  testnet: false,
};

// RINKEBY PARAMS
// export const ETH_CHAIN_ID = 4;
// export const CONTRACT_ADDRESS_ETH =
//   "0xBCEBf2f7F6D23287054008Aeb028F2092262d1a3";
// export const ETHERSCAN_TRACKER = "https://rinkeby.etherscan.io";
// export const ETH_RPC = `https://rinkeby.infura.io/v3/c10d222a5bae4a8e97fad0915b06ff5d`;
// export const ETH_MARKETPLACE_LINK =
//   `https://testnets.opensea.io/assets/ethereum/${CONTRACT_ADDRESS_ETH}/`;
