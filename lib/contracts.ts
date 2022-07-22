import { IKAchievementABI__factory } from "@contracts/factories/IKAchievementABI__factory";
import { ethers } from "ethers";
import { CONTRACT_ADDRESS_POLYGON, POLYGON_RPC } from "./constants";

export let contractPolygon:
  | undefined
  | ReturnType<typeof IKAchievementABI__factory.connect> = undefined;

export const getcontractPolygon = () => {
  if (contractPolygon) return contractPolygon;

  contractPolygon = IKAchievementABI__factory.connect(
    CONTRACT_ADDRESS_POLYGON,
    new ethers.providers.JsonRpcProvider(POLYGON_RPC)
  );
};

// Use it like this:
//
// import {getcontractPolygon} from '@lib/contracts';
// const contractPolygon = getcontractPolygon();
