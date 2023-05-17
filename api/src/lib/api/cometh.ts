import fetch from 'node-fetch'

import { logger } from 'src/lib/logger'

export const checkComethApi = async (account: string) => {
  try {
    const url = new URL(account, 'https://api.battle.cometh.io/api/user/')
    const res = await fetch(url)
    const data = await res.json()

    return {
      success: data.hasEnoughGamesToSkipTutorial || data.hasCompletedTutorial,
    }
  } catch {
    logger.error(`Failed Cometh api check for ${account}`)
    return { errors: ['Error checking Cometh.'] }
  }
}
