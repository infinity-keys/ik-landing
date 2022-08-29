import { useEffect, useState } from "react";
import {
  useContractWrite,
  usePrepareContractWrite,
  useNetwork,
  useWaitForTransaction,
} from "wagmi";
import { useChainModal, useConnectModal } from "@rainbow-me/rainbowkit";
import clsx from "clsx";

import { IKAchievementABI__factory } from "@lib/generated/ethers-contract";
import {
  AVAX_CHAIN_ID,
  contractAddressLookup,
  marketplaceLookup,
  OPTIMISM_CHAIN_ID,
} from "@lib/walletConstants";
import { validChain } from "@lib/utils";
import { checkIfClaimed, verify } from "@lib/fetchers";
import { useIKMinter } from "@hooks/useIKMinter";
import LoadingIcon from "@components/loading-icon";

interface MinterParams {
  tokenId: number;
  gatedIds: number[];
}

export default function Minter({ tokenId, gatedIds }: MinterParams) {
  const chain = useNetwork().chain;
  const { address, isConnected } = useIKMinter();
  const { openConnectModal } = useConnectModal();
  const { openChainModal } = useChainModal();

  const [signature, setSignature] = useState("");
  const [contractAddress, setContractAddress] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [claimed, setClaimed] = useState(false);

  const [chainIsValid, setChainIsValid] = useState(false);

  useEffect(() => {
    const valid = validChain(chain?.id || 0);
    setChainIsValid(valid);
    if (chain) setContractAddress(contractAddressLookup[chain.id]);
  }, [chain]);

  useEffect(() => {
    if (address && chain && isConnected && chainIsValid) {
      const setSig = async () => {
        setIsVerifying(true);
        const tokenClaimed = await checkIfClaimed(address, tokenId);
        setClaimed(tokenClaimed);
        if (!tokenClaimed)
          setSignature(await verify(address, tokenId, chain.id, gatedIds));
        setIsVerifying(false);
      };
      setSig();
    }
  }, [isConnected, chain, address, tokenId, gatedIds, chainIsValid]);

  const { config } = usePrepareContractWrite({
    addressOrName: contractAddress,
    contractInterface: IKAchievementABI__factory.abi,
    functionName: "claim",
    args: [tokenId, signature],
  });

  const { data, write, error: writeError } = useContractWrite(config);

  const {
    error: txError,
    isLoading,
    isSuccess,
  } = useWaitForTransaction({
    hash: data?.hash,
  });
  const txLink = `${chain?.blockExplorers?.default.url}/tx/${data?.hash}`;

  useEffect(() => {
    if (isSuccess) setClaimed(true);
  }, [isSuccess]);

  // isVerifying = Verify + CheckIfOwned API Calls
  // isLoading = Tx is processing
  // <>
  //             Claiming Trophy! <br />
  //             <a
  //               href={txLink}
  //               className="border-b-2"
  //               target="_blank"
  //               rel="noopener noreferrer"
  //             >
  //               View Your Transaction
  //             </a>
  //           </>
  // @TODO: move this to good ol' fashioned if else statements. Or xstate.
  const text = isConnected
    ? chainIsValid
      ? !isVerifying
        ? !claimed
          ? !isLoading
            ? !txError
              ? !writeError ||
                writeError?.message === "User rejected request" ||
                writeError?.message.includes("user rejected transaction") ||
                writeError.message ===
                  "MetaMask Tx Signature: User denied transaction signature."
                ? signature
                  ? `Claim Your Trophy On ${chain?.name}`
                  : "You do not have the required NFTS on this chain. Please ensure you have completed the above puzzles and are on the correct chain."
                : writeError.message
              : txError.message
            : "Claiming Trophy..."
          : "Your Trophy Has Been Claimed"
        : "Checking NFTs"
      : "Switch Chain To Claim Trophy"
    : "Connect Wallet To Claim Trophy";

  const buttonMint = (
    // @TOOD: utilize existing Button component for this
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
      className={clsx(
        "text-sm text-blue font-bold rounded-md py-2 w-44 border-2 border-solid",
        !isConnected || !chainIsValid || signature || !writeError
          ? "bg-turquoise border-turquoise hover:bg-turquoiseDark hover:cursor-pointer"
          : "bg-gray-150 border-gray-150"
      )}
    >
      {isConnected ? (
        chainIsValid ? (
          !claimed ? (
            "Claim"
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

      {(isVerifying || isLoading) && chainIsValid ? (
        <LoadingIcon />
      ) : (
        buttonMint
      )}
    </>
  );
}
