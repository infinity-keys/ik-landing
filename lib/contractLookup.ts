import { ethers } from "ethers";
import { IKAchievementABI__factory } from "./generated/ethers-contract";
import { AVAX_RPC, ETH_RPC, OPTIMISM_RPC, POLYGON_RPC } from "./rpc";
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

export const chainRPCLookup: {
  [key: number]: string;
} = {
  [ETH_CHAIN_ID]: ETH_RPC,
  [POLYGON_CHAIN_ID]: POLYGON_RPC,
  [AVAX_CHAIN_ID]: AVAX_RPC,
  [OPTIMISM_CHAIN_ID]: OPTIMISM_RPC,
};

let ethProvider: ethers.providers.JsonRpcProvider | undefined = undefined;
let optimismProvider: ethers.providers.JsonRpcProvider | undefined = undefined;
let polygonProvider: ethers.providers.JsonRpcProvider | undefined = undefined;
let avaxProvider: ethers.providers.JsonRpcProvider | undefined = undefined;

const ethRpcJsonRpcProvider = () => {
  if (ethProvider) return ethProvider;
  ethProvider = new ethers.providers.JsonRpcProvider({
    url: ETH_RPC,
    headers: {
      Origin: "clb3yaxak0001356n8iawecm4.infinitykeys.io",
    },
  });
  return ethProvider;
};

const optimismRpcJsonRpcProvider = () => {
  if (optimismProvider) return optimismProvider;
  optimismProvider = new ethers.providers.JsonRpcProvider({
    url: OPTIMISM_RPC,
    headers: {
      Origin: "clb3yaxak0001356n8iawecm4.infinitykeys.io",
    },
  });
  return optimismProvider;
};

const polygonRpcJsonRpcProvider = () => {
  if (polygonProvider) return polygonProvider;
  polygonProvider = new ethers.providers.JsonRpcProvider(POLYGON_RPC);
  return polygonProvider;
};

const avaxRpcJsonRpcProvider = () => {
  if (avaxProvider) return avaxProvider;
  avaxProvider = new ethers.providers.JsonRpcProvider(AVAX_RPC);
  return avaxProvider;
};

export const contractLookup: {
  [key: number]: ReturnType<typeof IKAchievementABI__factory.connect>;
} = {
  [ETH_CHAIN_ID]: IKAchievementABI__factory.connect(
    CONTRACT_ADDRESS_ETH,
    ethRpcJsonRpcProvider()
  ),
  [POLYGON_CHAIN_ID]: IKAchievementABI__factory.connect(
    CONTRACT_ADDRESS_POLYGON,
    polygonRpcJsonRpcProvider()
  ),
  [AVAX_CHAIN_ID]: IKAchievementABI__factory.connect(
    CONTRACT_ADDRESS_AVAX,
    avaxRpcJsonRpcProvider()
  ),
  [OPTIMISM_CHAIN_ID]: IKAchievementABI__factory.connect(
    CONTRACT_ADDRESS_OPTIMISM,
    optimismRpcJsonRpcProvider()
  ),
};
