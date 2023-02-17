import {
  IK_CLAIMS_NAMESPACE,
  PACK_COLLECTION_BASE,
  PACK_LANDING_BASE,
  PUZZLE_COLLECTION_BASE,
  PUZZLE_FAILED_BASE,
  PUZZLE_LANDING_BASE,
  PUZZLE_SUCCESS_BASE,
  welcome,
  chainIds,
} from '@infinity-keys/constants'
import z from 'zod'

import { ThumbnailProgress } from './types'

// Routes
export const routeLandingUrl = (slug: string) =>
  `/${PUZZLE_LANDING_BASE}/${slug}`
export const packsLandingUrl = (slug: string) => `/${PACK_LANDING_BASE}/${slug}`
export const routeSuccessUrl = (slug: string) =>
  `/${PUZZLE_SUCCESS_BASE}/${slug}`
export const routeFailUrl = (slug: string) => `/${PUZZLE_FAILED_BASE}/${slug}`
export const collectionBaseUrl = (isPack: boolean) => {
  return isPack ? `/${PACK_COLLECTION_BASE}` : `/${PUZZLE_COLLECTION_BASE}`
}

export const buildUrlString = (path: string) => {
  const url = new URL(path, IK_CLAIMS_NAMESPACE)
  return url.toString()
}

// Wallet stuff
export const message = (nonce: string) => `${welcome}\n\n${nonce}`

// Hasura/GraphQL stuff

/**
 * Linebreaks in Hasura text fields get escaped like \\n but we need \n.
 */
export const cleanGqlMarkdown = (markdown: string) =>
  markdown.split(/\\n/).join('\n')

export const toHex = (num: number) => {
  const val = Number(num)
  return '0x' + val.toString(16)
}

// // Thumbnail grid
// export const isTypePack = (
//   data: ThumbnailPack | ThumbnailPuzzle
// ): data is ThumbnailPack => {
//   return (data as ThumbnailPack).pack_name !== undefined
// }

// // normalize pack and puzzle data for Thumbnail
// export const thumbnailData = (
//   data: ThumbnailPack | ThumbnailPuzzle
// ): Thumbnail => {
//   const pack = isTypePack(data)

//   const cloudinary_id = pack
//     ? data.cloudinary_id
//     : data.nft?.nft_metadatum?.cloudinary_id

//   return {
//     id: pack ? data.pack_id : data.puzzle_id,
//     name: pack ? data.pack_name : data.simple_name,
//     url: pack
//       ? packsLandingUrl(data.simple_name)
//       : routeLandingUrl(data.landing_route),
//     cloudinary_id: cloudinary_id || undefined,
//   }
// }

export const getThumbnailProgress = ({
  currentStep,
  puzzleStep,
}: {
  currentStep: number
  puzzleStep: number
}) => {
  if (puzzleStep === currentStep) return ThumbnailProgress.Current
  if (puzzleStep < currentStep) return ThumbnailProgress.Completed
  if (puzzleStep > currentStep) return ThumbnailProgress.NotCompleted
  return ThumbnailProgress.Unknown
}

export const validChain = (chain: number | undefined) => {
  if (typeof chain === 'undefined') return false
  return chainIds.includes(chain)
}

export const buildTokenIdParams = (tokenIds: number[] | string[]) => {
  return tokenIds.map((id) => `tokenids=${id}`).join('&')
}

// Strings
export const isValidEmail = (email: string) =>
  z.string().email().safeParse(email).success

export  const truncate = (text: string) => {
    return `${text.substring(0, 5)}...${text.substring(text.length - 3)}`
  }
