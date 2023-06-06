import { BigNumber, ethers } from 'ethers'
import Moralis from 'moralis'

import { logger } from 'src/lib/logger'

if (!Moralis.Core.isStarted) {
  Moralis.start({
    apiKey: process.env.MORALIS_API_KEY,
  })
}

const checkBalance = (balance: string, minBalance: string): boolean => {
  const balanceInWei = BigNumber.from(balance)
  const minBalanceInWei = ethers.utils.parseEther(minBalance)

  return balanceInWei.gte(minBalanceInWei)
}

export const checkErc20Balance = async ({
  account,
  contractAddress,
  chainId,
  minBalance,
}: {
  account: string
  contractAddress: string
  chainId: string
  minBalance: string
}) => {
  try {
    const response = await Moralis.EvmApi.token.getWalletTokenBalances({
      chain: chainId,
      tokenAddresses: [contractAddress],
      address: account,
    })
    const data = response.toJSON()

    if (data.length === 0) return { success: false }

    const [{ balance }] = data
    return { success: checkBalance(balance, minBalance) }
  } catch (e) {
    logger.error(`Failed checkErc20Balance check for ${account}`, e)
    return { errors: ['Error checking erc20Balance.'], success: false }
  }
}
