import { ForbiddenError } from '@redwoodjs/graphql-server'

import { hasRole } from 'src/lib/auth'
import { db } from 'src/lib/db'

export const deleteUserProgress = async () => {
  if (!context.currentUser || !hasRole('ADMIN')) {
    throw new ForbiddenError('Not permitted to call this function.')
  }
  try {
    const userId = context.currentUser.id

    const userRewards = db.userReward.deleteMany({
      where: { userId },
    })
    const solves = db.solve.deleteMany({
      where: { userId },
    })
    const attempts = db.attempt.deleteMany({
      where: { userId },
    })

    await Promise.all([userRewards, solves, attempts])
  } catch (error) {
    console.log(error)
    return { success: false }
  }
  return { success: true }
}
