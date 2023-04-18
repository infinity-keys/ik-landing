import LockClosedIcon from '@heroicons/react/24/solid/LockClosedIcon'
import Avatar from 'boring-avatars'

const DummyThumbnail = ({ name }: { name: string }) => {
  return (
    <div className="puzzle-thumb relative flex w-full max-w-[10rem] items-center rounded-lg bg-black/40 py-3 px-3 text-center opacity-60 shadow grayscale lg:px-4">
      <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full ">
        <LockClosedIcon className="h-3 w-3 text-brand-accent-primary" />
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
    </div>
  )
}

export default DummyThumbnail
