import { MutationResolvers } from 'types/graphql'

import { IK_CLAIMS_NAMESPACE } from 'src/lib/constants'
import { db } from 'src/lib/db'
import { verifyToken } from 'src/lib/jwt'
import { IkJwt } from 'src/lib/types'

export const deleteAllUserInfo: MutationResolvers['deleteAllUserInfo'] =
  async ({ jwt }) => {
    const verified = await verifyToken(jwt)
    const payload = verified.payload as unknown as IkJwt

    const { sub: userId } = payload
    const { email } = payload.claims[IK_CLAIMS_NAMESPACE]

    // deletes users and cascades to delete all submissions
    await db.user.delete({
      where: { id: userId },
    })

    // deletes remaining submissions with same email
    await db.submission.deleteMany({
      where: {
        data: {
          path: ['email'],
          equals: email,
        },
      },
    })

    return { success: true }
  }
