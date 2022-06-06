import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import type { NextPage } from "next";

import ContractABI from "./ContractABI.json";

const ContractAddress = "0xB9f6ec920279B9d19058bbdc4C1674F18Df59a83";
const blockTracker = "testnet.snowtrace";

interface PageProps {
  account: string;
  library: ethers.providers.Web3Provider;
  puzzleId: number;
}

const Mint: NextPage<PageProps> = ({ account, library, puzzleId }) => {
  const [registry, setRegistry] = useState<ethers.Contract>();
  const [txMessage, setTxMessage] = useState();
  const [txProgress, setTxProgress] = useState(false);
  const [mintedBool, setMintedBool] = useState(false);

  useEffect(() => {
    if (registry && account) {
      checkIfMinted();
    }
  }, [registry, account, txProgress]);

  const mintNFT = async () => {
    const signature = await verify();

    const data = registry.interface.encodeFunctionData("claim", [
      puzzleId,
      signature,
    ]);

    createTx(data);
  };

  async function verify() {
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
  }

  const checkIfMinted = async () => {
    setMintedBool(await registry.checkIfMinted(puzzleId, account));
  };

  const createTx = async (data: string) => {
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

  const setTransactionError = (error) => {
    setTxMessage(error);
    setTxProgress(false);
  };

  const setTransactionStart = (txHash) => {
    const val = "https://" + blockTracker + ".io/tx/" + txHash;
    setTxMessage(val);
    setTxProgress(true);
  };

  const setTransactionSuccess = (txHash) => {
    const val = "https://" + blockTracker + ".io/tx/" + txHash;
    setTxMessage(val);
    setTxProgress(false);
  };

  const setTransactionFailed = (txHash) => {
    const val = "https://" + blockTracker + ".io/tx/" + txHash;
    setTxMessage(val);
    setTxProgress(false);
  };

  return (
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
          {mintedBool ? (
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
  );
};

export default Mint;
