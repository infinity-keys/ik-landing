import { useEffect, useRef, useState } from 'react'

import CloudArrowUpIcon from '@heroicons/react/20/solid/CloudArrowUpIcon'
import XCircleIcon from '@heroicons/react/20/solid/XCircleIcon'
import { CLOUDINARY_CLOUD_NAME } from '@infinity-keys/constants'
import { cloudinaryUrl } from '@infinity-keys/core'

import Button from 'src/components/Button'

import DisplayImage from '../DisplayImage/DisplayImage'

export const formatImageSrc = (src: string) => {
  if (src.startsWith('https')) return src

  return cloudinaryUrl(src, 300, 300, false, 1)
}

const CloudinaryUploadWidget = ({
  nftImage,
  setNftImage,
}: {
  nftImage?: string
  setNftImage: (s: string) => void
}) => {
  const [loaded, setLoaded] = useState(false)
  const uploadWidget = useRef()

  useEffect(() => {
    // Check if the script is already loaded
    if (!loaded) {
      const uwScript = document.getElementById('uw')
      if (!uwScript) {
        // If not loaded, create and load the script
        const script = document.createElement('script')
        script.setAttribute('async', '')
        script.setAttribute('id', 'uw')
        script.src = 'https://upload-widget.cloudinary.com/global/all.js'
        script.addEventListener('load', () => setLoaded(true))
        document.body.appendChild(script)
      } else {
        // If already loaded, update the state
        setLoaded(true)
      }
    }
  }, [loaded])

  const initializeCloudinaryWidget = () => {
    if (loaded) {
      if (!uploadWidget.current && window) {
        uploadWidget.current = (window as any).cloudinary.createUploadWidget(
          uploadOptions,
          (error: any, result: any) => {
            if (!error && result && result.event === 'success') {
              setNftImage(result.info.public_id)
              console.log(result)
            }
          }
        )
      }

      ;(uploadWidget.current as any).open()
    }
  }

  return (
    <>
      {nftImage ? (
        <div className="relative mb-6 inline-flex">
          <DisplayImage src={formatImageSrc(nftImage)} />
          <button
            type="button"
            className="absolute top-0 right-0 translate-x-3 -translate-y-3 shadow-md"
            onClick={() => setNftImage('')}
          >
            <XCircleIcon className="h-6 w-6" />
          </button>
        </div>
      ) : (
        <Button
          type="button"
          borderWhite
          round
          onClick={initializeCloudinaryWidget}
          disabled={!loaded}
        >
          <span className="flex items-center gap-2 text-xs">
            <CloudArrowUpIcon className="h-5 w-5" /> Upload Image
          </span>
        </Button>
      )}
    </>
  )
}

export default CloudinaryUploadWidget

const uploadOptions = {
  cloudName: CLOUDINARY_CLOUD_NAME,
  uploadPreset: 'ml_default',
  cropping: true,
  maxImageFileSize: 5000000, // Restrict file size to less than 5MB
  maxImageWidth: 1000, // Scales the image down to a width of 1000 pixels before uploading
  folder: 'ik-alpha-creators',
  // Upload modal styles
  styles: {
    palette: {
      window: '#1E1E1C',
      sourceBg: '#1E1E1C',
      windowBorder: '#c7a49f',
      tabIcon: '#F1C391',
      inactiveTabIcon: '#E8D5BB',
      menuIcons: '#ebe5db',
      link: '#F1C391',
      action: '#F1C391',
      inProgress: '#99cccc',
      complete: '#78b3b4',
      error: '#ff6666',
      textDark: '#1E1E1C',
      textLight: '#D8CFCF',
    },
    fonts: {
      default: null,
      "'Poppins', sans-serif": {
        url: 'https://fonts.googleapis.com/css?family=Poppins',
        active: true,
      },
    },
  },
}
