import { wallet } from "@lib/wallet";
import {
  AVAX_CHAIN_ID,
  ETH_CHAIN_ID,
  CONTRACT_ADDRESS_AVAX,
  CONTRACT_ADDRESS_ETH,
  SNOWTRACE_TRACKER,
  ETHERSCAN_TRACKER,
} from "@lib/constants";
import { IKAchievementABI__factory } from "@lib/generated/ethers-contract/factories/IKAchievementABI__factory";

export const minterUtil = async (puzzleId: number) => {
  let claimedStatus = false;
  let txMessage = "";
  let contractAddress = "";
  let blockTracker = "";

  const { library, account, chain } = wallet.retrieve();

  if (chain === AVAX_CHAIN_ID) {
    contractAddress = CONTRACT_ADDRESS_AVAX;
    blockTracker = SNOWTRACE_TRACKER;
  } else if (chain === ETH_CHAIN_ID) {
    contractAddress = CONTRACT_ADDRESS_ETH;
    blockTracker = ETHERSCAN_TRACKER;
  } else {
    throw new Error("Invalid Chain");
  }

  const contract = IKAchievementABI__factory.connect(contractAddress, library);

  const createTx = async (signature: string) => {
    try {
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

      txMessage = "https://" + blockTracker + ".io/tx/" + tx.hash;

      try {
        await tx.wait();
        claimedStatus = true;
      } catch (error) {
        claimedStatus = false;
        console.log(error);
      }
    } catch (error) {
      console.log(error);
      throw new Error("Transaction failed.");
    }
  };

  const verify = async () => {
    const url = `/api/minter/verify?account=${account}&puzzleId=${puzzleId}&chainId=${chain}`;
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
      } catch (error) {
        throw error;
      }
    }
    return retrieve();
  };

  const retrieve = () => ({
    txMessage,
    claimedStatus,
  });

  return {
    retrieve,
    mint,
  };
};
