import {
  SolutionData,
  stepSolutionTypeLookup,
} from 'src/services/ik/attempts/attempts'

import { db } from './db'

// TODO: run this only on build or memoize it
const getAnonPuzzles = async () => {
  return await db.puzzle.findMany({
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

export const isAnonPuzzle = async ({ puzzleId }) => {
  const anonPuzzles = await getAnonPuzzles()
  return anonPuzzles.some(({ id }) => id === puzzleId)
}

export const checkAnonSolution = async ({ puzzleId, stepId, attempt }) => {
  SolutionData.parse(attempt)

  const anonPuzzles = await getAnonPuzzles()

  const puzzle = anonPuzzles.find(({ id }) => id === puzzleId)
  const step = puzzle.steps.find(({ id }) => id === stepId)

  const solutionType = stepSolutionTypeLookup[step.type]
  const userAttempt = attempt[solutionType]

  const success =
    step.stepSimpleText.solution.toLowerCase() === userAttempt.toLowerCase()

  const finalStep = puzzle.steps.at(-1).id === stepId

  return { success, finalStep }
}
