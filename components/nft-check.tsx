//1155: {"nftChainId": , "nftTokenId":, "nftContractAddress":""}
//721: {"nftChainId": , "nftContractAddress":""}

import { useEffect, useState } from "react";
import { useIKMinter } from "@hooks/useIKMinter";

import { PUZZLE_LANDING_BASE, PUZZLE_SUCCESS_BASE } from "@lib/constants";
import { nftChecker } from "@lib/fetchers";

import Alert from "@components/alert";
import Button from "@components/button";
import Heading from "@components/heading";
import LoadingIcon from "@components/loading-icon";

interface NftCheckProps {
  nftCheckParameters: any;
  successRoute?: string;
  finalStep: boolean;
}

const NftCheck = ({
  nftCheckParameters,
  successRoute,
  finalStep,
}: NftCheckProps) => {
  const [nftApproval, setNftApproval] = useState(false);
  const [loading, setLoading] = useState(false);

  const { address, isConnected, mounted } = useIKMinter();

  const { nftChainId, nftTokenId, nftContractAddress } =
    nftCheckParameters || {};

  const nextStepBase = finalStep ? PUZZLE_SUCCESS_BASE : PUZZLE_LANDING_BASE;

  useEffect(() => {
    const checkNFT = async () => {
      if (address) {
        setLoading(true);
        const checker = await nftChecker(
          address,
          nftChainId,
          nftContractAddress,
          nftTokenId,
          successRoute || "/",
          finalStep
        );
        setLoading(false);
        setNftApproval(checker);
      }
    };

    checkNFT();
  }, [
    address,
    isConnected,
    nftChainId,
    nftTokenId,
    nftContractAddress,
    nftCheckParameters,
    successRoute,
    finalStep,
  ]);

  return (
    <div>
      <div className="pb-8">
        <Heading as="h2" visual="s">
          {nftApproval
            ? "Challenge complete!"
            : "This challenge requires a digital key. Please collect the required NFT to unlock."}
        </Heading>
      </div>

      {!address && (
        <div className="pb-8 max-w-lg mx-auto flex justify-center">
          {mounted ? (
            <Alert text="This puzzle relies on owning an NFT. Please connect your wallet." />
          ) : (
            <></>
          )}
        </div>
      )}

      {loading && (
        <>
          <p>Checking the Blockchain...</p>
          <div className="py-10">
            <LoadingIcon />
          </div>
        </>
      )}

      <div className="flex justify-center">
        <Button
          text="Unlock"
          disabled={!nftApproval}
          href={nftApproval ? `/${nextStepBase}/${successRoute}` : ""}
        />
      </div>
    </div>
  );
};

export default NftCheck;
