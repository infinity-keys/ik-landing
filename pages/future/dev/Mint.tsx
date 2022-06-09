import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import type { NextPage } from "next";
import { walletUtil } from "@lib/wallet";

import ContractABI from "./ContractABI.json";

const wallet = walletUtil();

const ContractAddress = "0x2df860eEe7c02F1f7DF8adE65e8c2Cb372432A2B";
const blockTracker = "testnet.snowtrace";

interface PageProps {
  puzzleId: number;
}

const Mint: NextPage<PageProps> = ({ puzzleId }) => {
  puzzleId = 0;
  const [registry, setRegistry] = useState<ethers.Contract>();
  const [account, setAccount] = useState<string>();
  const [txMessage, setTxMessage] = useState<string>();
  const [txProgress, setTxProgress] = useState<boolean>(false);
  const [claimedBool, setClaimedBool] = useState<boolean>(false);

  useEffect(() => {
    if (registry && account) {
      checkIfClaimed();
    }
  }, [registry, account, txProgress]);

  const mintNFT = async () => {
    if (registry) {
      const signature = await verify();

      const data = registry.interface.encodeFunctionData("claim", [
        puzzleId,
        signature,
      ]);

      createTx(data);
    }
  };

  const connectWallet = async () => {
    await wallet.trigger();
    const { library, account } = wallet.retrieve();
    setAccount(account);
    setRegistry(new ethers.Contract(ContractAddress, ContractABI, library));
  };

  const verify = async () => {
    const url = `http://localhost:3001/signature?account=${account}&id=${String(
      puzzleId
    )}`;

    let data;

    try {
      const fetchResponse = await fetch(url);

      if (fetchResponse.ok) {
        data = await fetchResponse.json();
        return data.signature;
      } else {
        const error = await fetchResponse.text();
        console.log(error);
        return;
      }
    } catch (err) {
      console.log(err);
      return;
    }
  };

  const checkIfClaimed = async () => {
    if (registry) {
      try {
        setClaimedBool(await registry.checkIfClaimed(puzzleId, account));
      } catch (error) {
        console.log(error);
      }
    }
  };

  const createTx = async (data: string) => {
    const { library } = wallet.retrieve();

    try {
      if (registry) {
        const transaction = {
          to: ContractAddress,
          from: account,
          data,
        };

        const tx = await library
          .getSigner()
          .sendTransaction(transaction)
          .catch((err) => setTransactionError(err));

        if (!tx) return;

        const txHash = tx.hash;

        tx.wait()
          .then(async () => {
            setTransactionSuccess(txHash);
          })
          .catch(() => {
            setTransactionFailed(txHash);
          });

        setTransactionStart(txHash);
      }
    } catch (error) {
      setTransactionError(error);
    }
  };

  const setTransactionError = (error: unknown) => {
    console.log(error);
    setTxProgress(false);
  };

  const setTransactionStart = (txHash: string) => {
    const val = "https://" + blockTracker + ".io/tx/" + txHash;
    setTxMessage(val);
    setTxProgress(true);
  };

  const setTransactionSuccess = (txHash: string) => {
    const val = "https://" + blockTracker + ".io/tx/" + txHash;
    setTxMessage(val);
    setTxProgress(false);
  };

  const setTransactionFailed = (txHash: string) => {
    const val = "https://" + blockTracker + ".io/tx/" + txHash;
    setTxMessage(val);
    setTxProgress(false);
  };

  return (
    <div>
      <button onClick={connectWallet}>Connect Wallet</button>
      {account ? (
        <div>
          <h3>Wallet Address: {account}</h3>
          {txProgress ? (
            <p>
              Transaction Pending!{" "}
              <a href={txMessage} target="_blank" rel="noopener noreferrer">
                Click here to view!
              </a>
            </p>
          ) : (
            <div>
              {claimedBool ? (
                <p>
                  Infinity Keys TokenID {puzzleId} has been claimed by current
                  address.
                </p>
              ) : (
                <button onClick={mintNFT}>Claim NFT</button>
              )}
            </div>
          )}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Mint;
