import { useState } from "react";
import { walletUtil } from "@lib/wallet";

const wallet = walletUtil();

interface WalletProps {
  onWalletSignature?: (address: string) => Promise<void>;
}

const Wallet = ({ onWalletSignature }: WalletProps) => {
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

  return (
    <button
      onClick={
        userAccount && !userSignature
          ? sign
          : userAccount && userSignature
          ? disconnect
          : connect
      }
      className="text-blue font-bold bg-turquoise hover:bg-turquoiseDark rounded-md py-2 px-4"
    >
      {!userAccount && !userSignature && "Connect wallet"}
      {userAccount && !userSignature && "Sign Message"}
      {userAccount && userSignature && "Disconnect"}
    </button>
  );
};

export default Wallet;
