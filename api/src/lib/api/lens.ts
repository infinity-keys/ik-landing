// render-health-check
import { LensClient, production } from '@lens-protocol/client'

import { logger } from 'src/lib/logger'

const lensClient = new LensClient({
  environment: production,
})

export const checkLensApi = async (
  account: string
  // checkType: OriumCheckType
) => {
  try {
    const profileByHandle = await lensClient.profile.fetch({
      handle: '',
    })
  } catch (e) {
    logger.error(`Failed Orium api check for ${account}`, e)

    if (e instanceof Error) {
      return { errors: [e.message], success: false }
    }
    return { errors: ['Error checking Orium.'], success: false }
  }
}
