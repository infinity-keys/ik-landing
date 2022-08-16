import { useState, useEffect } from "react";
import { wallet } from "@lib/wallet";
import {
  AVAX_CHAIN_ID,
  ETH_CHAIN_ID,
  POLYGON_CHAIN_ID,
  CONTRACT_ADDRESS_AVAX,
  CONTRACT_ADDRESS_ETH,
  CONTRACT_ADDRESS_POLYGON,
  SNOWTRACE_TRACKER,
  ETHERSCAN_TRACKER,
  POLYGONSCAN_TRACKER,
} from "@lib/walletConstants";

import { IKAchievementABI__factory } from "@contracts/factories/IKAchievementABI__factory";
import { useAccount } from "wagmi";

export const useIKMinter = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const { address, isConnected } = useAccount();

  return {
    address: mounted && address,
    isConnected: mounted && isConnected,
  };
};

export const minterUtil = async (tokenId: number, signature: string) => {
  let claimedStatus = false;
  let txMessage: string;

  const { library, account, chain } = wallet.retrieve();

  const contractAddress =
    chain === AVAX_CHAIN_ID
      ? CONTRACT_ADDRESS_AVAX
      : chain === ETH_CHAIN_ID
      ? CONTRACT_ADDRESS_ETH
      : chain === POLYGON_CHAIN_ID
      ? CONTRACT_ADDRESS_POLYGON
      : undefined;
  const blockTracker =
    chain === AVAX_CHAIN_ID
      ? SNOWTRACE_TRACKER
      : chain === ETH_CHAIN_ID
      ? ETHERSCAN_TRACKER
      : chain === POLYGON_CHAIN_ID
      ? POLYGONSCAN_TRACKER
      : undefined;

  if (!contractAddress || !blockTracker) throw new Error("Invalid chain.");

  const contract = IKAchievementABI__factory.connect(contractAddress, library);

  const createTx = async (signature: string) => {
    try {
      const data = contract.interface.encodeFunctionData("claim", [
        tokenId,
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
        .catch((err) => {
          if (err.code === 4001) {
            // If user rejects TX don't blow up
            // Removed this catch but threw error before catching below
            claimedStatus = false;
            return;
          }
        });

      if (!tx) return;

      txMessage = `${blockTracker}/tx/${tx.hash}`;

      const receipt = await tx.wait();
      claimedStatus = receipt.status === 1;
    } catch (error) {
      claimedStatus = false;
      throw error;
    }
  };

  const mint = async () => {
    if (signature) await createTx(signature);
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
