
import { useState, useEffect } from "react";

import { message } from "@lib/utils";
import { walletUtil } from "@lib/wallet";

const wallet = walletUtil();

interface WalletProps {
  onWalletSignature?: (address: string) => Promise<void>;
}
const Wallet = ({ onWalletSignature }: WalletProps) => {
  const [account, setAccount] = useState<string>();

  const [signature, setSignature] = useState<string>('');

  const connect = async (): Promise<void> => {
    try {
      const { library, account } = await wallet.trigger()

      setAccount(account);

      // Fetch our nonce used to sign our message
      const nonceReq = await fetch(`/api/users/${account}`);
      const { nonce } = await nonceReq.json();

      if (!library?.provider?.request)
        throw new Error("Library is undefined");
      const signature = await library.provider.request({
        method: "personal_sign",
        params: [message(nonce), account]
      });
      setSignature(signature);


      // With public address + signature, we can verify the signature
      const authReq = await fetch(`/api/users/auth`, {
        body: JSON.stringify({ publicAddress: account, signature }),
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST'
      })
      if (!authReq.ok) throw new Error("Could not verify signature");

      // Call the callback with our wallet address
      onWalletSignature && await onWalletSignature(account);

      // const network = await library.getNetwork();
      // setChainId(network.chainId);
    } catch (error) {
      disconnect();
    }

  }

  const disconnect = () => {
    wallet.clear();

    setAccount("");
    setSignature("");
  };

  return (
    <button onClick={account ? disconnect : connect} className="text-blue font-bold bg-turquoise hover:bg-turquoiseDark rounded-md py-2 px-4" >
      {!account && !signature && 'Connect wallet'}
      {account && !signature && 'Waiting on signature'}
      {account && signature && 'Disconnect'}
    </button>
  );
};

export default Wallet;
