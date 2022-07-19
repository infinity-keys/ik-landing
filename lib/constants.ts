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

//Minting Stuff
//(CURRENTLY SET FOR FUJI + RINKEBY)
export const AVAX_CHAIN_ID = 43113;
export const CONTRACT_ADDRESS_AVAX =
  "0xf81F24cA94CF722e6731fF1A7B5aF1189ace78EC";
export const SNOWTRACE_TRACKER = "https://testnet.snowtrace.io";
export const AVAX_RPC = "https://api.avax-test.network/ext/bc/C/rpc";
export const AVAX_MARKETPLACE_LINK = "https://joepegs.com/item/";
export const joePegsLink = `${AVAX_MARKETPLACE_LINK}${CONTRACT_ADDRESS_AVAX}/`;
export const AVAX_PARAMS = {
  chainId: "0x43113",
  rpcUrls: ["https://api.avax-test.network/ext/bc/C/rpc"],
  chainName: "Avalanche FUJI C-Chain",
  nativeCurrency: { name: "AVAX", decimals: 18, symbol: "AVAX" },
  blockExplorerUrls: ["https://testnet.snowtrace.io/"],
};
/*
//real AVAX !! above is fuji
export const AVAX_PARAMS = {
  "0x43114": {
    chainId: "0x43114",
    rpcUrls: ["https://api.avax.network/ext/bc/C/rpc"],
    chainName: "Avalanche Network",
    nativeCurrency: { name: "AVAX", decimals: 18, symbol: "AVAX" },
    blockExplorerUrls: ["https://snowtrace.io/"],
  },
};
*/

export const ETH_CHAIN_ID = 4;
export const CONTRACT_ADDRESS_ETH =
  "0x49B28d2a40C8a8dD7cdFDfBc345F2d0A3f1Ef4E7";
export const ETHERSCAN_TRACKER = "https://rinkeby.etherscan.io";
export const ETH_RPC_ID = "c10d222a5bae4a8e97fad0915b06ff5d";
export const ETH_RPC = `https://rinkeby.infura.io/v3/${ETH_RPC_ID}`;
export const ETH_MARKETPLACE_LINK =
  "https://testnets.opensea.io/assets/rinkeby/";
//"https://opensea.io/assets/ethereum/";
export const openseaLink = `${ETH_MARKETPLACE_LINK}${CONTRACT_ADDRESS_ETH}/`;
