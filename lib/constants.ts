// JWT stuff
export const JWT_SECRET_KEY = process.env.INFINITY_KEYS_SECRET;
export const IK_ID_COOKIE = "ik-id";
export const IK_CLAIMS_NAMESPACE = "https://infinitykeys.io";

// Crypto stuff
export const ETH_ADDRESS_REGEX = /^0x[a-fA-F0-9]{40}$/;
export const welcome = "Thanks for playing :)";

// Route stuff, see utils.ts:Routes
export const PUZZLE_LANDING_BASE = "puzzle";
export const PUZZLE_SUCCESS_BASE = "solved";
export const PUZZLE_FAILED_BASE = "puzzle"; // back to landing

export const PAGINATION_COUNTS = [8, 16, 32, 64];

//Minting Stuff
//tried importing from utils.ts but was getting Reference error in vercel
//since it wasn't defined yet
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
// export const ETH_MARKETPLACE_LINK = "https://testnets.opensea.io/assets/ethereum/";
// export const openseaLink = `${ETH_MARKETPLACE_LINK}${CONTRACT_ADDRESS_ETH}/`;
