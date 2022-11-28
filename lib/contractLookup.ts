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
  OPTIMISM_CHAIN_ID,
  OPTIMISM_RPC,
  POLYGON_CHAIN_ID,
  POLYGON_RPC,
} from "./walletConstants";

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
