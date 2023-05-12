import { IK_CLAIMS_NAMESPACE } from '@infinity-keys/constants'
import { JWTPayload } from 'jose'
import { z } from 'zod'

// import { GetAllPublicPacksQuery, PublicPuzzlesQuery } from './generated/graphql'

export const PuzzleApiResponseSchema = z.object({
  fail_route: z.string(),
  success_route: z.optional(z.string()),
})
export type PuzzleApiResponse = z.infer<typeof PuzzleApiResponseSchema>

export const GuessSchema = z.object({
  puzzleId: z.string(),
  code: z.string(),
})
export type Guess = z.infer<typeof GuessSchema>

export interface IkJwt extends JWTPayload {
  claims: {
    [IK_CLAIMS_NAMESPACE]: {
      walletConnected?: boolean
      puzzles: string[]
      email?: string
    }
  }
}

// All submission pages need a puzzle id
export interface PuzzleInput {
  puzzleId: string
}

// Thumbnail and Grid Layout
export enum ThumbnailGridLayoutType {
  Grid = 'grid',
  List = 'list',
  Unknown = 'unknown',
}

export enum ThumbnailProgress {
  Completed = 'completed',
  Current = 'current',
  NotCompleted = 'notCompleted',
  Unknown = 'unknown',
}

// export type ThumbnailPuzzle = PublicPuzzlesQuery['puzzles'][0]
// export type ThumbnailPack = GetAllPublicPacksQuery['packs'][0]

export const ThumbnailSchema = z.object({
  id: z.string(),
  name: z.string(),
  url: z.string(),
  cloudinary_id: z.optional(z.string()),
})

export type Thumbnail = z.infer<typeof ThumbnailSchema>

export const emailSchema = z.string().min(5).email()

export type AuthProviderType = 'KEYP'
export type SocialProviderType = 'KEYP_DISCORD' | 'KEYP_GOOGLE'
