import { Link, routes } from '@redwoodjs/router'

const OldFormatMessage = () => {
  return (
    <div className="mx-auto max-w-prose px-4">
      <h1 className="font-bold">You’ve gone exploring and found…a mess.</h1>

      <p className="mt-4">
        Infinity Keys is currently upgrading the puzzle system to Beta version.
        While we do, this puzzle will be broken.
      </p>

      <p className="mt-4">
        Pardon the mess, and stay tuned to our socials for updates on when
        upgraded puzzles will be live across infinitykeys.io.
      </p>

      <p className="mt-4">
        In the meantime, check out the new design in our refreshed{' '}
        <Link
          className="text-brand-accent-secondary underline"
          to={routes.puzzleLanding({ slug: 'the-society' })}
        >
          Society Puzzle
        </Link>
        . Or peek at our Venture Studio creation @{' '}
        <a
          className="text-brand-accent-secondary underline"
          href="https://scene.infinitykeys.io/"
          target="_blank"
          rel="noopener noreferrer"
        >
          The Scene
        </a>
        .
      </p>
    </div>
  )
}

export default OldFormatMessage
