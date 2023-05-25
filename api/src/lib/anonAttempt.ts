import { SolutionData, getAttempt } from 'src/lib/makeAttempt'

import anonPuzzles from '../../anonPuzzleData.json'

export const isAnonPuzzle = async ({ puzzleId }: { puzzleId: string }) => {
  return anonPuzzles.some(({ id }) => id === puzzleId)
}

export const checkAnonSolution = async ({
  puzzleId,
  stepId,
  attempt,
}: {
  puzzleId: string
  stepId: string
  attempt: string
}) => {
  const solutionData = SolutionData.parse(attempt)
  const puzzle = anonPuzzles.find(({ id }) => id === puzzleId)

  if (!puzzle?.steps) {
    throw new Error('Missing anonymous puzzle')
  }

  const step = puzzle.steps.find(({ id }) => id === stepId)

  if (!step) {
    throw new Error('Cannot find step for anonymous puzzle')
  }

  const userAttempt = getAttempt(solutionData)

  const success =
    step.stepSimpleText.solution.toLowerCase() === userAttempt.toLowerCase()

  const finalStep = puzzle.steps.at(-1)?.id === stepId

  return { success, finalStep }
}
