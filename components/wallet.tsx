import clsx from "clsx";
import Button from "./button";

import { useWalletConnect } from "@hooks/useWalletConnect";

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

      {isLoading && (
        <div className="loader mx-auto h-8 mt-10 flex justify-center">
          <div className="ball-clip-rotate-multiple">
            <div></div>
            <div></div>
          </div>
        </div>
      )}

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
