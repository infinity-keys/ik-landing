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
  contractAVAX,
  contractETH,
  contractPolygon,
} from "@lib/contractConstants";
import type { IKAchievementABI__factory } from "@contracts/factories/IKAchievementABI__factory";

export const minterUtil = async (tokenId: number, signature: string) => {
  let claimedStatus = false;
  let txMessage: string;

  const { provider, account, chain } = wallet.retrieve();

  interface MintFactory {
    contractAddress: string;
    blockTracker: string;
    contract: ReturnType<typeof IKAchievementABI__factory.connect>;
  }

  const chainLookup: {
    [key: number]: MintFactory;
  } = {
    [AVAX_CHAIN_ID]: {
      contractAddress: CONTRACT_ADDRESS_AVAX,
      blockTracker: SNOWTRACE_TRACKER,
      contract: contractAVAX,
    },
    [ETH_CHAIN_ID]: {
      contractAddress: CONTRACT_ADDRESS_ETH,
      blockTracker: ETHERSCAN_TRACKER,
      contract: contractETH,
    },
    [POLYGON_CHAIN_ID]: {
      contractAddress: CONTRACT_ADDRESS_POLYGON,
      blockTracker: POLYGONSCAN_TRACKER,
      contract: contractPolygon,
    },
  };

  const minter = chainLookup[chain];
  if (!minter) throw new Error("Invalid chain");

  const createTx = async (signature: string) => {
    try {
      const data = minter.contract.interface.encodeFunctionData("claim", [
        tokenId,
        signature,
      ]);

      const transaction = {
        to: minter.contractAddress,
        from: account,
        data,
      };

      const tx = await provider
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

      txMessage = `${minter.blockTracker}/tx/${tx.hash}`;

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
