import { CLOUDINARY_CLOUD_NAME } from '@infinity-keys/constants'
import { StepGuideType, StepType } from '@prisma/client'
import buildUrl from 'cloudinary-build-url'
import { nanoid } from 'nanoid'
import slugify from 'slugify'
import { CreateStepInput } from 'types/graphql'

// Formats steps coming from the form into the shape expected by Prisma `create`
export const formatCreateSteps = (steps: CreateStepInput[]) => {
  const formattedSteps = steps.map(
    ({
      solutionHint,
      defaultImage,
      solutionImage,
      stepSortWeight,
      stepPage,
      type,
      stepSimpleText,
      stepNftCheck,
      stepFunctionCall,
      stepTokenIdRange,
      stepOriumApi,
    }) => {
      const stepCommon = {
        solutionHint,
        defaultImage,
        solutionImage,
        stepSortWeight,
        // NOTE: This is temporary until we start supporting more than `SEEK`
        // stepGuideType: stepGuideType,
        stepGuideType: StepGuideType.SEEK,
        stepPage: {
          create: stepPage,
        },
      }

      switch (type) {
        case StepType.SIMPLE_TEXT: {
          if (!stepSimpleText) throw new Error('Simple text step missing')
          return {
            ...stepCommon,
            type: StepType.SIMPLE_TEXT,
            stepSimpleText: {
              create: {
                solution: stepSimpleText.solution,
                solutionCharCount: stepSimpleText.solution.length,
              },
            },
          }
        }
        case StepType.NFT_CHECK: {
          throw new Error(`Step type ${type} not implemented yet`)
          if (!stepNftCheck) throw new Error('NFT check step missing')
          // return {
          //   ...stepCommon,
          //   type: 'NFT_CHECK',
          //   stepNftCheck: {
          //     create: {
          //       requireAllNfts: stepNftCheck.requireAllNfts,
          //       nftCheckData: {
          //         create: stepNftCheck.nftCheckData.map((nftCheckDatum) => {
          //           return {
          //             contractAddress: nftCheckDatum.contractAddress,
          //             tokenId: nftCheckDatum.tokenId,
          //             chainId: nftCheckDatum.chainId,
          //             poapEventId: nftCheckDatum.poapEventId,
          //           }
          //         }),
          //       },
          //     },
          //   },
          // }
        }
        case StepType.FUNCTION_CALL: {
          throw new Error(`Step type ${type} not implemented yet`)
          if (!stepFunctionCall) throw new Error('Function call step missing')
          // return {
          //   ...stepCommon,
          //   type: 'FUNCTION_CALL',
          //   stepFunctionCall: {
          //     create: {
          //       methodIds: stepFunctionCall.methodIds,
          //       contractAddress: stepFunctionCall.contractAddress,
          //     },
          //   },
          // }
        }
        case StepType.COMETH_API: {
          throw new Error(`Step type ${type} not implemented yet`)
          // return {
          //   ...stepCommon,
          //   type: 'COMETH_API',
          //   stepComethApi: {
          //     // No addition info currently needed for the Cometh API check
          //   },
          // }
        }
        case StepType.TOKEN_ID_RANGE: {
          throw new Error(`Step type ${type} not implemented yet`)
          if (!stepTokenIdRange) throw new Error('Token ID range step missing')
          // return {
          //   ...stepCommon,
          //   type: 'TOKEN_ID_RANGE',
          //   stepTokenIdRange: {
          //     create: {
          //       contractAddress: stepTokenIdRange.contractAddress,
          //       chainId: stepTokenIdRange.chainId,
          //       startIds: stepTokenIdRange.startIds,
          //       endIds: stepTokenIdRange.endIds,
          //     },
          //   },
          // }
        }
        case StepType.ORIUM_API: {
          throw new Error(`Step type ${type} not implemented yet`)
          if (!stepOriumApi) throw new Error('Orium API step missing')
          // return {
          //   ...stepCommon,
          //   type: 'ORIUM_API',
          //   stepOriumApi: {
          //     create: {
          //       checkType: stepOriumApi.checkType,
          //     },
          //   },
          // }
        }
        case StepType.ASSET_TRANSFER:
        case StepType.ERC20_BALANCE:
        case StepType.LENS_API: {
          throw new Error(`Step type ${type} not implemented yet`)
        }
        default: {
          const _exhaustiveCheck: never = type
          throw new Error(`Unhandled step type: ${_exhaustiveCheck}`)
        }
      }
    }
  )

  return formattedSteps
}

export const generateNftDescription = ({
  slug,
  name,
}: {
  slug: string
  name: string
}) => {
  return `https://www.infinitykeys.io/puzzle/${slug}\n\nThe ${name} IK Alpha Trophy indicates the holder has concluded the ${name} Hunt from Infinity Keys. Players hold IK Alpha Trophies to celebrate success in the alpha playtest version of Infinity Keys, participate in community activations, access future hunts and puzzles with Infinity Keys and collaborating projects, and to prepare for an upcoming cross-metaverse gaming adventure.\n\nInfinity Keys are creator tools to build treasure hunt-style puzzles. The alpha version features free-to-play puzzles awarding IK Alpha Trophies to anyone who solves the alpha game testing version hunts while they are available. These achievements may be used as future keys or clues to more challenging (and rewarding) hunts.\n\nSolve puzzles, collect all the trophies while you can, and find the hidden key in each NFT art. Good luck, there’s treasure everywhere.`
}

export const generateNftImage = (id: string) => {
  return buildUrl(id, {
    cloud: {
      cloudName: CLOUDINARY_CLOUD_NAME,
    },
    transformations: {
      transformation: 'ik-nft-meta',
    },
  })
}

export const generateSlug = (name: string): string => {
  return slugify(`${name}-${nanoid()}`, {
    strict: true,
    lower: true,
  })
}

export const isAlphanumeric = (str?: string) => {
  if (!str) return false
  const regex = /^[a-zA-Z0-9]+$/
  return regex.test(str)
}
