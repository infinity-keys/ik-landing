import { cloudinaryUrl } from 'lib/images'

interface CloudImageProps {
  id: string
  height: number
  width: number
  alt?: string
  circle?: boolean
  dpr?: number
}

const CloudImage = ({
  id,
  height,
  width,
  alt = '',
  circle = false,
  dpr = 1,
}: CloudImageProps) => {
  return (
    <img
      src={cloudinaryUrl(id, height, width, circle, dpr)}
      alt={alt}
      width={width}
      height={height}
    />
  )
}

export default CloudImage
