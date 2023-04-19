import { z } from 'zod'

import IK_TOKENS from 'src/lib/theme/ik-tokens.tokens.json'

const ColorData = z.object({
  $value: z.string(),
  $type: z.literal('color'),
})

type ColorType = z.infer<typeof ColorData>

export const generateAvatarGradient = () => {
  const values = [
    ...Object.values(IK_TOKENS.avatar.color),
    ...Object.values(IK_TOKENS.brand.color),
  ].filter((value): value is ColorType => ColorData.safeParse(value).success)

  return values.map(({ $value }) => $value)
}
