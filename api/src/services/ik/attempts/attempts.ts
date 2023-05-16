import type { MutationResolvers } from 'types/graphql'

import { AuthenticationError, context } from '@redwoodjs/graphql-server'

import { checkComethApi } from 'src/lib/api/cometh'
import { db } from 'src/lib/db'
import {
  SolutionData,
  createRewards,
  getStep,
  stepSolutionTypeLookup,
} from 'src/lib/makeAttempt'
import { checkFunctionCall } from 'src/lib/web3/check-function-call'
import { checkNft } from 'src/lib/web3/check-nft'
import { getErc721TokenIds } from 'src/lib/web3/check-tokenid-range'
import { createSolve } from 'src/services/solves/solves'

export const makeAttempt: MutationResolvers['makeAttempt'] = async ({
  stepId,
  data,
}) => {
  try {
    // @TODO: why doesn't this fix possibly undefined error
    if (!context?.currentUser) {
      throw new AuthenticationError('No current user')
    }

    SolutionData.parse(data)

    const step = await getStep(stepId)

    // @TODO: why doesn't this fix everything else
    if (!step || !step.puzzle || !step.puzzle.steps.length) {
      return { success: false, message: 'Error fetching step data' }
    }

    if (step.puzzle.rewardable.userRewards.length > 0) {
      return { success: false, message: 'You have already solved this puzzle' }
    }

    // all the solving logic relies on this function
    // ensure steps are ordered by sortWeight
    const finalStep = step.puzzle.steps.at(-1).id === stepId
    const solutionType = stepSolutionTypeLookup[step.type]
    const userAttempt = data[solutionType]

    const createAttempt = async (attemptData = {}) =>
      db.attempt.create({
        data: {
          userId: context.currentUser.id,
          stepId,
          data: attemptData,
        },
      })

    const createNewSolve = async (attemptId: string) => {
      await createSolve({
        input: {
          attemptId,
          userId: context.currentUser.id,
        },
      })

      if (finalStep) {
        await createRewards(step.puzzle.rewardable)
      }
    }

    if (step.type === 'SIMPLE_TEXT') {
      const attempt = await createAttempt(data)

      const correctAttempt =
        step.stepSimpleText.solution.toLowerCase() === userAttempt.toLowerCase()

      if (correctAttempt) {
        await createNewSolve(attempt.id)
      }

      return { success: correctAttempt, finalStep }
    } // end of SIMPLE_TEXT

    if (step.type === 'NFT_CHECK') {
      const attempt = await createAttempt()

      const { nftPass, errors } = await checkNft({
        account: userAttempt,
        nftCheckData: step.stepNftCheck.nftCheckData,
        requireAllNfts: step.stepNftCheck.requireAllNfts,
      })

      if (errors && errors.length > 0) {
        return { success: false, message: 'Error checking NFT' }
      }

      if (nftPass) {
        await createNewSolve(attempt.id)
      }

      return { success: nftPass, finalStep }
    } // end of NFT_CHECK

    if (step.type === 'FUNCTION_CALL') {
      const attempt = await createAttempt()

      const { hasUserCalledFunction, errors } = await checkFunctionCall({
        account: userAttempt,
        contractAddress: step.stepFunctionCall.contractAddress,
        methodIds: step.stepFunctionCall.methodIds,
      })

      if (errors && errors.length > 0) {
        return { success: false, message: 'Error checking for function call' }
      }

      if (hasUserCalledFunction) {
        await createNewSolve(attempt.id)
      }

      return { success: hasUserCalledFunction, finalStep }
    } // end of FUNCTION_CALL

    if (step.type === 'COMETH_API') {
      const attempt = await createAttempt()

      const { success, errors } = await checkComethApi(userAttempt)

      if (errors && errors.length > 0) {
        return { success: false, message: errors[0] }
      }

      if (success) {
        await createNewSolve(attempt.id)
      }

      return { success, finalStep }
    } // end of COMETH_API

    if (step.type === 'TOKEN_ID_RANGE') {
      const attempt = await createAttempt()

      const { hasMatches, errors } = await getErc721TokenIds({
        contractAddress: step.stepTokenIdRange.contractAddress,
        address: userAttempt,
        chainId: step.stepTokenIdRange.chainId,
        startId: step.stepTokenIdRange.startId,
        endId: step.stepTokenIdRange.endId,
      })

      if (errors && errors.length > 0) {
        return { success: false, message: errors[0] }
      }

      if (hasMatches) {
        await createNewSolve(attempt.id)
      }
      return { success: hasMatches, finalStep }
    } // end of TOKEN_ID_RANGE

    return { success: false }
  } catch (e) {
    console.log(e)
    return { success: false }
  }
}
