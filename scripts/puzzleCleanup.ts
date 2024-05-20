import { db } from 'api/src/lib/db'

export default async () => {
  const test = await db.rewardable.findFirst()
  console.log('test: ', test?.id)

  // const deletedPuzzleIds = await db.rewardable.findMany({
  //   where: {
  //     trashedAt: {
  //       lte: new Date(Date.now() - 12096e5),
  //     },
  //   },
  //   select: {
  //     id: true,
  //   },
  // })

  // if (deletedPuzzleIds.length) {
  //   await db.rewardable.deleteMany({
  //     where: {
  //       trashedAt: {
  //         lte: new Date(Date.now() - 12096e5),
  //       },
  //     },
  //   })

  //   console.info('Trashed puzzles: ', deletedPuzzleIds)
  // }
}
