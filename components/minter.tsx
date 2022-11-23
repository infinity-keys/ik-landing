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
import { checkIfClaimed, verify, walletAgeChecker } from "@lib/fetchers";
import { PACK_LANDING_BASE } from "@lib/constants";
import { useIKMinter } from "@hooks/useIKMinter";
import LoadingIcon from "@components/loading-icon";
import Button from "@components/button";
import Heading from "@components/heading";
import Markdown from "./markdown";

interface MinterParams {
  tokenId: number;
  gatedIds: number[];
  nftWalletAgeCheck: boolean;
  parentPackName?: string;
  packSuccessMessage?: string;
  buttonText?: string;
  packRoute?: string;
  setCompleted?: (b: boolean[]) => void;
  hasChecked?: boolean;
  setHasChecked?: (b: boolean) => void;
}

export default function Minter({
  tokenId,
  gatedIds,
  nftWalletAgeCheck,
  parentPackName,
  packSuccessMessage,
  buttonText,
  packRoute,
  setCompleted,
  hasChecked,
  setHasChecked,
}: MinterParams) {
  const chain = useNetwork().chain;
  const { address, isConnected } = useIKMinter();
  const { openConnectModal } = useConnectModal();
  const { openChainModal } = useChainModal();

  const [signature, setSignature] = useState("");
  const [contractAddress, setContractAddress] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [claimed, setClaimed] = useState(false);
  const [chainClaimed, setChainClaimed] = useState(0);
  const [approved, setApproved] = useState(true);

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

        const { claimed: tokenClaimed, chainClaimed: tokenChainClaimed } =
          await checkIfClaimed(address, tokenId);

        if (nftWalletAgeCheck)
          setApproved(await walletAgeChecker(address, chain.id));

        setClaimed(tokenClaimed);
        setChainClaimed(tokenChainClaimed);
        if (!tokenClaimed) {
          const res = await verify(address, tokenId, chain.id, gatedIds);
          setCompleted && setCompleted(res.claimedTokens || []);
          setSignature(res.signature);
        }

        if (tokenClaimed && setCompleted) {
          setCompleted(gatedIds.map(() => true));
        }

        setIsVerifying(false);
      };
      setSig();
    }
  }, [
    isConnected,
    chain,
    address,
    tokenId,
    gatedIds,
    chainIsValid,
    nftWalletAgeCheck,
    setCompleted,
  ]);

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
  //const txLink = `${chain?.blockExplorers?.default.url}/tx/${data?.hash}`;

  useEffect(() => {
    if (isSuccess) setClaimed(true);
    setChainClaimed(chain?.id || 1);
  }, [isSuccess, chain]);

  const mintButtonText = () => {
    if (!isConnected) return "Connect Wallet To Claim Trophy";
    else if (!chainIsValid) return "Switch Chain To Claim Trophy";
    else if (isVerifying) return "Checking the Blockchain";
    else if (isLoading) return "Claiming Trophy...";
    else if (claimed) return "Your Trophy Has Been Claimed";
    else if (txError) return txError.message;
    else if (
      writeError &&
      !(
        writeError.message === "User rejected request" ||
        writeError?.message.includes("user rejected transaction") ||
        writeError.message ===
          "MetaMask Tx Signature: User denied transaction signature."
      )
    )
      return writeError.message;
    else if (signature) return `Claim Your Trophy On ${chain?.name}`;
    else
      return "You do not have the required NFTS on this chain. Please ensure you have completed the above puzzles and are on the correct chain.";
  };

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
        "ik-button block min-w-full rounded-md border border-solid py-2 px-4 text-lg font-bold text-blue",
        !isConnected || !chainIsValid || signature || !writeError
          ? "border-turquoise bg-turquoise hover:cursor-pointer hover:bg-turquoiseDark"
          : "border-gray-150 bg-gray-150"
      )}
    >
      {isConnected ? (
        chainIsValid ? (
          claimed ? (
            chainClaimed === 0 ? (
              <a>NFT Claimed- Refresh Page!</a>
            ) : null
          ) : (
            "Claim"
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
    <div className="mt-12 flex flex-col items-center text-center">
      {setHasChecked && !hasChecked ? null : (
        <Heading as="h2" visual="s">
          {mintButtonText()}
        </Heading>
      )}
      {isConnected && claimed && packSuccessMessage && (
        <div className="text-center pt-4">
          <Markdown>{packSuccessMessage}</Markdown>
        </div>
      )}

      <div className="w-full max-w-xs py-8 flex flex-col items-center">
        {!claimed &&
          (setHasChecked && !hasChecked ? (
            <button
              onClick={() => setHasChecked(true)}
              className="ik-button block min-w-full rounded-md border border-solid py-2 px-4 text-lg font-bold text-blue border-turquoise bg-turquoise hover:cursor-pointer hover:bg-turquoiseDark mt-4"
            >
              Check My NFTs
            </button>
          ) : ((isVerifying || isLoading) && chainIsValid) ||
            (claimed && chainClaimed === 0) ? (
            <LoadingIcon />
          ) : (
            buttonMint
          ))}

        {parentPackName && (
          <div className="pt-4 w-full">
            <Button
              href={`/${PACK_LANDING_BASE}/${packRoute}`}
              text={buttonText || `Go to ${parentPackName}`}
              variant="outline"
              fullWidth
            />
          </div>
        )}

        {!isLoading &&
          isConnected &&
          chainIsValid &&
          claimed &&
          chainClaimed !== 0 && (
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={`${marketplaceLookup[chainClaimed]}${tokenId}`}
              className="text-gray-200 underline mt-6"
            >
              View NFT On{" "}
              {chainClaimed === AVAX_CHAIN_ID
                ? "Joepegs"
                : chainClaimed === OPTIMISM_CHAIN_ID
                ? "Quixotic"
                : "OpenSea"}
            </a>
          )}
      </div>
    </div>
  );
}
