import { createContext, useEffect, useRef, useState } from 'react'

import { CLOUDINARY_CLOUD_NAME } from '@infinity-keys/constants'

// Create a context to manage the script loading state
const CloudinaryScriptContext = createContext()

function CloudinaryUploadWidget({ uwConfig, setPublicId }) {
  const [loaded, setLoaded] = useState(false)
  const cloudn = useRef()

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
      if (!cloudn.current) {
        cloudn.current = window.cloudinary.createUploadWidget(
          {
            cloudName: CLOUDINARY_CLOUD_NAME,
          },
          (error, result) => {
            if (!error && result && result.event === 'success') {
              console.log('Done! Here is the image info: ', result.info)
              setPublicId(result.info.public_id)
            }
          }
        )
      }
      // document.getElementById('upload_widget').addEventListener(
      //   'click',
      //   function () {
      //     cloudn.current.open()
      //   },
      //   false
      // )
      cloudn.current.open()
    }
  }

  return (
    <CloudinaryScriptContext.Provider value={{ loaded }}>
      <button
        id="upload_widget"
        onClick={initializeCloudinaryWidget}
        type="button"
        className={
          loaded
            ? 'opacity-1 cloudinary-button'
            : 'cloudinary-button opacity-30'
        }
      >
        Upload
      </button>
    </CloudinaryScriptContext.Provider>
  )
}

export default CloudinaryUploadWidget
export { CloudinaryScriptContext }
