import { context } from '@redwoodjs/graphql-server'

import { db } from 'src/lib/db'

export const getPuzzleWithSolves = async (id: string) => {
  return db.puzzle.findUnique({
    where: { id },
    include: {
      steps: {
        orderBy: {
          stepSortWeight: 'asc',
        },
        include: {
          attempts: {
            where: {
              userId: context.currentUser.id,
              solve: {
                isNot: null,
              },
            },
          },
        },
      },
    },
  })
}

export const getPuzzle = async (id: string) => {
  return db.puzzle.findUnique({
    where: { id },
    include: {
      steps: {
        orderBy: {
          stepSortWeight: 'asc',
        },
      },
    },
  })
}
