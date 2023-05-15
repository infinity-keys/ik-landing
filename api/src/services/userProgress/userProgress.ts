import { db } from 'src/lib/db'

export const deleteUserProgress = async () => {
  if (
    !context.currentUser ||
    context.currentUser.id !== process.env.DELETE_PROGRESS_USER_ID
  ) {
    return { success: false }
  }
  try {
    await db.userReward.deleteMany({
      where: { userId: process.env.DELETE_PROGRESS_USER_ID },
    })
    await db.solve.deleteMany({
      where: { userId: process.env.DELETE_PROGRESS_USER_ID },
    })
    await db.attempt.deleteMany({
      where: { userId: process.env.DELETE_PROGRESS_USER_ID },
    })
  } catch (error) {
    console.log(error)
    return { success: false }
  }
  return { success: true }
}
