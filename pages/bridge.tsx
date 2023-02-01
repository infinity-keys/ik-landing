import { NextPage } from "next";

import Wrapper from "@components/wrapper";
import Seo from "@components/seo";
import {
  useAccount,
  useContractWrite,
  useNetwork,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { contractAddressLookup, validChain } from "@lib/walletConstants";
import { IKAchievementABI__factory } from "@lib/generated/ethers-contract";
import { useState } from "react";
import Button from "@components/button";

const BridgePage: NextPage = () => {
  const [tokenId, setTokenId] = useState<string>();
  const [toChainId, setToChainId] = useState<string>();
  const [payableAmount, setPayableAmount] = useState("0");
  const [enabled, setEnabled] = useState(false);

  const { chain } = useNetwork();
  const { isConnected, address } = useAccount();
  const isValidChain = validChain(chain?.id || 0);
  const contractAddress =
    chain && isValidChain && contractAddressLookup[chain.id];

  const { config } = usePrepareContractWrite({
    addressOrName: contractAddress || "",
    contractInterface: IKAchievementABI__factory.abi,
    functionName: "traverseChain",
    args: [10, 1],
    // enabled: enabled,
    onSettled(data, error) {
      console.log("Settled", { data, error });
    },
  });

  console.log(config);

  const {
    data: writeData,
    write,
    error: writeError,
  } = useContractWrite(config);

  console.log("write", write);
  console.log(writeData);

  const {
    error: transactionError,
    isLoading: transactionPending,
    isSuccess: transactionSuccess,
  } = useWaitForTransaction({
    hash: writeData?.hash,
  });
  console.log("write", writeError);
  console.log("tx", transactionError);

  return (
    <Wrapper>
      <Seo title="Bridge" />

      <div className="text-center">
        <h2 className="mt-4 text-xl tracking-tight font-bold text-white sm:mt-5 sm:text-2xl lg:mt-8 xl:text-2xl">
          Bridge
        </h2>
        <h2>tokenID</h2>
        <p>{tokenId}</p>
        <input
          className="text-gray-600"
          type="number"
          name="tokenId"
          id="tokenId"
          onChange={(e) => setTokenId(e.target.value)}
        />

        <h2>chainID</h2>
        <p>{toChainId}</p>
        <input
          className="text-gray-600"
          type="number"
          name="tokenId"
          id="tokenId"
          onChange={(e) => setToChainId(e.target.value)}
        />
      </div>

      {/* {chain && tokenId && payableAmount && contractAddress && ( */}
      <Button onClick={() => write?.()} text="bridge" />
      <Button onClick={() => setEnabled(!enabled)} text="enable" />
      {/* )} */}
    </Wrapper>
  );
};
export default BridgePage;
