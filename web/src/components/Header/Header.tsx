import { Fragment, useEffect, useState } from 'react'

import { Dialog, Transition } from '@headlessui/react'
import XMarkIcon from '@heroicons/react/24/outline/XMarkIcon'
import { LensIcon } from '@infinity-keys/react-lens-share-button'

import { Link, routes, useLocation } from '@redwoodjs/router'
import { LoaderIcon } from '@redwoodjs/web/dist/toast'

import { useAuth } from 'src/auth'
import Button from 'src/components/Button/Button'
import ProfileIcon from 'src/components/ProfileIcon/ProfileIcon'
import WalletButton from 'src/components/WalletButton/WalletButton'
import LogoFullSm from 'src/images/full-logo-sm.webp'
import LogoHeader1x from 'src/images/header-logo-1x.webp'
import LogoHeader2x from 'src/images/header-logo-2x.webp'
import LogoHeaderSm1x from 'src/images/header-logo-sm-1x.webp'
import LogoHeaderSm2x from 'src/images/header-logo-sm-2x.webp'
import DiscordIcon from 'src/svgs/DiscordIcon'
import RedditIcon from 'src/svgs/RedditIcon'
import TwitterIcon from 'src/svgs/TwitterIcon'

const links = [
  {
    href: 'https://lenster.xyz/u/infinitykeys',
    testing: 'lens',
    ariaLabel: 'visit IK Lenster.',
    icon: <LensIcon height={32} width={32} />,
  },
  {
    href: 'https://twitter.com/InfinityKeys',
    testing: 'twitter',
    ariaLabel: 'visit IK Twitter.',
    icon: <TwitterIcon />,
  },
  {
    href: 'https://discord.com/invite/infinitykeys',
    testing: 'discord',
    ariaLabel: 'visit IK Discord.',
    icon: <DiscordIcon />,
  },
  {
    href: 'https://www.reddit.com/r/infinitykeys/',
    testing: 'reddit',
    ariaLabel: 'visit the IK subreddit.',
    icon: <RedditIcon />,
  },
]

const Header = () => {
  const { loading } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const { pathname } = useLocation()

  // Close menu when route changes (ie, user click internal link)
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  return (
    <div className="fixed top-0 left-0 z-20 w-full bg-brand-gray-primary px-4 sm:px-6 lg:px-8">
      <div className="flex h-20 items-center justify-between">
        <div className="flex items-center" data-cy="ik logo">
          {/* Left logo */}
          <Link
            to={routes.play()}
            className="inline-block max-w-[60px] sm:max-w-[150px]"
            aria-label="return home"
          >
            <picture>
              <source
                srcSet={`${LogoHeader1x} 1x, ${LogoHeader2x} 2x`}
                media="(min-width: 640px)"
              />
              <source srcSet={`${LogoHeaderSm1x} 1x, ${LogoHeaderSm2x} 2x`} />
              <img src={LogoHeaderSm1x} alt="" />
            </picture>
          </Link>
        </div>

        {/* Menu open button */}
        <Button
          onClick={() => setIsOpen(true)}
          text="Menu"
          variant="faded"
          border={false}
        />
      </div>

      {/* Modal Menu */}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-30"
          onClose={() => setIsOpen(false)}
        >
          {/* Backdrop */}
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-75" />
          </Transition.Child>

          <div className="fixed inset-0 max-h-screen overflow-y-scroll">
            <div className="flex min-h-full items-center justify-center p-4 pt-12 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform transition-all">
                  <div className="relative rounded-lg border-2 border-brand-accent-primary/20 bg-brand-gray-primary text-center align-middle">
                    {/* Close button */}
                    <button
                      className="absolute right-2 top-2 rounded p-2 text-white/30 hover:bg-black/20 hover:text-brand-accent-primary"
                      onClick={() => setIsOpen(false)}
                    >
                      <XMarkIcon className="h-5 w-5" />
                    </button>

                    {/* Menu panel logo */}
                    <div className="absolute top-0 left-1/2 max-w-[120px] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-brand-accent-primary/20 bg-brand-gray-primary p-1 shadow-md shadow-black/50">
                      <img src={LogoFullSm} alt="" className="w-full" />
                    </div>

                    <nav className="mt-7 flex flex-col items-center p-6">
                      {/* Navigation links */}
                      <NavTitle text="Navigation" />
                      <Link
                        to={routes.play()}
                        className="header-nav--link mt-5 py-2 px-4 text-2xl font-medium text-white transition-colors hover:text-brand-accent-primary"
                      >
                        Play
                      </Link>
                      <a
                        href="https://docs.infinitykeys.io"
                        target="_blank"
                        rel="noreferrer"
                        className="header-nav--link mt-3 py-2 px-4 text-2xl font-medium text-white transition-colors hover:text-brand-accent-primary"
                      >
                        Info
                      </a>
                      {/* <a
                        href="https://blog.infinitykeys.io"
                        target="_blank"
                        rel="noreferrer"
                        className="header-nav--link mt-3 py-2 px-4 text-2xl font-medium text-white transition-colors hover:text-brand-accent-primary"
                      >
                        Blog
                      </a> */}

                      {/* Wallet and profile buttons */}
                      <NavTitle text="Connect" />
                      <div className="mt-7 flex items-center justify-center gap-2">
                        <WalletButton />
                        {loading ? <LoaderIcon /> : <ProfileIcon />}
                      </div>

                      {/* Social Icons */}
                      <NavTitle text="Social" />
                      <div className="mt-7 flex justify-center gap-4">
                        {links.map(({ href, testing, ariaLabel, icon }) => (
                          <a
                            key={href}
                            className="text-white/40 transition-colors hover:text-brand-accent-primary"
                            data-cy={testing}
                            href={href}
                            target="_blank"
                            rel="noreferrer"
                            aria-label={ariaLabel}
                          >
                            {icon}
                          </a>
                        ))}
                      </div>
                    </nav>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  )
}

export default Header

const NavTitle = ({ text }: { text: string }) => {
  return (
    <div className="mt-7 flex w-full items-center gap-4 text-sm uppercase text-brand-accent-primary before:block before:h-[1px] before:flex-1 before:bg-brand-accent-primary/20 before:content-[''] after:block after:h-[1px] after:flex-1 after:bg-brand-accent-primary/20 after:content-['']">
      {text}
    </div>
  )
}
