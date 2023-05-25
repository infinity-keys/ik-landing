import type { MutationResolvers } from 'types/graphql'

import { checkComethApi } from 'src/lib/api/cometh'
import { checkOriumApi } from 'src/lib/api/orium'
import {
  SolutionData,
  createAttempt,
  createResponse,
  getAttempt,
  getStep,
} from 'src/lib/makeAttempt'
import { checkFunctionCall } from 'src/lib/web3/check-function-call'
import { checkNft } from 'src/lib/web3/check-nft'
import { getErc721TokenIds } from 'src/lib/web3/check-tokenid-range'

export const makeAttempt: MutationResolvers['makeAttempt'] = async ({
  stepId,
  data,
}): Promise<{ success: boolean; message?: string }> => {
  try {
    const solutionData = SolutionData.parse(data)

    const step = await getStep(stepId)

    if (!step?.puzzle?.steps?.length) {
      return { success: false, message: 'Error fetching step data' }
    }

    if (step.puzzle.rewardable.userRewards.length > 0) {
      return { success: false, message: 'You have already solved this puzzle' }
    }

    // all the solving logic relies on this function
    // ensure steps are ordered by sortWeight
    const finalStep = step.puzzle.steps.at(-1)?.id === stepId
    const userAttempt = getAttempt(solutionData)

    if (step.type === 'SIMPLE_TEXT') {
      if (!step.stepSimpleText) {
        throw new Error(
          'Cannot create attempt - missing data for "stepSimpleText"'
        )
      }

      const { id: attemptId } = await createAttempt(stepId, data)
      const success =
        step.stepSimpleText.solution.toLowerCase() === userAttempt.toLowerCase()
      const response = await createResponse({
        success,
        attemptId,
        finalStep,
        rewardable: step.puzzle.rewardable,
      })

      return response
    } // end of SIMPLE_TEXT

    if (step.type === 'NFT_CHECK') {
      if (!step.stepNftCheck) {
        throw new Error(
          'Cannot create attempt - missing data for "stepNftCheck"'
        )
      }

      const { id: attemptId } = await createAttempt(stepId)
      const { nftPass: success, errors } = await checkNft({
        account: userAttempt,
        nftCheckData: step.stepNftCheck.nftCheckData,
        requireAllNfts: step.stepNftCheck.requireAllNfts,
      })
      const response = await createResponse({
        success,
        attemptId,
        finalStep,
        errors,
        rewardable: step.puzzle.rewardable,
      })

      return response
    } // end of NFT_CHECK

    if (step.type === 'FUNCTION_CALL') {
      if (!step.stepFunctionCall?.contractAddress) {
        throw new Error(
          'Cannot create attempt - missing data for "stepFunctionCall"'
        )
      }

      const { id: attemptId } = await createAttempt(stepId)

      const { hasUserCalledFunction: success, errors } =
        await checkFunctionCall({
          account: userAttempt,
          contractAddress: step.stepFunctionCall.contractAddress,
          methodIds: step.stepFunctionCall.methodIds,
        })

      const response = await createResponse({
        success,
        attemptId,
        finalStep,
        errors,
        rewardable: step.puzzle.rewardable,
      })

      return response
    } // end of FUNCTION_CALL

    if (step.type === 'COMETH_API') {
      const { id: attemptId } = await createAttempt(stepId)
      const { success, errors } = await checkComethApi(userAttempt)
      const response = await createResponse({
        success,
        attemptId,
        finalStep,
        errors,
        rewardable: step.puzzle.rewardable,
      })

      return response
    } // end of COMETH_API

    if (step.type === 'ORIUM_API') {
      if (!step.stepOriumApi) {
        throw new Error(
          'Cannot create attempt - missing data for "stepOriumApi"'
        )
      }

      const { id: attemptId } = await createAttempt(stepId)
      const { success, errors } = await checkOriumApi(
        userAttempt,
        step.stepOriumApi.checkType
      )
      const response = await createResponse({
        success,
        attemptId,
        finalStep,
        errors,
        rewardable: step.puzzle.rewardable,
      })

      return response
    } // end of ORIUM_API

    if (step.type === 'TOKEN_ID_RANGE') {
      if (!step.stepTokenIdRange) {
        throw new Error(
          'Cannot create attempt - missing data for "stepTokenIdRange"'
        )
      }

      const { id: attemptId } = await createAttempt(stepId)
      const { hasMatches: success, errors } = await getErc721TokenIds({
        contractAddress: step.stepTokenIdRange.contractAddress,
        address: userAttempt,
        chainId: step.stepTokenIdRange.chainId,
        startId: step.stepTokenIdRange.startId,
        endId: step.stepTokenIdRange.endId,
      })
      const response = await createResponse({
        success,
        attemptId,
        finalStep,
        errors,
        rewardable: step.puzzle.rewardable,
      })

      return response
    } // end of TOKEN_ID_RANGE

    return { success: false }
  } catch (e) {
    console.log(e)
    return { success: false }
  }
}
