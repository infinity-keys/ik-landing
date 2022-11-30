import { ethers } from "ethers";
import { IKAchievementABI__factory } from "./generated/ethers-contract";
import {
  AVAX_CHAIN_ID,
  CONTRACT_ADDRESS_AVAX,
  CONTRACT_ADDRESS_ETH,
  CONTRACT_ADDRESS_OPTIMISM,
  CONTRACT_ADDRESS_POLYGON,
  ETH_CHAIN_ID,
  OPTIMISM_CHAIN_ID,
  POLYGON_CHAIN_ID,
} from "./walletConstants";

export const AVAX_RPC = "https://api.avax.network/ext/bc/C/rpc";
export const ETH_RPC = `https://mainnet.infura.io/v3/05e9523d724744c0b1f398a7ebcb602e`;
export const OPTIMISM_RPC =
  "https://optimism-mainnet.infura.io/v3/05e9523d724744c0b1f398a7ebcb602e";
export const POLYGON_RPC = "https://polygon-rpc.com";

export const chainRPCLookup: {
  [key: number]: string;
} = {
  [ETH_CHAIN_ID]: ETH_RPC,
  [POLYGON_CHAIN_ID]: POLYGON_RPC,
  [AVAX_CHAIN_ID]: AVAX_RPC,
  [OPTIMISM_CHAIN_ID]: OPTIMISM_RPC,
};

const ethRpcJsonRpcProvider = new ethers.providers.JsonRpcProvider(ETH_RPC);
const polygonRpcJsonRpcProvider = new ethers.providers.JsonRpcProvider(
  POLYGON_RPC
);
const avaxRpcJsonRpcProvider = new ethers.providers.JsonRpcProvider(AVAX_RPC);
const optimismRpcJsonRpcProvider = new ethers.providers.JsonRpcProvider(
  OPTIMISM_RPC
);

export const contractLookup: {
  [key: number]: ReturnType<typeof IKAchievementABI__factory.connect>;
} = {
  [ETH_CHAIN_ID]: IKAchievementABI__factory.connect(
    CONTRACT_ADDRESS_ETH,
    ethRpcJsonRpcProvider
  ),
  [POLYGON_CHAIN_ID]: IKAchievementABI__factory.connect(
    CONTRACT_ADDRESS_POLYGON,
    polygonRpcJsonRpcProvider
  ),
  [AVAX_CHAIN_ID]: IKAchievementABI__factory.connect(
    CONTRACT_ADDRESS_AVAX,
    avaxRpcJsonRpcProvider
  ),
  [OPTIMISM_CHAIN_ID]: IKAchievementABI__factory.connect(
    CONTRACT_ADDRESS_OPTIMISM,
    optimismRpcJsonRpcProvider
  ),
};
