import { db } from 'src/lib/db'

export const deleteUserProgress = async () => {
  if (
    !context.currentUser ||
    context.currentUser.id !== process.env.DELETE_PROGRESS_USER_ID
  ) {
    return { success: false }
  }
  try {
    // we'll repeat this "userReward" and di it with "solves" and "attempts"
    await db.userReward.deleteMany({
      where: { userId: process.env.DELETE_PROGRESS_USER_ID },
    })
  } catch (error) {
    console.log(error)
    return { success: false }
  }
  // the profile page renders the user's rewardables
  // in the case of "rick.a.burd@gmail.com", this (2)
  // ideally, we would want to delete the `solve` entities
  // related to the rewardables, and we would also want to
  // delete the user's `attempt` entities.
  return { success: true }
}
