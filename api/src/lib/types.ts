import { JWTPayload } from 'jose'
import { z } from 'zod'

import { IK_CLAIMS_NAMESPACE } from './constants'

export const emailSchema = z.string().min(5).email()

export interface IkJwt extends JWTPayload {
  claims: {
    [IK_CLAIMS_NAMESPACE]: {
      walletConnected?: boolean
      puzzles: string[]
      email?: string
    }
  }
}
