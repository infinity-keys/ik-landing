import { chain, configureChains, createClient } from "wagmi";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import { publicProvider } from "wagmi/providers/public";
import { infuraProvider } from "wagmi/providers/infura";

import { getDefaultWallets, Chain, Theme } from "@rainbow-me/rainbowkit";
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
export const AVAX_MARKETPLACE_LINK = "https://joepegs.com/item/";
export const joePegsLink = `${AVAX_MARKETPLACE_LINK}${CONTRACT_ADDRESS_AVAX}/`;
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
export const ETH_MARKETPLACE_LINK = "https://opensea.io/assets/ethereum/";
export const openseaLink = `${ETH_MARKETPLACE_LINK}${CONTRACT_ADDRESS_ETH}/`;

// POLYGON PARAMS
export const POLYGON_CHAIN_ID = 137;
export const CONTRACT_ADDRESS_POLYGON =
  "0x7e8E97A66A935061B2f5a8576226175c4fdE0ff9";
export const POLYGONSCAN_TRACKER = "https://polygonscan.com/";
export const POLYGON_RPC = "https://polygon-rpc.com";
export const POLYGON_MARKETPLACE_LINK = "https://opensea.io/assets/matic/";
export const openseaPolygonLink = `${POLYGON_MARKETPLACE_LINK}${CONTRACT_ADDRESS_POLYGON}/`;
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

export interface Contracts {
  Ethereum: string;
  Polygon: string;
  Avalanche: string;
}

export const contracts: Contracts = {
  Ethereum: CONTRACT_ADDRESS_ETH,
  Polygon: CONTRACT_ADDRESS_POLYGON,
  Avalanche: CONTRACT_ADDRESS_AVAX,
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
  [chain.mainnet, chain.polygon, avalancheChain],
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

export const IKTheme: Theme = {
  blurs: {
    modalOverlay: "blur(1px)",
  },
  colors: {
    accentColor: "#3FCCBB",
    accentColorForeground: "white",
    actionButtonBorder: "rgba(255, 255, 255, 0.04)",
    actionButtonBorderMobile: "rgba(255, 255, 255, 0.08)",
    actionButtonSecondaryBackground: "rgba(255, 255, 255, 0.08)",
    closeButton: "rgba(224, 232, 255, 0.6)",
    closeButtonBackground: "rgba(255, 255, 255, 0.08)",
    connectButtonBackground: "#3FCCBB",
    connectButtonBackgroundError: "#FF494A",
    connectButtonInnerBackground:
      "linear-gradient(0deg, rgba(255, 255, 255, 0.075), rgba(255, 255, 255, 0.15))",
    connectButtonText: "#FFF",
    connectButtonTextError: "#FFF",
    connectionIndicator: "#30E000",
    error: "#FF494A",
    generalBorder: "rgba(255, 255, 255, 0.08)",
    generalBorderDim: "rgba(255, 255, 255, 0.04)",
    menuItemBackground: "rgba(224, 232, 255, 0.1)",
    modalBackdrop: "rgba(0, 0, 0, 0.5)",
    modalBackground: "#101D42",
    modalBorder: "#101D42",
    modalText: "#FFF",
    modalTextDim: "rgba(224, 232, 255, 0.3)",
    modalTextSecondary: "rgba(255, 255, 255, 0.6)",
    profileAction: "rgba(224, 232, 255, 0.1)",
    profileActionHover: "#3FCCBB",
    profileForeground: "rgba(224, 232, 255, 0.05)",
    selectedOptionBorder: "rgba(224, 232, 255, 0.1)",
    standby: "#FFD641",
  },
  shadows: {
    connectButton: "0px 4px 12px rgba(0, 0, 0, 0.1)",
    dialog: "0px 8px 32px rgba(0, 0, 0, 0.32)",
    profileDetailsAction: "0px 2px 6px rgba(37, 41, 46, 0.04)",
    selectedOption: "0px 2px 6px rgba(0, 0, 0, 0.24)",
    selectedWallet: "0px 2px 6px rgba(0, 0, 0, 0.24)",
    walletLogo: "0px 2px 16px rgba(0, 0, 0, 0.16)",
  },
  fonts: {
    body: "Poppins, sans-serif",
  },
  radii: {
    actionButton: "6px",
    connectButton: "6px",
    menuButton: "6px",
    modal: "8px",
    modalMobile: "8px",
  },
};
