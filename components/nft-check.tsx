import { useEffect, useState } from "react";
import { useNetwork } from "wagmi";

import { useIKMinter } from "@hooks/useIKMinter";

import { PUZZLE_SUCCESS_BASE } from "@lib/constants";
import { nftChecker } from "@lib/fetchers";

import Alert from "@components/alert";
import Button from "@components/button";
import Heading from "@components/heading";
import LoadingIcon from "@components/loading-icon";

interface NftCheckProps {
  nftCheckParameters: any;
  successRoute?: string;
  finalStep?: boolean;
}

const NftCheck = ({
  nftCheckParameters,
  successRoute,
  finalStep,
}: NftCheckProps) => {
  const [nftApproval, setNftApproval] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isOnCorrectChain, setIsOnCorrectChain] = useState(false);

  const { address, isConnected, mounted } = useIKMinter();
  const chain = useNetwork().chain;

  const { nftChainId, nftTokenId, nftContractAddress } =
    nftCheckParameters || {};

  useEffect(() => {
    setIsOnCorrectChain(chain?.id === nftCheckParameters.nftChainId);
  }, [chain, nftCheckParameters]);

  useEffect(() => {
    const checkNFT = async () => {
      if (address && isOnCorrectChain) {
        setLoading(true);
        const checker = await nftChecker(
          address,
          nftChainId,
          nftContractAddress,
          nftTokenId,
          successRoute || "/",
          finalStep || true //true for default ?
        );
        setLoading(false);
        setNftApproval(checker);
      }
    };

    checkNFT();
  }, [
    address,
    isOnCorrectChain,
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
            ? "Congratulations. You may proceed."
            : "You must own the correct NFT to pass"}
        </Heading>
      </div>

      {!address && (
        <div className="pb-8 max-w-lg mx-auto flex justify-center">
          {mounted ? (
            <Alert text="This puzzle relies on owning and NFT. Please connect your wallet." />
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

      {address && !isOnCorrectChain && !loading && (
        <div className="pb-8 max-w-lg mx-auto flex justify-center">
          <Alert text="You are not on the correct chain. Please switch." />
        </div>
      )}

      <div className="flex justify-center">
        <Button
          text="Continue"
          disabled={!nftApproval}
          href={nftApproval ? `/${PUZZLE_SUCCESS_BASE}/${successRoute}` : ""}
        />
      </div>
    </div>
  );
};

export default NftCheck;
