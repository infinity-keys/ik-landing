import { walletUtil } from "@lib/wallet";
import { ethers } from "ethers";
import {
  ETH_RPC,
  AVAX_RPC,
  CONTRACT_ADDRESS_AVAX,
  CONTRACT_ADDRESS_ETH,
  AVAX_CHAIN_ID,
  AVAX_PARAMS,
  ETH_CHAIN_ID,
} from "@lib/constants";
import ContractABI from "./ContractABI.json";

export const claimUtil = (
  wallet: ReturnType<typeof walletUtil>,
  puzzleId: number
) => {
  let mintedStatus: boolean;

  let globalChainID: number; //I feel like this should be in wallet.ts somehow but idk how to update from here

  const { library, account, chain } = wallet.retrieve();

  const checkIfClaimed = async () => {
    const contractETH = new ethers.Contract(
      CONTRACT_ADDRESS_ETH,
      ContractABI,
      new ethers.providers.JsonRpcProvider(ETH_RPC) //ETH RPC provider
    );

    if (await contractETH.checkIfClaimed(puzzleId, account)) {
      mintedStatus = true;
      return;
    }

    const contractAVAX = new ethers.Contract(
      CONTRACT_ADDRESS_AVAX,
      ContractABI,
      new ethers.providers.JsonRpcProvider(AVAX_RPC) //AVAX RPC provider
    );

    if (await contractAVAX.checkIfClaimed(puzzleId, account)) {
      mintedStatus = true;
      return;
    }

    mintedStatus = false;
  };

  const switchChain = async (newChainId: number) => {
    if (newChainId !== ETH_CHAIN_ID && newChainId !== AVAX_CHAIN_ID) return;
    if (newChainId == globalChainID) return; // same as current chain

    const chainToSwitch = "0x" + Number(newChainId).toString(16); // switch to hex

    if (chain && library?.provider?.request) {
      try {
        await library.provider.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: chainToSwitch }],
        });
        globalChainID = newChainId; //probably get rid of ?
      } catch (switchError: any) {
        //I think this should add AVAX to MetaMask if you dont have it yet
        //have not tested

        if (switchError.code === 4902) {
          //should only happen for AVAX
          try {
            await library.provider.request({
              method: "wallet_addEthereumChain",
              params: [AVAX_PARAMS],
            });
            globalChainID = newChainId; //probably get rid of ?
          } catch (error) {
            console.log(error);
          }
        }
      }
    }
  };

  const retrieve = () => ({
    mintedStatus,
    globalChainID,
  });

  return {
    retrieve,
    checkIfClaimed,
    switchChain,
  };
};
