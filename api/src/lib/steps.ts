import { z } from 'zod'

export const SolutionData = z
  .object({
    simpleTextSolution: z.string(),
    nftCheckSolution: z.string(),
    // add more types here
  })
  .partial()
  .refine(
    (data) =>
      // add corresponding type here
      data.simpleTextSolution || data.nftCheckSolution,
    'Invalid solution type'
  )
