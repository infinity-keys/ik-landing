import { RPCLookup } from '@infinity-keys/constants'
import { ethers } from 'ethers'
import { QueryResolvers } from 'types/graphql'

export const checkWalletAge: QueryResolvers['checkWalletAge'] = async ({
  account,
  chainId,
}) => {
  // @TODO: is this still needed in Redwood
  if (typeof chainId !== 'string' || typeof account !== 'string')
    return { success: false, approved: false }

  const chainIdInt = parseInt(chainId, 10)

  const rpcURL = RPCLookup[chainIdInt]

  const provider = new ethers.providers.JsonRpcProvider(rpcURL)
  const walletTxCount = await provider.getTransactionCount(account)
  if (walletTxCount === 0) return { success: false, approved: false } // ETH will blow up if 0

  // Trying to work this, but currently only eth has this etherscan provider
  // that can be called to get history, and check the oldest block of account
  if (chainIdInt === 1) {
    const etherscanProvider = new ethers.providers.EtherscanProvider(
      undefined,
      process.env.ETHERSCAN_API_KEY
    )
    const oldestTransaction = (await etherscanProvider.getHistory(account))[0]
      .blockNumber
    const currentBlock = await provider.getBlockNumber()
    const age = oldestTransaction ? currentBlock - oldestTransaction : 0

    return { success: true, approved: age > 5760 }
  }
  // @TODO: >= 1?
  return { success: true, approved: walletTxCount > 1 }
}
