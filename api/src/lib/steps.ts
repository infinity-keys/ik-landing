import { z } from 'zod'

export const SolutionData = z
  .object({
    simpleTextSolution: z.string(),
    nftCheckSolution: z.object({
      account: z.string(),
      chainId: z.optional(z.number()),
      contractAddress: z.optional(z.string()),
      tokenId: z.optional(z.number()),
      poapEventId: z.optional(z.string()),
    }),
    // add more types here
  })
  .partial()
  .refine(
    (data) =>
      // add corresponding type here
      data.simpleTextSolution || data.nftCheckSolution,
    'Invalid solution type'
  )
