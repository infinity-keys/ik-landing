import { buildUrl } from 'cloudinary-build-url'
import { CLOUDINARY_CLOUD_NAME } from 'lib/constants'

export const cloudinaryUrl = (
  id: string,
  height: number,
  width: number,
  circle: boolean,
  dpr: number
) => {
  return buildUrl(id, {
    cloud: {
      cloudName: CLOUDINARY_CLOUD_NAME,
    },
    transformations: {
      quality: '100',
      radius: circle ? 'max' : 0,
      format: 'png',
      dpr,
      resize: {
        type: 'scale',
        width,
        height,
      },
    },
  })
}
