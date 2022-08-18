import { chain, configureChains, createClient } from "wagmi";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import { publicProvider } from "wagmi/providers/public";
import { infuraProvider } from "wagmi/providers/infura";
import merge from "lodash/merge";

import {
  getDefaultWallets,
  Chain,
  Theme,
  darkTheme,
} from "@rainbow-me/rainbowkit";
import { IKAchievementABI__factory } from "./generated/ethers-contract";

// CHAIN PARAMS
const toHex = (num: number) => {
  const val = Number(num);
  return "0x" + val.toString(16);
};

//AVAX
export const AVAX_CHAIN_ID = 43114;
export const CONTRACT_ADDRESS_AVAX =
  "0xB40fD6825a366081192d890d2760113C066761Ef";
export const SNOWTRACE_TRACKER = "https://snowtrace.io";
export const AVAX_RPC = "https://api.avax.network/ext/bc/C/rpc";
export const AVAX_MARKETPLACE_LINK = `https://joepegs.com/item/${CONTRACT_ADDRESS_AVAX}/`;
export const AVAX_PARAMS = {
  chainId: toHex(AVAX_CHAIN_ID),
  rpcUrls: [AVAX_RPC, "https://rpc.ankr.com/avalanche"],
  chainName: "Avalanche Network",
  nativeCurrency: { name: "AVAX", decimals: 18, symbol: "AVAX" },
  blockExplorerUrls: [SNOWTRACE_TRACKER],
};

// ETH PARAMS
export const ETH_CHAIN_ID = 1;
export const CONTRACT_ADDRESS_ETH =
  "0x54b743D6055e3BBBF13eb2C748A3783516156e5B";
export const ETHERSCAN_TRACKER = "https://etherscan.io";
export const ETH_RPC_ID = "c10d222a5bae4a8e97fad0915b06ff5d";
export const ETH_RPC = `https://mainnet.infura.io/v3/${ETH_RPC_ID}`;
export const ETH_MARKETPLACE_LINK = `https://opensea.io/assets/ethereum/${CONTRACT_ADDRESS_ETH}/`;

// POLYGON PARAMS
export const POLYGON_CHAIN_ID = 137;
export const CONTRACT_ADDRESS_POLYGON =
  "0x7e8E97A66A935061B2f5a8576226175c4fdE0ff9";
export const POLYGONSCAN_TRACKER = "https://polygonscan.com/";
export const POLYGON_RPC = "https://polygon-rpc.com";
export const POLYGON_MARKETPLACE_LINK = `https://opensea.io/assets/matic/${CONTRACT_ADDRESS_POLYGON}/`;
export const POLYGON_PARAMS = {
  chainId: toHex(POLYGON_CHAIN_ID),
  rpcUrls: [POLYGON_RPC],
  chainName: "Polygon",
  nativeCurrency: { name: "MATIC", decimals: 18, symbol: "MATIC" },
  blockExplorerUrls: [POLYGONSCAN_TRACKER],
};

// RINKEBY PARAMS
// export const ETH_CHAIN_ID = 4;
// export const CONTRACT_ADDRESS_ETH =
//   "0xBCEBf2f7F6D23287054008Aeb028F2092262d1a3";
// export const ETHERSCAN_TRACKER = "https://rinkeby.etherscan.io";
// export const ETH_RPC_ID = "c10d222a5bae4a8e97fad0915b06ff5d";
// export const ETH_RPC = `https://rinkeby.infura.io/v3/${ETH_RPC_ID}`;
// export const ETH_MARKETPLACE_LINK =
//   "https://testnets.opensea.io/assets/ethereum/";
// export const openseaLink = `${ETH_MARKETPLACE_LINK}${CONTRACT_ADDRESS_ETH}/`;

export const OPTIMISM_CHAIN_ID = 10;
export const OPTIMISM_RPC =
  "https://optimism-mainnet.infura.io/v3/c10d222a5bae4a8e97fad0915b06ff5d";
export const CONTRACT_ADDRESS_OPTIMISM =
  "0x54b743D6055e3BBBF13eb2C748A3783516156e5B";
export const OPTIMISM_MARKETPLACE_LINK = `https://quixotic.io/asset/${CONTRACT_ADDRESS_OPTIMISM}/`;
export interface Contracts {
  Ethereum: string;
  Polygon: string;
  Avalanche: string;
  Optimism: string;
}

export const contracts: Contracts = {
  Ethereum: CONTRACT_ADDRESS_ETH,
  Polygon: CONTRACT_ADDRESS_POLYGON,
  Avalanche: CONTRACT_ADDRESS_AVAX,
  Optimism: CONTRACT_ADDRESS_OPTIMISM,
};

export const contractAvax = {
  addressOrName: "0xB40fD6825a366081192d890d2760113C066761Ef",
  contractInterface: IKAchievementABI__factory.abi,
};

export const contractEth = {
  addressOrName: "0x54b743D6055e3BBBF13eb2C748A3783516156e5B",
  contractInterface: IKAchievementABI__factory.abi,
};

export const contractPolygon = {
  addressOrName: "0x7e8E97A66A935061B2f5a8576226175c4fdE0ff9",
  contractInterface: IKAchievementABI__factory.abi,
};

export const contractOptimism = {
  addressOrName: "0x54b743D6055e3BBBF13eb2C748A3783516156e5B",
  contractInterface: IKAchievementABI__factory.abi,
};

const avalancheChain: Chain = {
  id: 43114,
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
    default: "https://api.avax.network/ext/bc/C/rpc",
  },
  blockExplorers: {
    default: { name: "SnowTrace", url: "https://snowtrace.io" },
    etherscan: { name: "SnowTrace", url: "https://snowtrace.io" },
  },
  testnet: false,
};

export const { chains, provider } = configureChains(
  [chain.mainnet, chain.polygon, avalancheChain, chain.optimism],
  [
    infuraProvider({ apiKey: process.env.INFURA_KEY }),
    publicProvider(),
    jsonRpcProvider({ rpc: (chain) => ({ http: chain.rpcUrls.default }) }),
  ]
);

export let chainIds: number[] = [];
chains.map((chain) => {
  chainIds.push(chain.id);
});

const { connectors } = getDefaultWallets({
  appName: "Infinity Keys",
  chains,
});

export const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

export const IKTheme = merge(darkTheme(), {
  colors: {
    accentColor: "#3FCCBB",
    connectButtonBackground: "#354161",
    modalBackground: "#101D42",
    modalBorder: "rgba(255,255,255,.2)",
    menuItemBackground: "#101D42",
  },
  fonts: {
    body: "Poppins, sans-serif",
  },
  radii: {
    connectButton: "4px",
    modal: "8px",
    modalMobile: "8px",
  },
} as Theme);
