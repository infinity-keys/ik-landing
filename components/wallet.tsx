import { useEffect, useState } from "react";
import { useMachine } from "@xstate/react";
import { walletUtil } from "@lib/wallet";
import { walletConnectMachine } from "@lib/walletState";

const wallet = walletUtil();

interface WalletProps {
  onWalletSignature?: (address: string) => Promise<void>;
  setStatus?: (value: "connect" | "sign" | "disconnect") => void;
}

const Wallet = ({ onWalletSignature, setStatus }: WalletProps) => {
  const [userSignature, setUserSignature] = useState<string>("");
  const [userAccount, setUserAccount] = useState<string>("");
  const [current, send] = useMachine(walletConnectMachine);
  console.log("setStatus: ", !!setStatus);

  const connect = async (): Promise<void> => {
    try {
      const { account } = await wallet.trigger();
      setUserAccount(account);
      send("NEXT");
      setStatus && setStatus("sign");
    } catch (error) {
      disconnect();
    }
  };

  const sign = async (): Promise<void> => {
    try {
      const signature = await wallet.sign();
      setUserSignature(signature);
      send("NEXT");
      setStatus && setStatus("disconnect");

      // Call the callback with our wallet address
      onWalletSignature && (await onWalletSignature(userAccount));

      // const network = await library.getNetwork();
      // setChainId(network.chainId);
    } catch (error) {
      disconnect();
    }
  };

  const disconnect = () => {
    wallet.clear();
    send("NEXT");
    setStatus && setStatus("connect");
    setUserAccount("");
    setUserSignature("");
  };

  const handleClick = () => {
    if (current.matches("connect")) connect();
    if (current.matches("sign")) sign();
    if (current.matches("disconnect")) disconnect();
  };

  return (
    <button
      onClick={handleClick}
      className="text-blue font-bold bg-turquoise hover:bg-turquoiseDark rounded-md py-2 px-4 mx-auto block"
    >
      {current.matches("connect") && "Connect Wallet"}
      {current.matches("sign") && "Sign Message"}
      {current.matches("disconnect") && "Disconnect"}
    </button>
  );
};

export default Wallet;
