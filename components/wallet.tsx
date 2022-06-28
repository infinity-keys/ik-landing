import { useEffect, useState } from "react";
import { walletUtil } from "@lib/wallet";

const wallet = walletUtil();

interface WalletProps {
  onWalletSignature?: (address: string) => Promise<void>;
  setStatus?: (value: "connect" | "sign" | "disconnect") => void;
}

const Wallet = ({ onWalletSignature, setStatus }: WalletProps) => {
  const [userSignature, setUserSignature] = useState<string>("");
  const [userAccount, setUserAccount] = useState<string>("");

  const connect = async (): Promise<void> => {
    try {
      const { account } = await wallet.trigger();
      setUserAccount(account);
    } catch (error) {
      disconnect();
    }
  };

  const sign = async (): Promise<void> => {
    try {
      const signature = await wallet.sign();
      setUserSignature(signature);

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

    setUserAccount("");
    setUserSignature("");
  };

  useEffect(() => {
    if (setStatus) {
      const status =
        !userAccount && !userSignature
          ? "connect"
          : userAccount && !userSignature
          ? "sign"
          : "disconnect";

      setStatus(status);
    }
  }, [userAccount, userSignature, setStatus]);

  return (
    <button
      onClick={
        userAccount && !userSignature
          ? sign
          : userAccount && userSignature
          ? disconnect
          : connect
      }
      className="text-blue font-bold bg-turquoise hover:bg-turquoiseDark rounded-md py-2 px-4 mx-auto block"
    >
      {!userAccount && !userSignature && "Connect Wallet"}
      {userAccount && !userSignature && "Sign Message"}
      {userAccount && userSignature && "Disconnect"}
    </button>
  );
};

export default Wallet;
