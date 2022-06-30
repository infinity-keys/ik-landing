import { useState } from "react";
import { walletUtil } from "@lib/wallet";

const wallet = walletUtil();

interface WalletProps {
  onWalletSignature?: (address: string) => Promise<void>;
  current: any;
  send: any;
}

const Wallet = ({ onWalletSignature, current, send }: WalletProps) => {
  const [userAccount, setUserAccount] = useState<string>("");

  const connect = async (): Promise<void> => {
    try {
      const { account } = await wallet.trigger();
      setUserAccount(account);
      send("NEXT");
    } catch (error) {
      disconnect();
    }
  };

  const sign = async (): Promise<void> => {
    try {
      await wallet.sign();
      send("NEXT");

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
    setUserAccount("");
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
