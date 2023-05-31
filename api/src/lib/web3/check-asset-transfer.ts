import {
  Network,
  Alchemy,
  SortingOrder,
  AssetTransfersCategory,
} from 'alchemy-sdk'

import { logger } from 'src/lib/logger'
const settings = {
  apiKey: process.env.ALCHEMY_API, // Replace with your Alchemy API Key.
  network: Network.OPT_MAINNET, // Replace with your network.
}

const alchemy = new Alchemy(settings)

export const checkAssetTransfer = async ({
  account,
  toAddress,
  excludeZeroValue,
}: {
  account: string
  toAddress: string
  excludeZeroValue: boolean
}) => {
  try {
    const res = await alchemy.core.getAssetTransfers({
      fromAddress: account,
      toAddress,
      excludeZeroValue,
      maxCount: 1,
      order: SortingOrder.DESCENDING,
      category: [AssetTransfersCategory.EXTERNAL],
    })

    return { success: res.transfers.length > 0 }
  } catch {
    logger.error(`Failed Test check for ${account}`)
    return { errors: ['Error checking Test.'] }
  }
}
