import { db } from 'src/lib/db'

export const deleteUserProgress = async () => {
  if (!context.currentUser || !context.currentUser.roles.includes('ADMIN')) {
    return { success: false }
  }
  try {
    const userId = context.currentUser.id as string

    const userRewards = db.userReward.deleteMany({
      where: { userId: userId },
    })
    const solves = db.solve.deleteMany({
      where: { userId: userId },
    })
    const attempts = db.attempt.deleteMany({
      where: { userId: userId },
    })

    await Promise.all([userRewards, solves, attempts])
  } catch (error) {
    console.log(error)
    return { success: false }
  }
  return { success: true }
}
