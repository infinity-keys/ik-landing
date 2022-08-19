import {
  useContractWrite,
  usePrepareContractWrite,
  useNetwork,
  useWaitForTransaction,
} from "wagmi";
import { IKAchievementABI__factory } from "@lib/generated/ethers-contract";
import {
  AVAX_CHAIN_ID,
  contractAddressLookup,
  marketplaceLookup,
  OPTIMISM_CHAIN_ID,
} from "@lib/walletConstants";
import LoadingIcon from "./loading-icon";
import { useEffect, useState } from "react";
import { validChain } from "@lib/utils";
import { useIKMinter } from "@hooks/useIKMinter";
import Alert from "./alert";
import { useChainModal, useConnectModal } from "@rainbow-me/rainbowkit";
import { checkIfClaimed, verify } from "@lib/fetchers";

interface MintButtonParams {
  tokenId: number;
  gatedIds: number[];
}

export default function MintButton({ tokenId, gatedIds }: MintButtonParams) {
  const chain = useNetwork().chain;
  const { address, isConnected } = useIKMinter();
  const { openConnectModal } = useConnectModal();
  const { openChainModal } = useChainModal();

  const [signature, setSignature] = useState("");
  const [contractAddress, setContractAddress] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [claimed, setClaimed] = useState(false);

  const [chainIsValid, setChainIsValid] = useState(false);

  const buttonPrimaryClasses =
    "text-sm text-blue font-bold bg-turquoise border-solid border-2 border-turquoise hover:bg-turquoiseDark hover:cursor-pointer rounded-md py-2 w-44";

  const buttonPrimaryDisabled =
    "text-sm text-blue font-bold border-solid border-2 rounded-md py-2 w-44 mb-8 bg-gray-150 border-gray-150";

  useEffect(() => {
    const valid = validChain(chain?.id || 0);
    setChainIsValid(valid);
    if (chain) setContractAddress(contractAddressLookup[chain.id]);
  }, [chain]);

  useEffect(() => {
    if (address && chain && isConnected) {
      const setSig = async () => {
        setIsVerifying(true);
        setSignature(await verify(address, tokenId, chain.id, gatedIds));
        setClaimed(await checkIfClaimed(address, tokenId));
        setIsVerifying(false);
      };
      setSig();
    }
  }, [isConnected, chain, address, tokenId, gatedIds]);

  const { config } = usePrepareContractWrite({
    addressOrName: contractAddress,
    contractInterface: IKAchievementABI__factory.abi,
    functionName: "claim",
    args: [tokenId, signature],
  });

  const { data, write, error: writeError } = useContractWrite(config);

  const { error: txError, isLoading } = useWaitForTransaction({
    hash: data?.hash,
  });
  const txLink = `${chain?.blockExplorers?.default.url}/tx/${data?.hash}`;

  // isVerifying = Verify + CheckIfOwned API Calls
  // isLoading = Tx is processing
  const text = isConnected
    ? chainIsValid
      ? !isVerifying
        ? !claimed
          ? !isLoading
            ? !txError
              ? !writeError || writeError?.message === "User rejected request"
                ? signature
                  ? `Claim Your Trophy On ${chain?.name}`
                  : "You do not have the required NFTS on this chain. Please ensure you have completed the above puzzles and are on the correct chain."
                : writeError.message
              : txError.message
            : "Claiming Trophy!"
          : "Your Trophy Has Been Claimed"
        : "Checking NFTs"
      : "Switch Chain To Claim Trophy"
    : "Connect Wallet To Claim Trophy";

  const buttonMint = (
    <button
      disabled={
        isConnected && chainIsValid
          ? signature || !writeError
            ? !write
            : true
          : false
      }
      onClick={
        isConnected
          ? chainIsValid
            ? !(claimed || isLoading)
              ? () => write?.()
              : undefined
            : openChainModal
          : openConnectModal
      }
      className={
        !isConnected || !chainIsValid || signature
          ? buttonPrimaryClasses
          : buttonPrimaryDisabled
      }
    >
      {isConnected ? (
        chainIsValid ? (
          !claimed ? (
            !isLoading ? (
              "Claim"
            ) : (
              <a href={txLink} target="_blank" rel="noopener noreferrer">
                View Your Transaction
              </a>
            )
          ) : (
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={`${marketplaceLookup[chain?.id || 0]}${tokenId}`}
            >
              View NFT On{" "}
              {chain?.id === AVAX_CHAIN_ID
                ? "Joepegs"
                : chain?.id === OPTIMISM_CHAIN_ID
                ? "Quixotic"
                : "OpenSea"}
            </a>
          )
        ) : (
          "Switch Chain"
        )
      ) : (
        "Connect Wallet"
      )}
    </button>
  );

  return (
    <>
      <h2 className="mt-20 text-xl tracking-tight font-bold text-white sm:mt-5 sm:text-2xl lg:mt-8 xl:text-2xl mb-8">
        {text}
      </h2>

      {isVerifying ? <LoadingIcon /> : buttonMint}
    </>
  );
}
