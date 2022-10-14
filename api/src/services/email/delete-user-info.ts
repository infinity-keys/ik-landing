import { MutationResolvers } from 'types/graphql'

import { IK_CLAIMS_NAMESPACE } from 'src/lib/constants'
import { db } from 'src/lib/db'
import { verifyToken } from 'src/lib/jwt'
import { IkJwt } from 'src/lib/types'

export const deleteSubmissionsByEmail: MutationResolvers['deleteSubmissionsByEmail'] =
  async ({ jwt }) => {
    const verified = await verifyToken(jwt)
    const payload = verified.payload as unknown as IkJwt

    const { sub: userId } = payload
    const { email } = payload.claims[IK_CLAIMS_NAMESPACE]

    await db.submission.deleteMany({
      where: { OR: [{ email }, { userId }] },
    })

    await db.user.delete({
      where: { userId },
    })

    return { success: true }
  }
