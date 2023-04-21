import memoize from 'lodash/memoize'
import { z } from 'zod'

import IK_TOKENS from 'src/lib/theme/ik-tokens.tokens.json'

const ColorData = z.object({
  $value: z.string(),
  $type: z.literal('color'),
})

type ColorDataType = z.infer<typeof ColorData>

type ColorTokenObjectType = {
  $value: string
  $type: string
}

// Takes a color object from ik-tokens and filters out strings (ie, description).
// Returns an array of colors
export const generateAvatarGradient = (
  colorTokens: (ColorTokenObjectType | string)[]
) => {
  return colorTokens
    .filter(
      (value): value is ColorDataType => ColorData.safeParse(value).success
    )
    .map(({ $value }) => $value)
}

export const memoizedAvatarGradient = memoize(generateAvatarGradient)

export const avatarGradient = memoizedAvatarGradient([
  ...Object.values(IK_TOKENS.avatar.color),
  ...Object.values(IK_TOKENS.brand.color),
])
