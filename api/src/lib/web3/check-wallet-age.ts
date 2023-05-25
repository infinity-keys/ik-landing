import { ethers } from 'ethers'

import { providerLookup } from 'src/lib/lookups'

const etherscanProvider = new ethers.providers.EtherscanProvider(
  undefined,
  process.env.ETHERSCAN_API_KEY
)

export const checkWalletAge = async ({
  account,
  chainId,
}: {
  account: string
  chainId: number
}) => {
  // TODO: Move this to Moralis. Can check true wallet age for all chains there.
  const provider = providerLookup[chainId]

  if (!provider) {
    throw new Error(`Provider not found for chainId: ${chainId}`)
  }

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
