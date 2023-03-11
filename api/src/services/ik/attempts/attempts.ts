import type { MutationResolvers, StepType } from 'types/graphql'
import { z } from 'zod'

import { context } from '@redwoodjs/graphql-server'

import { db } from 'src/lib/db'
import { checkNft } from 'src/lib/web3/check-nft'
import { createSolve } from 'src/services/solves/solves'
import { createUserReward } from 'src/services/userRewards/userRewards'

export const stepSolutionTypeLookup: {
  [key in StepType]: string
} = {
  SIMPLE_TEXT: 'simpleTextSolution',
  NFT_CHECK: 'nftCheckSolution',
}

export const SimpleTextSolutionData = z.object({
  type: z.literal('simple-text'),
  simpleTextSolution: z.string(),
})

export const NftCheckSolutionData = z.object({
  type: z.literal('nft-check'),
  nftCheckSolution: z.object({
    account: z.string(),
  }),
})

export const SolutionData = z.discriminatedUnion('type', [
  SimpleTextSolutionData,
  NftCheckSolutionData,
])

// @TODO: this 'asChild' logic will break if puzzle belongs to bundle
export const createRewards = async ({ rewardable, currentUser }) => {
  console.log(JSON.stringify(rewardable, null, 2))
  // create puzzle reward when user solves last step
  await createUserReward({
    input: {
      rewardableId: rewardable.id,
      userId: currentUser.id,
    },
  })

  // does this step's puzzle belong to a pack
  if (rewardable.asChild.length > 0) {
    const parentPack = await db.rewardable.findUnique({
      where: { id: rewardable.asChild[0].parentId },
      select: {
        id: true,
        userRewards: {
          where: { userId: currentUser.id },
        },
        asParent: {
          select: {
            childRewardable: {
              select: {
                userRewards: {
                  where: { userId: currentUser.id },
                  select: {
                    id: true,
                  },
                },
              },
            },
          },
        },
      },
    })

    // has this user now completed all puzzles in this pack
    const allPuzzlesSolved = parentPack.asParent.every(
      ({ childRewardable }) => childRewardable.userRewards.length > 0
    )
    console.log(JSON.stringify(parentPack.asParent, null, 2))
    // create reward for pack
    if (allPuzzlesSolved) {
      await createUserReward({
        input: {
          rewardableId: parentPack.id,
          userId: currentUser.id,
        },
      })
    }
  }
}

const getStep = async (id) => {
  return db.step.findUnique({
    where: { id },
    select: {
      type: true,
      stepNftCheck: {
        select: {
          requireAllNfts: true,
          nftCheckData: true,
        },
      },
      stepSimpleText: true,
      puzzle: {
        select: {
          rewardable: {
            select: {
              userRewards: {
                where: { userId: context.currentUser.id },
                select: {
                  id: true,
                },
              },
              id: true,
              asChild: {
                select: {
                  parentId: true,
                },
              },
            },
          },
          steps: {
            orderBy: {
              stepSortWeight: 'asc',
            },
            select: {
              id: true,
              stepSortWeight: true,
            },
          },
        },
      },
    },
  })
}

export const makeAttempt: MutationResolvers['makeAttempt'] = async ({
  stepId,
  data,
}) => {
  try {
    SolutionData.parse(data)

    const step = await getStep(stepId)

    if (step.puzzle.rewardable.userRewards.length > 0) {
      return { success: false, message: 'You have already solved this puzzle' }
    }

    // all the solving logic relies on this function
    // ensure steps are ordered by sortWeight
    const finalStep = step.puzzle.steps.at(-1).id === stepId
    const solutionType = stepSolutionTypeLookup[step.type]
    const userAttempt = data[solutionType]

    if (step.type === 'SIMPLE_TEXT') {
      const attempt = await db.attempt.create({
        data: {
          userId: context?.currentUser.id,
          stepId,
          data,
        },
      })

      const correctAttempt =
        step.stepSimpleText.solution.toLowerCase() === userAttempt.toLowerCase()

      if (correctAttempt) {
        await createSolve({
          input: {
            attemptId: attempt.id,
            userId: context.currentUser.id,
          },
        })

        if (finalStep) {
          await createRewards({
            rewardable: step.puzzle.rewardable,
            currentUser: context.currentUser,
          })
        }
      }
      return { success: correctAttempt, finalStep }
    } // end of SIMPLE_TEXT

    if (step.type === 'NFT_CHECK') {
      const attempt = await db.attempt.create({
        data: {
          userId: context?.currentUser.id,
          stepId,
          data: {},
        },
      })

      const { nftPass, errors } = await checkNft({
        account: userAttempt.account,
        nftCheckData: step.stepNftCheck.nftCheckData,
        requireAllNfts: step.stepNftCheck.requireAllNfts,
      })

      if (errors && errors.length > 0) {
        return { success: false, message: 'Error checking NFT' }
      }

      if (nftPass) {
        await createSolve({
          input: {
            attemptId: attempt.id,
            userId: context.currentUser.id,
          },
        })

        if (finalStep) {
          await createRewards({
            rewardable: step.puzzle.rewardable,
            currentUser: context.currentUser,
          })
        }
      }

      return { success: nftPass, finalStep }
    } // end of NFT_CHECK

    return { success: false }
  } catch (e) {
    console.log(e)
    return { success: false }
  }
}
