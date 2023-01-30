import { PUZZLE_COOKIE_NAME } from '@infinity-keys/constants'
import cookie from 'cookie'
import type { MutationResolvers, QueryResolvers } from 'types/graphql'
import { z } from 'zod'

import { context, ForbiddenError } from '@redwoodjs/graphql-server'

import { isAuthenticated } from 'src/lib/auth'
import { db } from 'src/lib/db'
import { decryptCookie } from 'src/lib/encoding/encoding'
import { createSolve } from 'src/services/solves/solves'
import { step } from 'src/services/steps/steps'

import { checkNft } from '../minter/check-nft'

const SolutionData = z
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

export const makeAttempt: MutationResolvers['makeAttempt'] = async ({
  stepId,
  stepType,
  data,
}) => {
  try {
    SolutionData.parse(data)
    const type = stepType === 'NFT_CHECK' ? 'stepNftCheck' : 'stepSimpleText'
    const solutionType =
      stepType === 'NFT_CHECK' ? 'nftCheckSolution' : 'simpleTextSolution'

    if (stepType === 'NFT_CHECK') {
      const { success, nftPass } = await checkNft({
        account: '0x748De431c0a978f4f5B61dbED749Adca710A282B',
        contractAddress: '0x7e8E97A66A935061B2f5a8576226175c4fdE0ff9',
        chainId: parseInt('137'),
        tokenId: parseInt('1'),
      })

      const attempt = await db.attempt.create({
        data: {
          userId: context?.currentUser.id,
          stepId,
          data: { nftCheckSolution: stepId },
        },
      })

      if (success && nftPass) {
        await createSolve({
          input: {
            attemptId: attempt.id,
            userId: context.currentUser.id,
          },
        })
      }

      return { success: success && nftPass }
    }

    const attempt = await db.attempt.create({
      data: {
        userId: context?.currentUser.id,
        stepId,
        data,
      },
    })

    const step = await db.step.findUnique({
      where: { id: stepId },
      select: { [type]: true },
    })

    const userAttempt = data[solutionType]

    if (step[type].solution === userAttempt) {
      await createSolve({
        input: {
          attemptId: attempt.id,
          userId: context.currentUser.id,
        },
      })
      return { success: true }
    }
  } catch (e) {
    console.log(e)
    return { success: false }
  }

  return { success: false }
}

export const optionalStep: QueryResolvers['optionalStep'] = async (
  { id, puzzleId, stepNum },
  { context }
) => {
  // users don't need specific step data on the puzzle landing page
  if (!id) return

  // unauthenticated users can't see specific step data
  if (!isAuthenticated()) {
    throw new ForbiddenError('must sign in')
  }

  // authenticated users should be allowed to view first steps
  if (stepNum === 1) return step({ id })

  const puzzlesCompletedCypherText = cookie.parse(context.event.headers.cookie)[
    PUZZLE_COOKIE_NAME
  ]

  const puzzlesCompleted = decryptCookie(puzzlesCompletedCypherText)

  // get the number of completed steps for user on this puzzle. they should
  // be allowed to view previous steps and the current step they are on
  const visibleSteps = puzzlesCompleted?.puzzles[puzzleId]?.steps.length + 1

  // ensure they've solved the correct number of previous steps for the step
  // they are trying to view
  if (stepNum > visibleSteps || !visibleSteps) {
    throw new ForbiddenError('Step currently not viewable.')
  }

  return step({ id })
}
