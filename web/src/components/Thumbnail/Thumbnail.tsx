import LockClosedIcon from '@heroicons/react/24/solid/LockClosedIcon'
import LockOpenIcon from '@heroicons/react/24/solid/LockOpenIcon'
import { ThumbnailProgress } from '@infinity-keys/core'
import Avatar from 'boring-avatars'
import clsx from 'clsx'

import { Link } from '@redwoodjs/router'

import CloudImage from 'src/components/CloudImage/CloudImage'
import MinimalKeyLogo from 'src/svgs/MinimalKeyLogo'

interface ThumbnailProps {
  id: string
  name: string
  href: string
  isGrid: boolean
  cloudinaryId?: string
  solvedArray?: boolean[]
  progress?: ThumbnailProgress
}

// @TODO: how do show solved puzzles?

const Thumbnail = ({
  name,
  id,
  isGrid,
  href,
  solvedArray = [],
  progress = ThumbnailProgress.Unknown,
  cloudinaryId,
}: ThumbnailProps) => {
  return (
    <Link
      to={href}
      className={clsx(
        'puzzle-thumb relative block w-full max-w-[18rem] cursor-pointer break-words rounded-lg border border-transparent bg-blue-800 shadow transition hover:border-turquoise',
        progress === ThumbnailProgress.Current
          ? 'border-turquoise'
          : 'border-transparent',
        {
          'flex flex-col text-center': isGrid,
          'cursor-pointer transition hover:border-turquoise':
            progress === ThumbnailProgress.Completed,
          'opacity-60 grayscale': progress === ThumbnailProgress.NotCompleted,
        }
      )}
    >
      {progress !== ThumbnailProgress.Unknown && (
        <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full ">
          {progress === ThumbnailProgress.Completed ? (
            <LockOpenIcon className="h-3 w-3 text-turquoise" />
          ) : (
            <LockClosedIcon className="h-3 w-3 text-turquoise" />
          )}
        </span>
      )}

      <span
        className={clsx(
          'flex flex-1',
          isGrid ? 'flex-col p-8' : 'items-center p-4 lg:px-6'
        )}
      >
        <span
          className={clsx(
            'block flex-shrink-0',
            isGrid ? 'mx-auto h-32 w-32' : 'mr-4 h-14 w-14'
          )}
        >
          {cloudinaryId ? (
            <span className="block overflow-hidden rounded-full">
              <span className="next-image-block scale-105	">
                <CloudImage height={128} width={128} id={cloudinaryId} circle />
              </span>
            </span>
          ) : (
            <Avatar
              size={isGrid ? 128 : 56}
              name={id}
              variant="marble"
              colors={['#101D42', '#E400FF', '#3FCCBB', '#8500AC', '#303B5B']}
            />
          )}
        </span>
        <span>
          <h3
            className={clsx('text-sm font-medium text-gray-200', {
              'mt-6': isGrid,
            })}
          >
            {name}
          </h3>
          <dl
            className={clsx('flex-grow', {
              'flex flex-col justify-between': isGrid,
            })}
          >
            <dt className="sr-only">Logo</dt>
            <dd
              className={clsx(
                'flex',
                isGrid ? 'mt-4 justify-center' : 'justify-start'
              )}
            >
              {solvedArray.map((solved, i) => (
                <span
                  key={i}
                  className={clsx(
                    'h-5 w-5 pt-2',
                    solved ? 'text-turquoise' : 'text-gray-300'
                  )}
                >
                  <MinimalKeyLogo />
                </span>
              ))}
            </dd>
          </dl>
        </span>
      </span>
    </Link>
  )
}

export default Thumbnail
