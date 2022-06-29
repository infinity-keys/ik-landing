import { useState } from "react";
import { ethers } from "ethers";
import {
  CONTRACT_ADDRESS_AVAX,
  CONTRACT_ADDRESS_ETH,
  ETH_CHAIN_ID,
  AVAX_CHAIN_ID,
  SNOWTRACE_TRACKER,
  ETHERSCAN_TRACKER,
} from "@lib/constants";
import ContractABI from "./ContractABI.json";

export const transactionUtil = (props: {
  chain: number;
  puzzleId: number;
  library: ethers.providers.Web3Provider;
  account: string;
  changeLoading: Function;
}) => {
  let contractAddress: string;
  let blockTracker: string;

  if (props.chain === AVAX_CHAIN_ID) {
    contractAddress = CONTRACT_ADDRESS_AVAX;
    blockTracker = SNOWTRACE_TRACKER;
  } else if (props.chain === ETH_CHAIN_ID) {
    contractAddress = CONTRACT_ADDRESS_ETH;
    blockTracker = ETHERSCAN_TRACKER;
  } else {
    console.log("ERROR: WRONG CHAIN");
    return;
  }

  const registry = new ethers.Contract(
    contractAddress,
    ContractABI,
    props.library
  );

  const createTx = async () => {
    try {
      if (registry) {
        const data = registry.interface.encodeFunctionData("claim", [
          props.puzzleId,
          0x123,
        ]);

        const transaction = {
          to: contractAddress,
          from: props.account,
          data,
        };

        const tx = await props.library
          .getSigner()
          .sendTransaction(transaction)
          .catch((err) => setTransactionError(err));

        if (!tx) return;

        const txHash = tx.hash;

        tx.wait()
          .then(async () => {
            setTransactionSuccess(txHash);
          })
          .catch(() => {
            setTransactionFailed(txHash);
          });

        setTransactionStart(txHash);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const setTransactionError = (error: any) => {
    console.log(error);
    props.changeLoading(false);
  };

  const setTransactionStart = (txHash: string) => {
    const val = "https://" + blockTracker + ".io/tx/" + txHash;
    console.log(val);
    props.changeLoading(true);
  };

  const setTransactionSuccess = (txHash: string) => {
    const val = "https://" + blockTracker + ".io/tx/" + txHash;
    console.log(val);
    console.log("here");
    props.changeLoading(false);
  };

  const setTransactionFailed = (txHash: string) => {
    const val = "https://" + blockTracker + ".io/tx/" + txHash;
    console.log(val);
    props.changeLoading(false);
  };

  return {
    createTx,
  };
};
