import type { MutationResolvers } from 'types/graphql'

import { db } from 'src/lib/db'

// Richard Burd's unique service:
// Eventually this becomes "create rewardable"
export const createBurdPuzzle: MutationResolvers['createBurdPuzzle'] = async ({
  input,
}) => {
  if (!input.puzzle) {
    throw new Error('No puzzle')
  }

  if (!input.puzzle.steps) {
    throw new Error('No steps')
  }

  const steps = input.puzzle.steps.map((step) => {
    if (step.type === 'SIMPLE_TEXT' && step.stepSimpleText) {
      return {
        failMessage: step.failMessage,
        successMessage: step.successMessage,
        challenge: step.challenge,
        stepSortWeight: step.stepSortWeight,
        resourceLinks: step.resourceLinks,
        type: 'SIMPLE_TEXT',
        stepSimpleText: {
          create: {
            solution: step.stepSimpleText.solution,
            solutionCharCount: step.stepSimpleText.solution.length,
          },
        },
      }
    }
    if (step.type === 'NFT_CHECK' && step.stepNftCheck) {
      return {
        failMessage: step.failMessage,
        successMessage: step.successMessage,
        challenge: step.challenge,
        stepSortWeight: step.stepSortWeight,
        resourceLinks: step.resourceLinks,
        type: 'NFT_CHECK',
        stepNftCheck: {
          create: {
            requireAllNfts: step.stepNftCheck.requireAllNfts,
            nftCheckData: {
              create: step.stepNftCheck.nftCheckData.map((nftCheckDatum) => {
                return {
                  contractAddress: nftCheckDatum.contractAddress,
                  tokenId: nftCheckDatum.tokenId,
                  chainId: nftCheckDatum.chainId,
                  poapEventId: nftCheckDatum.poapEventId,
                }
              }),
            },
          },
        },
      }
    }
    throw new Error(`Step type ${step.type} not implemented yet`)
  })

  const rewardable = await db.rewardable.create({
    data: {
      name: input.name,
      explanation: input.explanation,
      type: input.type,
      slug: input.slug,
      listPublicly: input.listPublicly,
      orgId: 'cla9yay7y003k08la2z4j2xrv',
      puzzle: {
        create: {
          isAnon: input.puzzle.isAnon,
          steps: {
            create: steps,
          },
        },
      },
    },
  })
  return rewardable
}
