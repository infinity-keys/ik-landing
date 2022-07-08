import { ethers } from "ethers";
import { wallet } from "@lib/wallet";
import {
  AVAX_CHAIN_ID,
  ETH_CHAIN_ID,
  CONTRACT_ADDRESS_AVAX,
  CONTRACT_ADDRESS_ETH,
  SNOWTRACE_TRACKER,
  ETHERSCAN_TRACKER,
} from "@lib/constants";
import ContractABI from "./ContractABI.json";

export const mintUtil = async (puzzleId: number) => {
  let claimedStatus: boolean;
  let txStatus = false;
  let txMessage: string;
  let contractAddress: string;
  let blockTracker: string;

  const { library, account, chain } = wallet.retrieve();

  if (chain === AVAX_CHAIN_ID) {
    contractAddress = CONTRACT_ADDRESS_AVAX;
    blockTracker = SNOWTRACE_TRACKER;
  } else if (chain === ETH_CHAIN_ID) {
    contractAddress = CONTRACT_ADDRESS_ETH;
    blockTracker = ETHERSCAN_TRACKER;
  } else {
    // Force them onto ETH if they're not, was unsure how to do this
    await wallet.switchChain(ETH_CHAIN_ID);
    const chainId = wallet.retrieve().chain;

    if (chainId === ETH_CHAIN_ID) {
      contractAddress = CONTRACT_ADDRESS_ETH;
      blockTracker = ETHERSCAN_TRACKER;
    } else throw new Error("Invalid Chain");
  }

  const contract = new ethers.Contract(contractAddress, ContractABI, library);

  const createTx = async (signature: string) => {
    try {
      if (contract) {
        const data = contract.interface.encodeFunctionData("claim", [
          puzzleId,
          signature,
        ]);

        const transaction = {
          to: contractAddress,
          from: account,
          data,
        };

        const tx = await library
          .getSigner()
          .sendTransaction(transaction)
          .catch((err) => console.log(err));

        if (!tx) return;

        const txHash = tx.hash;

        tx.wait()
          .then(async () => {
            // tx success
            claimedStatus = true;
            txStatus = false;
          })
          .catch(() => {
            // tx failed
            claimedStatus = false;
            txStatus = false;
          });

        // tx started
        txMessage = "https://" + blockTracker + ".io/tx/" + txHash;
        txStatus = true;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const verify = async () => {
    const url = `/api/future/dev/verify?account=${account}&puzzleId=${puzzleId}&chainId=${chain}`;
    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        return data?.signature;
      } else throw await response.text();
    } catch (error) {
      throw error;
    }
  };

  const mint = async () => {
    if (library) {
      try {
        const signature: string = await verify();
        if (signature) await createTx(signature);
        return retrieve();
      } catch (error) {}
    }
    return retrieve();
  };

  const retrieve = () => ({
    txStatus,
    txMessage,
    claimedStatus,
  });

  return {
    retrieve,
    mint,
  };
};
