import { wallet } from "@lib/wallet";
import {
  AVAX_CHAIN_ID,
  ETH_CHAIN_ID,
  CONTRACT_ADDRESS_AVAX,
  CONTRACT_ADDRESS_ETH,
  SNOWTRACE_TRACKER,
  ETHERSCAN_TRACKER,
} from "@lib/constants";
import { IKAchievementABI__factory } from "@contracts/factories/IKAchievementABI__factory";

export const minterUtil = async (tokenId: number) => {
  let claimedStatus = false;
  let txMessage: string;

  const { library, account, chain } = wallet.retrieve();

  const contractAddress =
    chain === AVAX_CHAIN_ID
      ? CONTRACT_ADDRESS_AVAX
      : chain === ETH_CHAIN_ID
      ? CONTRACT_ADDRESS_ETH
      : undefined;
  const blockTracker =
    chain === AVAX_CHAIN_ID
      ? SNOWTRACE_TRACKER
      : chain === ETH_CHAIN_ID
      ? ETHERSCAN_TRACKER
      : undefined;

  if (!contractAddress || !blockTracker)
    throw new Error("Invalid contract address");

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

  const verify = async () => {
    const url = `/api/minter/verify?account=${account}&tokenId=${tokenId.toString()}&chainId=${chain.toString()}`;

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
        const signature = await verify();
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
