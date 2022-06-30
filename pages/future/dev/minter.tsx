import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { walletUtil } from "@lib/wallet";
import {
  AVAX_CHAIN_ID,
  ETH_CHAIN_ID,
  FUJI_PARAMS,
  ETH_RPC,
  AVAX_RPC,
  CONTRACT_ADDRESS_ETH,
  CONTRACT_ADDRESS_AVAX,
} from "@lib/constants";
import { transactionUtil } from "./transactions";
import ContractABI from "./ContractABI.json";

export const minterUtil = (props: {
  updateLoading: Function;
  updateMinted: Function;
  puzzleId: number;
}) => {
  const [account, setAccount] = useState<string>();
  const [library, setLibrary] = useState<ethers.providers.Web3Provider>();
  const [chain, setChain] = useState<number>();
  const [transaction, setTransaction] = useState<any>();

  const puzzleId = props.puzzleId;
  const wallet = walletUtil();

  const changeLoading = (loading: boolean) => {
    props.updateLoading(loading);
  };

  const changeMinted = (minted: boolean) => {
    props.updateMinted(minted);
  };

  useEffect(() => {
    console.log("test");
    if (account) {
      const claimed = checkIfClaimed();
      props.updateMinted(claimed);
    }
  }, [account, chain]);

  useEffect(() => {
    if (account && library && chain) {
      setTransaction(
        transactionUtil({
          chain,
          puzzleId,
          library,
          account,
          changeLoading,
          changeMinted,
        })
      );
    }
  }, [account, library, chain]);

  const connectWallet = async () => {
    try {
      const { library, account, chain } = await wallet.trigger();
      setAccount(account);
      setLibrary(library);
      setChain(chain);

      //issues on other end getting undefined while waiting for chain state to change
      return chain;
    } catch (error) {
      console.log(error);
      disconnectWallet();
      return 0;
    }
  };

  const disconnectWallet = () => {
    wallet.clear();
  };

  const getChainID = () => {
    if (chain) {
      return chain;
    }
    return 0;
  };

  const toHex = (num: number) => {
    const val = Number(num);
    return "0x" + val.toString(16);
  };

  const switchToEth = async () => {
    if (chain && library?.provider) {
      try {
        await library.provider.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: toHex(ETH_CHAIN_ID) }],
        });
        setChain((await library.getNetwork()).chainId);
      } catch (switchError: any) {
        console.log(switchError);
      }
    }
  };

  const switchToAvax = async () => {
    if (chain && library?.provider) {
      try {
        await library.provider.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: toHex(AVAX_CHAIN_ID) }],
        });
        setChain((await library.getNetwork()).chainId);
      } catch (switchError: any) {
        if (switchError.code === 4902) {
          try {
            await library.provider.request({
              method: "wallet_addEthereumChain",
              params: [FUJI_PARAMS],
            });
            setChain((await library.getNetwork()).chainId);
          } catch (error) {
            console.log(error);
          }
        }
      }
    }
  };

  const mint = async () => {
    if (library && transaction) {
      await transaction.createTx();
    }
  };

  const verify = () => {};

  const checkIfClaimed = async () => {
    const providerETH = new ethers.providers.JsonRpcProvider(ETH_RPC);
    const contractETH = new ethers.Contract(
      CONTRACT_ADDRESS_ETH,
      ContractABI,
      providerETH
    );
    let resultETH = await contractETH.checkIfClaimed(puzzleId, account);
    if (resultETH === true) return true;

    const providerAVAX = new ethers.providers.JsonRpcProvider(AVAX_RPC);
    const contractAVAX = new ethers.Contract(
      CONTRACT_ADDRESS_AVAX,
      ContractABI,
      providerAVAX
    );
    let resultAVAX = await contractAVAX.checkIfClaimed(puzzleId, account);
    if (resultAVAX === true) return true;

    return false;
  };

  return {
    connectWallet,
    disconnectWallet,
    switchToEth,
    switchToAvax,
    getChainID,
    mint,
    checkIfClaimed,
  };
};
