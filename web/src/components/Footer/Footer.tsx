import { Link } from '@redwoodjs/router'

import Button from 'src/components/Button/Button'
import DiscordIcon from 'src/svgs/DiscordIcon'
import TwitterIcon from 'src/svgs/TwitterIcon'

// @TODO: replace link urls with constants
// import { PACK_COLLECTION_BASE } from "@lib/constants";

const Footer = () => {
  return (
    <footer className="ik-footer text-white">
      <div className="overflow-hidden bg-blue py-12 px-4 sm:px-6 lg:px-8">
        <nav className="px-4 sm:px-6 lg:px-8" aria-label="Top">
          <div className="flex w-full flex-col items-center justify-center border-b border-indigo-500 py-6 sm:flex-row lg:border-none">
            <div className="mb-4 flex items-center space-x-4 sm:mb-0">
              <div className="twitterIcon hover: fill-twitterBlue">
                <a
                  data-cy="twitter"
                  href="https://twitter.com/InfinityKeys"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="visit IK Twitter."
                >
                  <TwitterIcon />
                </a>
              </div>
              <div className="discordIcon hover: fill-discordPurple">
                <a
                  data-cy="discord"
                  href="https://discord.com/invite/infinitykeys"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="visit IK Discord."
                >
                  <DiscordIcon />
                </a>
              </div>
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
            to="/privacy-policy"
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
