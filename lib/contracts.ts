import { ethers } from "ethers";
import { IKAchievementABI__factory } from "./generated/ethers-contract";
import {
  AVAX_CHAIN_ID,
  AVAX_RPC,
  CONTRACT_ADDRESS_AVAX,
  CONTRACT_ADDRESS_ETH,
  CONTRACT_ADDRESS_OPTIMISM,
  CONTRACT_ADDRESS_POLYGON,
  ETH_CHAIN_ID,
  ETH_RPC,
  OPTIMISM_RPC,
  OPTIMISM_CHAIN_ID,
  POLYGON_CHAIN_ID,
  POLYGON_RPC,
} from "./walletConstants";

export const chainIds = [
  ETH_CHAIN_ID,
  AVAX_CHAIN_ID,
  POLYGON_CHAIN_ID,
  OPTIMISM_CHAIN_ID,
];

export const contractAddressLookup: {
  [key: number]: string;
} = {
  [AVAX_CHAIN_ID]: CONTRACT_ADDRESS_AVAX,
  [ETH_CHAIN_ID]: CONTRACT_ADDRESS_ETH,
  [POLYGON_CHAIN_ID]: CONTRACT_ADDRESS_POLYGON,
  [OPTIMISM_CHAIN_ID]: CONTRACT_ADDRESS_OPTIMISM,
};

export const contractLookup: {
  [key: number]: ReturnType<typeof IKAchievementABI__factory.connect>;
} = {
  [AVAX_CHAIN_ID]: IKAchievementABI__factory.connect(
    CONTRACT_ADDRESS_AVAX,
    new ethers.providers.JsonRpcProvider(AVAX_RPC)
  ),
  [ETH_CHAIN_ID]: IKAchievementABI__factory.connect(
    CONTRACT_ADDRESS_ETH,
    new ethers.providers.JsonRpcProvider(ETH_RPC)
  ),
  [POLYGON_CHAIN_ID]: IKAchievementABI__factory.connect(
    CONTRACT_ADDRESS_POLYGON,
    new ethers.providers.JsonRpcProvider(POLYGON_RPC)
  ),
  [OPTIMISM_CHAIN_ID]: IKAchievementABI__factory.connect(
    CONTRACT_ADDRESS_OPTIMISM,
    new ethers.providers.JsonRpcProvider(OPTIMISM_RPC)
  ),
};
