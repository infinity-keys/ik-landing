import { writeFile } from 'node:fs'
import path from 'node:path'

import { db } from 'api/src/lib/db'

const getAnonPuzzles = async () => {
  return db.puzzle.findMany({
    where: { isAnon: true },
    include: {
      steps: {
        orderBy: {
          stepSortWeight: 'asc',
        },
        include: {
          stepSimpleText: true,
        },
      },
    },
  })
}

export default async () => {
  console.log('retrieving anonymous puzzles.')

  try {
    const anonData = await getAnonPuzzles()

    const directory = path.join(__dirname, '..', 'api')

    await writeFile(
      `${directory}/anonPuzzleData.json`,
      JSON.stringify(anonData),
      'utf8',
      () =>
        console.log(
          `finished writing data for ${anonData.length} anonymous puzzles`
        )
    )
  } catch (error) {
    console.warn('Error writing anonymous puzzle data.')
    console.error(error)
  }
}
