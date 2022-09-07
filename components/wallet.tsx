import clsx from "clsx";
import Button from "./button";

import { useWalletConnect } from "@hooks/useWalletConnect";
import LoadingIcon from "@components/loading-icon";

interface WalletProps {
  onWalletSignature?: (address: string) => Promise<void>;
}

const Wallet = ({ onWalletSignature }: WalletProps) => {
  const { current, send, isSigned, isLoading, isNotConnected } =
    useWalletConnect();

  isSigned &&
    onWalletSignature &&
    onWalletSignature(current.context.walletAddress);

  return (
    <>
      <p
        className={clsx(
          "text-md mb-3",
          isNotConnected || current.matches("connecting")
            ? "font-bold text-neutral-50"
            : "line-through font-normal text-neutral-500"
        )}
      >
        1. Connect your wallet
      </p>
      <p
        className={clsx("text-md mb-8", {
          "font-normal text-neutral-500": isNotConnected,
          "font-bold text-neutral-50":
            current.matches("connected") || current.matches("signing"),
          "font-normal text-neutral-500 line-through":
            current.matches("signed"),
        })}
      >
        2. Sign message
      </p>

      {isLoading && <LoadingIcon />}

      {!isLoading && !isSigned && (
        <Button
          onClick={() => send("next")}
          text={
            current.matches("connected") ? "Sign Message" : "Connect Wallet"
          }
        />
      )}

      <button
        className={clsx("underline mx-auto block mt-5 text-turquoise", {
          invisible: isLoading || isNotConnected,
        })}
        onClick={() => send("disconnect")}
      >
        Disconnect
      </button>
    </>
  );
};

export default Wallet;
