import CheckIcon from '@heroicons/react/24/solid/CheckIcon'
import { ThumbnailProgress } from '@infinity-keys/core'
import Avatar from 'boring-avatars'
import clsx from 'clsx'

import { Link } from '@redwoodjs/router'

import CloudImage from 'src/components/CloudImage/CloudImage'
import MinimalKeyLogo from 'src/svgs/MinimalKeyLogo'

interface ThumbnailProps {
  id: string
  name: string
  url: string
  isGrid: boolean
  cloudinary_id?: string
  progress?: ThumbnailProgress
}

const Thumbnail = ({
  name,
  id,
  isGrid,
  url,
  cloudinary_id,
  progress = ThumbnailProgress.Unknown,
}: ThumbnailProps) => {
  return (
    <div
      className={clsx(
        'puzzle-thumb relative cursor-pointer rounded-lg bg-blue-800 shadow',
        {
          'flex flex-col text-center': isGrid,
        }
      )}
    >
      {progress === ThumbnailProgress.Completed && (
        <div className="absolute top-0 right-0 flex h-6 w-6 translate-x-1/3 -translate-y-1/3 items-center justify-center rounded-full bg-turquoise/40  sm:top-2 sm:right-2 sm:translate-x-0 sm:translate-y-0">
          <CheckIcon className="h-4 w-4 text-turquoise" />
        </div>
      )}
      <Link to={url}>
        <div
          className={clsx(
            'flex flex-1',
            isGrid ? 'flex-col p-8' : 'items-center p-4 lg:px-6'
          )}
        >
          <div
            className={clsx(
              'flex-shrink-0',
              isGrid ? 'mx-auto h-32 w-32' : 'mr-4 h-14 w-14'
            )}
          >
            {cloudinary_id ? (
              <div className="overflow-hidden rounded-full">
                <div className="next-image-block scale-105	">
                  <CloudImage
                    height={128}
                    width={128}
                    id={cloudinary_id}
                    circle
                  />
                </div>
              </div>
            ) : (
              <Avatar
                size={isGrid ? 128 : 56}
                name={id}
                variant="marble"
                colors={['#101D42', '#E400FF', '#3FCCBB', '#8500AC', '#303B5B']}
              />
            )}
          </div>
          <h3
            className={clsx('text-sm font-medium text-gray-200', {
              'mt-6': isGrid,
            })}
          >
            {name}
          </h3>
          <dl
            className={clsx('flex-grow', {
              ' mt-1 flex flex-col justify-between': isGrid,
            })}
          >
            <dt className="sr-only">Logo</dt>
            <dd
              className={clsx(
                'flex',
                isGrid ? 'mt-4 justify-center' : 'justify-end'
              )}
            >
              <div className="h-8 w-8 text-turquoise">
                <MinimalKeyLogo />
              </div>
            </dd>
          </dl>
        </div>
      </Link>
    </div>
  )
}

export default Thumbnail