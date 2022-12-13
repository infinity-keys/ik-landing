import { ethers } from 'ethers'
import { QueryResolvers } from 'types/graphql'

import { providerLookup } from 'src/lib/lookups'

const etherscanProvider = new ethers.providers.EtherscanProvider(
  undefined,
  process.env.ETHERSCAN_API_KEY
)

export const checkWalletAge: QueryResolvers['checkWalletAge'] = async ({
  account,
  chainId,
}) => {
  // TODO: Move this to Moralis. Can check true wallet age for all chains there.
  const provider = providerLookup[chainId]
  const walletTxCount = await provider.getTransactionCount(account)
  if (walletTxCount === 0) return { success: true, approved: false } // ETH will blow up if 0

  if (chainId === 1) {
    const oldestTransaction = (await etherscanProvider.getHistory(account))[0]
      .blockNumber
    const currentBlock = await provider.getBlockNumber()
    const age = oldestTransaction ? currentBlock - oldestTransaction : 0

    return { success: true, approved: age > 5760 }
  }

  return { success: true, approved: walletTxCount > 1 }
}
