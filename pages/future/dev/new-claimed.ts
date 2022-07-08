import { wallet } from "@lib/wallet";
import { ethers } from "ethers";
import {
  ETH_RPC,
  AVAX_RPC,
  CONTRACT_ADDRESS_AVAX,
  CONTRACT_ADDRESS_ETH,
} from "@lib/constants";
import ContractABI from "./ContractABI.json";

export const claimedUtil = (puzzleId: number) => {
  const { account } = wallet.retrieve();

  const checkIfClaimed = async (): Promise<boolean> => {
    const contractAVAX = new ethers.Contract(
      CONTRACT_ADDRESS_AVAX,
      ContractABI,
      new ethers.providers.JsonRpcProvider(AVAX_RPC) //AVAX RPC provider
    );

    const avaxStatus: boolean = await contractAVAX.checkIfClaimed(
      puzzleId,
      account
    );
    if (avaxStatus) return avaxStatus;

    const contractETH = new ethers.Contract(
      CONTRACT_ADDRESS_ETH,
      ContractABI,
      new ethers.providers.JsonRpcProvider(ETH_RPC) //ETH RPC provider
    );

    const ethStatus: boolean = await contractETH.checkIfClaimed(
      puzzleId,
      account
    );
    if (ethStatus) return ethStatus;

    return false;
  };

  return {
    checkIfClaimed,
  };
};
