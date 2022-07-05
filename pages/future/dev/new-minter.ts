import { ethers } from "ethers";
import { claimUtil } from "./new-claim";
import { walletUtil } from "@lib/wallet";
import {
  AVAX_CHAIN_ID,
  ETH_CHAIN_ID,
  CONTRACT_ADDRESS_AVAX,
  CONTRACT_ADDRESS_ETH,
  SNOWTRACE_TRACKER,
  ETHERSCAN_TRACKER,
} from "@lib/constants";
import ContractABI from "./ContractABI.json";

export const mintUtil = (
  claim: ReturnType<typeof claimUtil>,
  wallet: ReturnType<typeof walletUtil>,
  puzzleId: number
) => {
  let txStatus: boolean;
  let txMessage: string;
  let contractAddress: string;
  let blockTracker: string;

  const { library, account } = wallet.retrieve();
  let { mintedStatus, globalChainID } = claim.retrieve();

  if (globalChainID === AVAX_CHAIN_ID) {
    contractAddress = CONTRACT_ADDRESS_AVAX;
    blockTracker = SNOWTRACE_TRACKER;
  } else if (globalChainID === ETH_CHAIN_ID) {
    contractAddress = CONTRACT_ADDRESS_ETH;
    blockTracker = ETHERSCAN_TRACKER;
  } else {
    //unsure how to do this here
    claim.switchChain(ETH_CHAIN_ID);
    return;
  }

  const registry = new ethers.Contract(contractAddress, ContractABI, library);

  const createTx = async (signature: string) => {
    try {
      if (registry) {
        const data = registry.interface.encodeFunctionData("claim", [
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
          .catch((err) => (txMessage = err));

        if (!tx) return;

        const txHash = tx.hash;

        tx.wait()
          .then(async () => {
            // tx success
            txMessage = "https://" + blockTracker + ".io/tx/" + txHash;
            mintedStatus = true;
            txStatus = false;
          })
          .catch(() => {
            // tex failed
            txMessage = "https://" + blockTracker + ".io/tx/" + txHash;
            mintedStatus = false;
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

  const verify = () => {
    return "0x123";
  };

  const mint = async () => {
    if (library) {
      try {
        const signature = verify();
        await createTx(signature);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const retrieve = () => ({
    txStatus,
    txMessage,
    mintedStatus,
  });

  return {
    retrieve,
    mint,
  };
};
