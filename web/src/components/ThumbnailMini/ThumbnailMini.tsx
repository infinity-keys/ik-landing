import LockClosedIcon from '@heroicons/react/24/solid/LockClosedIcon'
import LockOpenIcon from '@heroicons/react/24/solid/LockOpenIcon'
import { ThumbnailProgress } from '@infinity-keys/core'
import Avatar from 'boring-avatars'
import clsx from 'clsx'

import { Link } from '@redwoodjs/router'

interface ThumbnailMiniProps {
  name: string
  progress: ThumbnailProgress
  to?: string
}

const ThumbnailMini = ({ name, progress, to }: ThumbnailMiniProps) => {
  return (
    <Link
      className={clsx(
        'puzzle-thumb relative flex w-full max-w-[10rem] items-center rounded-lg border bg-black/40 py-3 px-3 text-center shadow lg:px-4',
        progress === ThumbnailProgress.Current
          ? 'border-brand-accent-primary'
          : 'border-transparent',
        {
          'cursor-pointer transition hover:border-brand-accent-primary':
            progress === ThumbnailProgress.Completed,
          'opacity-60 grayscale':
            progress === ThumbnailProgress.NotCompleted ||
            progress === ThumbnailProgress.Unknown,
        }
      )}
      to={
        (progress === ThumbnailProgress.Completed ||
          progress === ThumbnailProgress.Current) &&
        to
          ? to
          : null
      }
    >
      <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full ">
        {progress === ThumbnailProgress.Completed ? (
          <LockOpenIcon className="h-3 w-3 text-brand-accent-primary" />
        ) : (
          <LockClosedIcon className="h-3 w-3 text-brand-accent-primary" />
        )}
      </span>

      <Avatar
        size={28}
        name={name}
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

      <p className="ml-2 text-sm text-gray-150 lg:ml-4">{name}</p>
    </Link>
  )
}

export default ThumbnailMini
