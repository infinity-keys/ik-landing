import { useIKMinter } from "@hooks/useIKMinter";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import clsx from "clsx";
import { useState, useRef, useEffect } from "react";
import Button from "../components/button";
import LoadingIcon from "../components/loading-icon";

import { useSignMessage } from "wagmi";
import { verifyMessage } from "ethers/lib/utils";

interface WalletProps {
  onWalletSignature?: (address: string) => Promise<void>;
}

const Wallet = ({ onWalletSignature }: WalletProps) => {
  const { address, isConnected } = useIKMinter();
  const { openConnectModal } = useConnectModal();
  const [isSigned, setIsSigned] = useState(false);

  const recoveredAddress = useRef<string>();
  const { data, error, isLoading, signMessage, isSuccess } = useSignMessage({
    onSuccess(data, variables) {
      // Verify signature when sign message succeeds
      const address = verifyMessage(variables.message, data);
      recoveredAddress.current = address;
    },
  });

  useEffect(() => {
    if (data && !error) setIsSigned(true);
  }, [data, error]);

  const sign = async () => {
    const nonceReq = await fetch(`/api/users/${address}`);
    const { nonce } = await nonceReq.json();
    const message = nonce;
    signMessage({ message });
  };

  return (
    <>
      <p
        className={clsx(
          "text-md mb-3",
          !isConnected
            ? "font-bold text-neutral-50"
            : "line-through font-normal text-neutral-500"
        )}
      >
        1. Connect your wallet
      </p>
      <p
        className={clsx("text-md mb-8", {
          "font-normal text-neutral-500": !isConnected,
          "font-bold text-neutral-50": !isSigned,
          "font-normal text-neutral-500 line-through": isSigned,
        })}
      >
        2. Sign message
      </p>

      {!isSigned &&
        (isLoading ? (
          <LoadingIcon />
        ) : (
          <Button
            onClick={isConnected ? sign : openConnectModal}
            text={isConnected ? "Sign Message" : "Connect Wallet"}
          />
        ))}
    </>
  );
};

export default Wallet;
