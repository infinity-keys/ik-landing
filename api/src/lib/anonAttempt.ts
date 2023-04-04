import { SolutionData, stepSolutionTypeLookup } from 'src/lib/makeAttempt'

import anonPuzzles from '../../anonPuzzleData.json'

export const isAnonPuzzle = async ({ puzzleId }) => {
  return anonPuzzles.some(({ id }) => id === puzzleId)
}

export const checkAnonSolution = async ({ puzzleId, stepId, attempt }) => {
  SolutionData.parse(attempt)
  const puzzle = anonPuzzles.find(({ id }) => id === puzzleId)
  const step = puzzle.steps.find(({ id }) => id === stepId)

  const solutionType = stepSolutionTypeLookup[step.type]
  const userAttempt = attempt[solutionType]

  const success =
    step.stepSimpleText.solution.toLowerCase() === userAttempt.toLowerCase()

  const finalStep = puzzle.steps.at(-1).id === stepId

  return { success, finalStep }
}
