import { useMachine, useSelector } from "@xstate/react";
import { State } from "xstate";
import clsx from "clsx";
import { walletConnectMachine, WalletContext } from "@lib/wallet.xstate";

interface WalletProps {
  onWalletSignature?: (address: string) => Promise<void>;
}

const selectSignature = (state: State<WalletContext>) =>
  state.context.signature;

const compareSignature = (prevSig: string, nextSig: string) =>
  prevSig === nextSig;

const Wallet = ({ onWalletSignature }: WalletProps) => {
  const [current, send, service] = useMachine(walletConnectMachine);
  const isSigned = useSelector(service, selectSignature, compareSignature);
  const isLoading =
    current.matches("signing") ||
    current.matches("connecting") ||
    current.matches("signed");

  if (isSigned && onWalletSignature) {
    onWalletSignature(current.context.walletAddress);
  }

  return (
    <>
      <p
        className={clsx(
          "text-md mb-3",
          current.matches("disconnected") || current.matches("connecting")
            ? "font-bold text-neutral-50"
            : "line-through font-normal text-neutral-500"
        )}
      >
        1. Connect your wallet
      </p>
      <p
        className={clsx("text-md mb-8", {
          "font-normal text-neutral-500": current.matches("disconnected"),
          "font-bold text-neutral-50":
            current.matches("connected") || current.matches("signing"),
          "font-normal text-neutral-500 line-through":
            current.matches("signed"),
        })}
      >
        2. Sign message
      </p>
      {isLoading ? (
        <div className="loader mx-auto h-8 mt-10 flex justify-center">
          <div className="ball-clip-rotate-multiple">
            <div></div>
            <div></div>
          </div>
        </div>
      ) : (
        <button
          onClick={() => send("next")}
          className="text-blue font-bold bg-turquoise hover:bg-turquoiseDark rounded-md py-2 px-4 mx-auto block"
        >
          {current.matches("disconnected") && "Connect Wallet"}
          {current.matches("connected") && "Sign Message"}
        </button>
      )}
    </>
  );
};

export default Wallet;
