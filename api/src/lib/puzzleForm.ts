import { CLOUDINARY_CLOUD_NAME } from '@infinity-keys/constants'
import { StepGuideType, StepType } from '@prisma/client'
import { v2 as cloudinary } from 'cloudinary'
import buildUrl from 'cloudinary-build-url'
import { nanoid } from 'nanoid'
import slugify from 'slugify'
import { CreateStepInput } from 'types/graphql'

import { db } from 'src/lib/db'

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

      if (type === StepType.SIMPLE_TEXT && stepSimpleText) {
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

      // NOTE: Enable each option when we start supporting it
      {
        // if (step.type === 'NFT_CHECK' && step.stepNftCheck) {
        //   return {
        //     ...stepCommon,
        //     type: 'NFT_CHECK',
        //     stepNftCheck: {
        //       create: {
        //         requireAllNfts: step.stepNftCheck.requireAllNfts,
        //         nftCheckData: {
        //           create: step.stepNftCheck.nftCheckData.map((nftCheckDatum) => {
        //             return {
        //               contractAddress: nftCheckDatum.contractAddress,
        //               tokenId: nftCheckDatum.tokenId,
        //               chainId: nftCheckDatum.chainId,
        //               poapEventId: nftCheckDatum.poapEventId,
        //             }
        //           }),
        //         },
        //       },
        //     },
        //   }
        // }
        // if (step.type === 'FUNCTION_CALL' && step.stepFunctionCall) {
        //   return {
        //     ...stepCommon,
        //     type: 'FUNCTION_CALL',
        //     stepFunctionCall: {
        //       create: {
        //         methodIds: step.stepFunctionCall.methodIds,
        //         contractAddress: step.stepFunctionCall.contractAddress,
        //       },
        //     },
        //   }
        // }
        // if (step.type === 'COMETH_API' && step.stepComethApi) {
        //   return {
        //     ...stepCommon,
        //     type: 'COMETH_API',
        //     stepComethApi: {
        //       // No addition info currently needed for the Cometh API check
        //     },
        //   }
        // }
        // if (step.type === 'TOKEN_ID_RANGE' && step.stepTokenIdRange) {
        //   return {
        //     ...stepCommon,
        //     type: 'TOKEN_ID_RANGE',
        //     stepTokenIdRange: {
        //       create: {
        //         contractAddress: step.stepTokenIdRange.contractAddress,
        //         chainId: step.stepTokenIdRange.chainId,
        //         startIds: step.stepTokenIdRange.startIds,
        //         endIds: step.stepTokenIdRange.endIds,
        //       },
        //     },
        //   }
        // }
        // if (step.type === 'ORIUM_API' && step.stepOriumApi) {
        //   return {
        //     ...stepCommon,
        //     type: 'ORIUM_API',
        //     stepOriumApi: {
        //       create: {
        //         checkType: step.stepOriumApi.checkType,
        //       },
        //     },
        //   }
        // }
      }
      throw new Error(`Step type ${type} not implemented yet`)
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

/**
 * Returns new NFT update object only if the NFT has been editing from the form.
 * Skips uploading to Cloudinary unless image has changed.
 * The NFT's metadata field is a JSON object, so it needs to be entirely
 * re-written every time a field changes.
 */
export const getOptionalNftUpdateValues = async ({
  newName,
  newImage,
  rewardableId,
  slug,
}: {
  newName?: string
  newImage?: string
  rewardableId: string
  slug: string
}) => {
  if (!newImage && !newName) {
    return
  }

  cloudinary.config({ secure: true })

  const cloudinaryRes =
    newImage &&
    (await cloudinary.uploader.upload(newImage, {
      use_filename: false,
      unique_filename: true,
      folder: 'ik-alpha-creators',
    }))

  if (newImage && (!cloudinaryRes || !cloudinaryRes?.public_id)) {
    throw new Error('There was a problem uploading NFT image to Cloudinary')
  }

  const prevNftData = await db.nft.findFirst({
    where: {
      rewardables: {
        some: {
          id: rewardableId,
        },
      },
    },
  })

  // Get previous values from the Prisma JSON object as fallback for unedited fields
  const prevMetadata = prevNftData?.data
  const prevName =
    prevMetadata &&
    typeof prevMetadata === 'object' &&
    'name' in prevMetadata &&
    typeof prevMetadata.name === 'string' &&
    prevMetadata.name

  const prevImage =
    prevMetadata &&
    typeof prevMetadata === 'object' &&
    'image' in prevMetadata &&
    prevMetadata.image

  if (!prevImage || !prevName) {
    throw new Error("There was a problem obtaining the NFT's previous metadata")
  }

  return {
    cloudinaryId:
      cloudinaryRes && cloudinaryRes.public_id
        ? cloudinaryRes.public_id
        : prevNftData?.cloudinaryId,
    data: {
      name: newName || prevName,
      image:
        cloudinaryRes && cloudinaryRes?.public_id
          ? generateNftImage(cloudinaryRes.public_id)
          : prevImage,
      description: generateNftDescription({
        slug,
        name: newName || prevName,
      }),
      external_url: `https://www.infinitykeys.io/puzzle/${slug}`,
    },
  }
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
