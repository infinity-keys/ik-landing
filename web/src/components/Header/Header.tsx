import { Fragment, useEffect, useRef, useState } from 'react'

import { Dialog, Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import Bars3Icon from '@heroicons/react/24/outline/Bars3Icon'
import XMarkIcon from '@heroicons/react/24/outline/XMarkIcon'
import { LensIcon } from '@infinity-keys/react-lens-share-button'

import { Link, routes } from '@redwoodjs/router'
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

  const [isOpen, setIsOpen] = useState(true)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  return (
    <div className="relative border-b border-brand-gray-secondary px-4 sm:px-6 lg:border-none lg:px-8">
      <div className="z-20 flex h-20 items-center justify-between">
        <div className="flex items-center" data-cy="ik logo">
          <Link
            to={routes.home()}
            className="inline-block max-w-[60px] sm:max-w-[150px]"
            aria-label="return home"
          >
            <img
              srcSet={`${LogoHeaderSm1x} 1x, ${LogoHeaderSm2x} 2x`}
              src={LogoHeaderSm1x}
              alt=""
              className="block w-full sm:hidden"
            />
            <img
              srcSet={`${LogoHeader1x} 1x, ${LogoHeader2x} 2x`}
              src={LogoHeader1x}
              alt=""
              className="hidden w-full sm:block"
            />
          </Link>
        </div>

        <Button onClick={openModal} text="Menu" />
      </div>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative" onClose={closeModal}>
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

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
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
                  {/* <Dialog.Title
                    as="p"
                    className="text-center text-lg font-medium leading-6 text-white"
                  >
                    Menu
                  </Dialog.Title> */}
                  <div className="relative rounded-lg border-2 border-brand-accent-primary/30 bg-brand-gray-primary text-center align-middle shadow-xl">
                    <div className="absolute top-0 left-1/2 max-w-[100px] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-brand-accent-primary/30 bg-brand-gray-primary p-2">
                      <img src={LogoFullSm} alt="" className="w-full" />
                    </div>

                    <nav className="mt-6 flex flex-col p-6">
                      <NavTitle label="Navigation" />
                      <Link
                        to={routes.play()}
                        className="header-nav--link mt-4 p-2 text-2xl font-medium text-white transition-colors hover:text-brand-accent-primary"
                      >
                        Play
                      </Link>
                      <a
                        href="https://docs.infinitykeys.io"
                        target="_blank"
                        rel="noreferrer"
                        className="header-nav--link mt-4 p-2 text-2xl font-medium text-white transition-colors hover:text-brand-accent-primary"
                      >
                        Info
                      </a>
                      <a
                        href="https://blog.infinitykeys.io"
                        target="_blank"
                        rel="noreferrer"
                        className="header-nav--link mt-4 p-2 text-2xl font-medium text-white transition-colors hover:text-brand-accent-primary"
                      >
                        Blog
                      </a>

                      <NavTitle label="Social" />
                      <div className="mt-6 flex justify-center gap-4">
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

const NavTitle = ({ label }: { label: string }) => {
  return (
    <div className="mt-6 flex items-center gap-4 text-sm uppercase text-brand-accent-primary before:block before:h-[1px] before:flex-1 before:bg-brand-accent-primary/30 before:content-[''] after:block after:h-[1px] after:flex-1 after:bg-brand-accent-primary/30 after:content-['']">
      {label}
    </div>
  )
}
