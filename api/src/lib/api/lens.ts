// render-health-check
import { LensClient, production } from '@lens-protocol/client'
import { LensCheckType } from 'types/graphql'

import { logger } from 'src/lib/logger'

const lensClient = new LensClient({
  environment: production,
})

export const checkLensApi = async (
  checkType: LensCheckType
): Promise<{
  success: boolean
  errors?: string[]
}> => {
  console.log(checkType)
  const handle = context.currentUser?.lensProfile

  try {
    const profileByHandle = await lensClient.profile.fetch({ handle })

    console.log(profileByHandle)

    return { success: false }
  } catch (e) {
    logger.error(`Failed Lens api check for ${handle}`, e)

    if (e instanceof Error) {
      return { errors: [e.message], success: false }
    }
    return { errors: ['Error checking Lens.'], success: false }
  }
}
