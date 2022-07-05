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
  updateTxMessage: Function;
  updateChain: Function;
  puzzleId: number;
}) => {
  let account: string;
  let library: ethers.providers.Web3Provider;
  let chain: number;
  let transaction: any;

  const puzzleId = props.puzzleId;
  const wallet = walletUtil();

  const changeLoading = (loading: boolean) => {
    props.updateLoading(loading);
  };

  const changeMinted = (minted: boolean) => {
    props.updateMinted(minted);
  };

  const changeTxMessage = (txMessage: string) => {
    props.updateTxMessage(txMessage);
  };

  const connectWallet = async () => {
    try {
      { library, account, chain } = await wallet.trigger();

      if (account) {
        checkIfClaimed();

        if (library && chain) {
          transaction = transactionUtil({
            chain,
            puzzleId,
            library,
            account,
            changeLoading,
            changeMinted,
            changeTxMessage,
          });
        }
      }

      props.updateChain(chain);
    } catch (error) {
      console.log(error);
      disconnectWallet();
      return 0;
    }
  };

  const disconnectWallet = () => {
    wallet.clear();
  };

  const updateChainID = async () => {
    if (chain) {
      chain = (await library.getNetwork()).chainId;
      props.updateChain(chain);
      return chain;
    }
    return 0;
  };

  const toHex = (num: number) => {
    const val = Number(num);
    return "0x" + val.toString(16);
  };

  const switchToEth = async () => {
    if (chain && library?.provider?.request) {
      try {
        await library.provider.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: toHex(ETH_CHAIN_ID) }],
        });
        updateChainID();
      } catch (switchError: any) {
        console.log(switchError);
      }
    }
  };

  const switchToAvax = async () => {
    if (chain && library?.provider?.request) {
      try {
        await library.provider.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: toHex(AVAX_CHAIN_ID) }],
        });
        updateChainID();
      } catch (switchError: any) {
        //I think this should add AVAX to MetaMask if you dont have it yet
        //have not tested
        if (switchError.code === 4902) {
          try {
            await library.provider.request({
              method: "wallet_addEthereumChain",
              params: [FUJI_PARAMS],
            });
            updateChainID();
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
    changeLoading(true);
    const providerETH = new ethers.providers.JsonRpcProvider(ETH_RPC);
    const contractETH = new ethers.Contract(
      CONTRACT_ADDRESS_ETH,
      ContractABI,
      providerETH
    );
    let resultETH = await contractETH.checkIfClaimed(puzzleId, account);
    if (resultETH === true) {
      changeMinted(true);
      changeLoading(false);
    }

    const providerAVAX = new ethers.providers.JsonRpcProvider(AVAX_RPC);
    const contractAVAX = new ethers.Contract(
      CONTRACT_ADDRESS_AVAX,
      ContractABI,
      providerAVAX
    );
    let resultAVAX = await contractAVAX.checkIfClaimed(puzzleId, account);
    if (resultAVAX === true) {
      changeMinted(true);
      changeLoading(false);
    }

    changeMinted(false);
    changeLoading(false);
  };

  return {
    connectWallet,
    disconnectWallet,
    switchToEth,
    switchToAvax,
    updateChainID,
    mint,
    checkIfClaimed,
  };
};
