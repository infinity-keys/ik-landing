import { useMachine } from "@xstate/react";
import { walletUtil } from "@lib/wallet";
import { walletConnectMachine } from "@lib/wallet.xstate";
import clsx from "clsx";

const wallet = walletUtil();

interface WalletProps {
  onWalletSignature?: (address: string) => Promise<void>;
}

const Wallet = ({ onWalletSignature }: WalletProps) => {
  const [current, send] = useMachine(walletConnectMachine);

  const connect = async (): Promise<void> => {
    send("requestConnect");
    try {
      const { account } = await wallet.trigger();
      send({ type: "connectionAuthorized", address: account });
    } catch (error) {
      send("connectionFailed");
      disconnect();
    }
  };

  const sign = async (): Promise<void> => {
    send("signRequest");
    try {
      await wallet.sign();
      send("signSuccessful");

      // Call the callback with our wallet address
      onWalletSignature &&
        (await onWalletSignature(current.context.walletAddress));

      // const network = await library.getNetwork();
      // setChainId(network.chainId);
    } catch (error) {
      send("signFailed");
      disconnect();
    }
  };

  const disconnect = () => {
    wallet.clear();
  };

  const handleClick = () => {
    if (current.matches("disconnected")) connect();
    if (current.matches("connected")) sign();
    if (current.matches("signed")) disconnect();
  };

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
      {current.matches("signing") || current.matches("connecting") ? (
        <div className="loader mx-auto h-8 mt-10 flex justify-center">
          <div className="ball-clip-rotate-multiple">
            <div></div>
            <div></div>
          </div>
        </div>
      ) : (
        <button
          onClick={handleClick}
          className="text-blue font-bold bg-turquoise hover:bg-turquoiseDark rounded-md py-2 px-4 mx-auto block"
        >
          {current.matches("disconnected") && "Connect Wallet"}
          {current.matches("connected") && "Sign Message"}
          {current.matches("signed") && "Disconnect"}
        </button>
      )}
    </>
  );
};

export default Wallet;
