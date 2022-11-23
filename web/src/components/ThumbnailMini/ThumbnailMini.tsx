import Avatar from 'boring-avatars'
import clsx from 'clsx'

import { Link } from '@redwoodjs/router'

interface ThumbnailMiniProps {
  name: string
  step: number
  currentStep: number
  href?: string
}

const ThumbnailMini = ({
  name,
  step,
  currentStep,
  href,
}: ThumbnailMiniProps) => {
  const status =
    step === currentStep ? 'current' : step < currentStep ? 'solved' : 'locked'

  return (
    <Link
      className={clsx(
        'flex w-full max-w-[9rem] items-center rounded-lg border bg-blue-800 py-3 px-4 shadow sm:max-w-[10rem]',
        {
          'cursor-pointer border-turquoise': status === 'solved',
          'border-yellow-400': status === 'current',
          'border-transparent opacity-60 grayscale': status === 'locked',
        }
      )}
      to={status === 'solved' && href ? href : null}
    >
      <Avatar
        size={28}
        name={name + step}
        variant="marble"
        colors={['#101D42', '#E400FF', '#3FCCBB', '#8500AC', '#303B5B']}
      />
      <p className="ml-4 text-gray-150">{name}</p>
    </Link>
  )
}

export default ThumbnailMini
