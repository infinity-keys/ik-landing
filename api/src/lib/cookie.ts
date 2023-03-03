import { z } from 'zod'

export const PuzzlesData = z.object({
  version: z.string().min(1),
  authId: z.string().min(1),
  puzzles: z.record(
    z.string().min(1),
    z.object({ steps: z.array(z.string().min(1)).min(1) })
  ),
})

export type PuzzlesDataType = z.TypeOf<typeof PuzzlesData>

export const buildCookieData = ({
  completed,
  puzzleId,
  authId,
  stepId,
}: {
  completed: PuzzlesDataType
  puzzleId: string
  authId: string
  stepId: string
}): PuzzlesDataType => {
  const steps = new Set(
    completed && completed.puzzles[puzzleId]
      ? completed.puzzles[puzzleId].steps
      : []
  ).add(stepId)

  return {
    version: 'v1',
    authId,
    puzzles: {
      ...(completed?.puzzles || {}),
      [puzzleId]: {
        ...(completed?.puzzles[puzzleId] || {}),
        steps: [...steps],
      },
    },
  }
}
