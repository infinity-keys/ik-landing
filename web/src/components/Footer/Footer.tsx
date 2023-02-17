import { LensIcon } from '@infinity-keys/react-lens-share-button'

import { Link, routes } from '@redwoodjs/router'

import Button from 'src/components/Button/Button'
import DiscordIcon from 'src/svgs/DiscordIcon'
import RedditIcon from 'src/svgs/RedditIcon'
import TwitterIcon from 'src/svgs/TwitterIcon'

// @TODO: replace link urls with constants
// import { PACK_COLLECTION_BASE } from "@lib/constants";

const links = [
  {
    className: 'lensIcon',
    href: 'https://lenster.xyz/u/infinitykeys',
    testing: 'lens',
    ariaLabel: 'visit IK Lenster.',
    icon: <LensIcon height={32} width={32} />,
  },
  {
    className: 'twitterIcon',
    href: 'https://twitter.com/InfinityKeys',
    testing: 'twitter',
    ariaLabel: 'visit IK Twitter.',
    icon: <TwitterIcon />,
  },
  {
    className: 'discordIcon',
    href: 'discord',
    testing: 'https://discord.com/invite/infinitykeys',
    ariaLabel: 'visit IK Discord.',
    icon: <DiscordIcon />,
  },
  {
    className: 'redditIcon',
    href: 'https://www.reddit.com/r/infinitykeys/',
    testing: 'reddit',
    ariaLabel: 'visit the IK subreddit.',
    icon: <RedditIcon />,
  },
]

const Footer = () => {
  return (
    <footer className="ik-footer text-white">
      <div className="overflow-hidden bg-blue py-12 px-4 sm:px-6 lg:px-8">
        <nav className="px-4 sm:px-6 lg:px-8" aria-label="Top">
          <div className="flex w-full flex-col items-center justify-center border-b border-indigo-500 py-6 sm:flex-row lg:border-none">
            <div className="mb-4 flex items-center space-x-4 sm:mb-0">
              {links.map(({ className, href, testing, ariaLabel, icon }) => (
                <div key={href}>
                  <a
                    className={className}
                    data-cy={testing}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={ariaLabel}
                  >
                    {icon}
                  </a>
                </div>
              ))}
            </div>
            {/* right */}
            <div className="mb-4 flex gap-4 sm:mb-0 sm:ml-6">
              <Button text="Packs" to="/packs" variant="outline" />
              <Button text="Puzzles" to="/puzzles" variant="outline" />
            </div>
          </div>
        </nav>
        <p className="mt-8 text-center text-base text-white/50">
          &copy; 2022 Infinity Keys. All rights reserved. |{' '}
          <Link
            to={routes.privacyPolicy()}
            className="transition hover:text-turquoise"
          >
            Privacy Policy
          </Link>
        </p>
      </div>
    </footer>
  )
}

export default Footer
