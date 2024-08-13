/**
 * This is run on cron (see render.yaml) to clean up puzzles marked for deletion.
 * When puzzles are "deleted", they are simply flagged as trashed until this cron
 * script runs.
 */

import { db } from 'api/src/lib/db'
import { sub } from 'date-fns/sub'

export default async () => {
  const twoWeeksAgo = sub(new Date(), { weeks: 2 })

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
