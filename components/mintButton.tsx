import { useContractWrite, usePrepareContractWrite, useNetwork } from "wagmi";
import { IKAchievementABI__factory } from "@lib/generated/ethers-contract";
import { Contracts, contracts } from "@lib/walletConstants";
import LoadingIcon from "./loading-icon";
import { useEffect, useState } from "react";
import { validChain } from "@lib/utils";
import { useIKMinter } from "@lib/minter";

interface MintButtonParams {
  tokenId: number;
  gatedIds: number[];
}

export default function MintButton({ tokenId, gatedIds }: MintButtonParams) {
  const chain = useNetwork().chain;
  const { address, isConnected } = useIKMinter();
  const [signature, setSignature] = useState("");
  const [contractAddress, setContractAddress] = useState("");
  const [isVerifying, setIsVerifying] = useState(true);

  const [validChainId, setValidChainId] = useState(false);

  const buttonPrimaryClasses =
    "text-sm text-blue font-bold bg-turquoise border-solid border-2 border-turquoise hover:bg-turquoiseDark hover:cursor-pointer rounded-md py-2 w-44";

  useEffect(() => {
    const valid = validChain(chain?.id || 0);
    setValidChainId(valid);
    if (!chain) throw new Error("Network Issue");
    setContractAddress(contracts[chain.name as keyof Contracts]);
  }, [chain]);

  useEffect(() => {
    const verify = async (account: string, tokenId: number, chain: number) => {
      const gatedIdsString = `&${gatedIds
        .map((id) => `gatedIds=${id}`)
        .join("&")}`;

      //If pack (requires other NFTs) include gated, if single ignore
      const url = `/api/minter/verify?account=${account}&tokenId=${tokenId.toString()}&chainId=${chain.toString()}${
        gatedIds.length ? gatedIdsString : ""
      }`;

      const response = await fetch(url);
      if (response.ok) {
        const { signature } = await response.json();
        return signature;
      }

      throw await response.text();
    };

    if (address && chain) {
      const setSig = async () => {
        setIsVerifying(true);
        setSignature(await verify(address, tokenId, chain.id));
        setIsVerifying(false);
      };
      setSig();
    }
  }, [chain, address, tokenId, gatedIds]);

  const { config } = usePrepareContractWrite({
    addressOrName: contractAddress,
    contractInterface: IKAchievementABI__factory.abi,
    functionName: "claim",
    args: [tokenId, signature],
  });

  const { data, isLoading, isSuccess, write, error } = useContractWrite(config);

  return (
    <>
      {validChainId ? (
        <>
          {error && error.message !== "User rejected request" && (
            <div className="mb-6">Error: {JSON.stringify(error.message)}</div>
          )}
          {!isLoading && !isVerifying && isConnected && (
            <>
              {signature ? (
                <>
                  <h2 className="mt-20 text-xl tracking-tight font-extrabold text-white sm:mt-5 sm:text-2xl lg:mt-8 xl:text-2xl mb-8">
                    Claim Your Trophy On {chain?.name}
                  </h2>

                  <button
                    disabled={!write}
                    onClick={() => write?.()}
                    className={buttonPrimaryClasses}
                  >
                    Claim
                  </button>
                </>
              ) : (
                <>
                  <h2 className="mt-20 text-m tracking-tight text-white sm:mt-5 lg:mt-8 mb-8 w-9/12 text-center mx-auto">
                    You do not have the required NFTS on this chain. Please
                    ensure you have completed the above puzzles and are on the
                    correct chain.
                  </h2>
                  <button
                    disabled={true}
                    className="text-sm text-blue font-bold border-solid border-2 rounded-md py-2 w-44 mb-8 bg-gray-150 border-gray-150"
                  >
                    Claim
                  </button>
                </>
              )}
            </>
          )}

          {isLoading ||
            (isVerifying && (
              <div>
                <h2 className="mt-4 text-xl tracking-tight font-extrabold text-white sm:mt-5 sm:text-2xl lg:mt-8 xl:text-2xl mb-8">
                  {isVerifying ? "Checking For NFTs" : "Claiming Trophy"}
                </h2>
                <LoadingIcon />
              </div>
            ))}
          {isSuccess && <div>Transaction: {JSON.stringify(data)}</div>}
        </>
      ) : (
        <></>
      )}
    </>
  );
}
