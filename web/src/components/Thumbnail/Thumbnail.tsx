import CheckIcon from '@heroicons/react/24/solid/CheckIcon'
import { ThumbnailProgress } from '@infinity-keys/core'
import Avatar from 'boring-avatars'
import clsx from 'clsx'

import { Link } from '@redwoodjs/router'

import CloudImage from 'src/components/CloudImage/CloudImage'

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
        'puzzle-thumb relative block w-full max-w-[18rem] cursor-pointer break-words rounded-lg border border-transparent bg-black/40 shadow transition hover:border-brand-accent-primary',
        progress === ThumbnailProgress.Current
          ? 'border-brand-accent-primary'
          : 'border-transparent',
        {
          'flex flex-col text-center': isGrid,
          'cursor-pointer transition hover:border-brand-accent-primary':
            progress === ThumbnailProgress.Completed,
          'opacity-60 grayscale': progress === ThumbnailProgress.NotCompleted,
        }
      )}
    >
      {progress === ThumbnailProgress.Completed && (
        <span className="absolute top-1 right-1 flex h-5 w-5 items-center justify-center rounded-full bg-brand-accent-primary/30 ">
          <CheckIcon className="h-3 w-3 text-brand-accent-secondary" />
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
              colors={[
                '#b1804a',
                '#76493b',
                '#543230',
                '#352d2d',
                '#a89382',
                '#ccbba0',
              ]}
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
                    'mr-1 mt-2 block h-2 w-2 rounded-full pt-2',
                    solved ? 'text-brand-accent-primary' : 'text-gray-300'
                  )}
                ></span>
              ))}
            </dd>
          </dl>
        </span>
      </span>
    </Link>
  )
}

export default Thumbnail
