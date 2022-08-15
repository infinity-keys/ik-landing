import { useContractWrite, usePrepareContractWrite, useNetwork } from "wagmi";
import { IKAchievementABI__factory } from "@lib/generated/ethers-contract";
import { contracts } from "@lib/walletConstants";

export default function MintButton() {
  const chainId = useNetwork().chain?.id;

  if (!chainId) throw new Error("Network Issue.");
  const { config } = usePrepareContractWrite({
    addressOrName: contracts[chainId],
    contractInterface: IKAchievementABI__factory.abi,
    functionName: "claim",
  });
  const { data, isLoading, isSuccess, write } = useContractWrite(config);

  return (
    <div>
      <button disabled={!write} onClick={() => write?.()}>
        Feed
      </button>
      {isLoading && <div>Check Wallet</div>}
      {isSuccess && <div>Transaction: {JSON.stringify(data)}</div>}
    </div>
  );
}
