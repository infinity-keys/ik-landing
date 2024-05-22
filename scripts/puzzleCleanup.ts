import { db } from 'api/src/lib/db'

export default async () => {
  const twoWeeksAgo = new Date(Date.now() - 12096e5)

  const deletedPuzzleIds = await db.rewardable.findMany({
    where: {
      trashedAt: {
        lte: twoWeeksAgo,
      },
    },
    select: {
      id: true,
    },
  })

  if (deletedPuzzleIds.length) {
    await db.rewardable.deleteMany({
      where: {
        trashedAt: {
          lte: twoWeeksAgo,
        },
      },
    })

    console.info('Trashed puzzles: ', deletedPuzzleIds)
  }
}
