import { useState, ImgHTMLAttributes } from 'react'

interface ImageWithFallbackProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string
  fallback: string
}

const ImageWithFallback = ({
  src,
  fallback,
  ...props
}: ImageWithFallbackProps) => {
  const [imgSrc, setImgSrc] = useState(src)
  const [hasError, setHasError] = useState(false)

  const handleError = () => {
    // Prevent infinite loop if fallback also fails
    if (!hasError) {
      setImgSrc(fallback)
      setHasError(true)
    }
  }

  return <img src={imgSrc} alt="" onError={handleError} {...props} />
}

export default ImageWithFallback
