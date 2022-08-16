import {
  useContractWrite,
  usePrepareContractWrite,
  useNetwork,
  useAccount,
} from "wagmi";
import { IKAchievementABI__factory } from "@lib/generated/ethers-contract";
import { chainIds, Contracts, contracts } from "@lib/walletConstants";
import LoadingIcon from "./loading-icon";
import { useEffect, useState } from "react";

interface MintButtonParams {
  tokenId: number;
}

export default function MintButton({ tokenId }: MintButtonParams) {
  const chain = useNetwork().chain;
  const { address, isConnected } = useAccount();
  const [signature, setSignature] = useState("");
  const [contractAddress, setContractAddress] = useState("");

  useEffect(() => {
    if (!chain) throw new Error("Network Issue");
    else if (!chainIds.includes(chain?.id)) throw new Error("Invalid chain.");
    setContractAddress(contracts[chain.name as keyof Contracts]);
  }, [chain]);

  const verify = async (account: string, tokenId: number, chain: number) => {
    const url = `/api/minter/verify?account=${account}&tokenId=${tokenId.toString()}&chainId=${chain.toString()}`;

    const response = await fetch(url);
    if (response.ok) {
      const { signature } = await response.json();
      return signature;
    }

    throw await response.text();
  };

  useEffect(() => {
    if (address && chain) {
      const setSig = async () => {
        setSignature(await verify(address, tokenId, chain.id));
      };
      setSig();
    }
  }, [chain, address, tokenId]);

  const { config } = usePrepareContractWrite({
    addressOrName: contractAddress,
    contractInterface: IKAchievementABI__factory.abi,
    functionName: "claim",
    args: [tokenId, signature],
  });

  const { data, isLoading, isSuccess, write, error } = useContractWrite(config);
  console.log(data);

  return (
    <>
      <button disabled={!write} onClick={() => write?.()}>
        Claim
      </button>
      {isLoading && (
        <div>
          <h2 className="mt-4 text-xl tracking-tight font-extrabold text-white sm:mt-5 sm:text-2xl lg:mt-8 xl:text-2xl mb-8">
            Claiming Trophy
          </h2>
          <LoadingIcon />
        </div>
      )}
      {isSuccess && <div>Transaction: {JSON.stringify(data)}</div>}
      {error && <div>Error: {JSON.stringify(error)}</div>}
    </>
  );
}
