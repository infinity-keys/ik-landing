import { Disclosure } from '@headlessui/react'
import Bars3Icon from '@heroicons/react/24/outline/Bars3Icon'
import XMarkIcon from '@heroicons/react/24/outline/XMarkIcon'

import { Link, routes } from '@redwoodjs/router'

// @TODO: update links urls to constants
// import { PACK_COLLECTION_BASE, PUZZLE_LANDING_BASE } from '@lib/constants'
import Button from 'src/components/Button/Button'
import WalletButton from 'src/components/WalletButton/WalletButton'
import Logo from 'src/svgs/Logo'
import LogoMobile from 'src/svgs/LogoMobile'

export const navigation = [
  { name: 'Home', to: '/' },
  { name: 'Collab', to: '/#collab' },
  {
    name: 'Thesis',
    href: 'https://blog.infinitykeys.io/what-is-infinity-keys',
  },
  { name: 'Blog', href: 'https://blog.infinitykeys.io' },
]

const Header = () => {
  return (
    <Disclosure as="header" className="header sticky top-0 z-50 w-full bg-blue">
      {({ open }) => (
        <>
          <div
            className="border-b border-indigo-500 px-4 sm:px-6 lg:border-none lg:px-8"
            aria-label="Top"
          >
            <div className="relative flex h-20 items-center justify-between">
              <div data-cy="ik logo" className="logo">
                <div className="block sm:hidden">
                  <Link
                    to={routes.home()}
                    className="block"
                    aria-label="return home"
                  >
                    <LogoMobile />
                  </Link>
                </div>
                <div className="hidden sm:block">
                  <Link
                    to={routes.home()}
                    className="bg-purple-500 text-left"
                    aria-label="return home"
                  >
                    <Logo />
                  </Link>
                </div>
              </div>

              <div className="menu-items hidden items-center justify-center sm:items-stretch sm:justify-start lg:flex">
                <nav className="flex space-x-4">
                  {navigation.map((item) => {
                    return item.to ? (
                      <Link
                        to={item.to}
                        key={item.name}
                        className="header-nav--link text-2xl font-medium text-white hover:text-turquoise"
                      >
                        {item.name}
                      </Link>
                    ) : (
                      <a
                        href={item.href}
                        key={item.name}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="header-nav--link text-2xl font-medium text-white hover:text-turquoise"
                      >
                        {item.name}
                      </a>
                    )
                  })}
                </nav>
              </div>

              <div data-cy="puzzle-link" className="flex items-center gap-2">
                <Button text="Packs" to="/packs" variant="outline" responsive />
                <Button
                  text="Puzzles"
                  to="/puzzles"
                  variant="outline"
                  responsive
                />

                <WalletButton />
              </div>

              {/* hamburger icon, visible mobile only */}
              <div className="hamburger flex items-center lg:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="absolute top-20 left-0 w-full bg-blue lg:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className="block rounded-md px-3 py-2 text-2xl font-medium text-white"
                  aria-current={item.name ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}

export default Header
