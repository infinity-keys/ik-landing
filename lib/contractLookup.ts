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
export const ETH_RPC =
  "https://mainnet.infura.io/v3/65a0c8457d9045fcb68d976e951a1d82";
export const OPTIMISM_RPC =
  "https://optimism-mainnet.infura.io/v3/65a0c8457d9045fcb68d976e951a1d82";
export const POLYGON_RPC = "https://polygon-rpc.com";

export const chainRPCLookup: {
  [key: number]: string;
} = {
  [ETH_CHAIN_ID]: ETH_RPC,
  [POLYGON_CHAIN_ID]: POLYGON_RPC,
  [AVAX_CHAIN_ID]: AVAX_RPC,
  [OPTIMISM_CHAIN_ID]: OPTIMISM_RPC,
};

const ethRpcJsonRpcProvider = new ethers.providers.JsonRpcProvider({
  url: ETH_RPC,
  headers: {
    Origin: "clb3yaxak0001356n8iawecm4.infinitykeys.io",
  },
});
const optimismRpcJsonRpcProvider = new ethers.providers.JsonRpcProvider({
  url: OPTIMISM_RPC,
  headers: {
    Origin: "clb3yaxak0001356n8iawecm4.infinitykeys.io",
  },
});
const polygonRpcJsonRpcProvider = new ethers.providers.JsonRpcProvider(
  POLYGON_RPC
);
const avaxRpcJsonRpcProvider = new ethers.providers.JsonRpcProvider(AVAX_RPC);

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
