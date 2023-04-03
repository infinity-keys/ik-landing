import fetch from 'node-fetch'
import { logger } from 'src/lib/logger'

export const checkComethApi = async (account) => {
  try {
    const url = new URL(account, 'https://api.battle.cometh.io/api/user/')
    const res = await fetch(url)
    const data = await res.json()

    // Cometh returns { error: 'Server error' } if account is not found
    return { success: !data.error }
  } catch {
    logger.error(`Failed Cometh api check for ${account}`)
    return { errors: ['Error checking Cometh.'] }
  }
}
