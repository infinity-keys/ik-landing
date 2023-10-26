import { Fragment } from 'react'

import { Menu, Transition } from '@headlessui/react'
import UserCircleIcon from '@heroicons/react/24/outline/UserCircleIcon'
import clsx from 'clsx'

import { Link, routes, useLocation } from '@redwoodjs/router'

import { useAuth } from 'src/auth'
import Button from 'src/components/Button/Button'
import { useLoginModal } from 'src/providers/loginModal/loginModal'

const ProfileIcon = () => {
  const { isAuthenticated, logOut } = useAuth()
  const { setIsLoginModalOpen } = useLoginModal()
  const { pathname } = useLocation()

  return (
    <>
      {pathname !== '/' && (
        <>
          {isAuthenticated ? (
            <div className="flex text-right">
              <Menu as="div" className="relative z-50 flex text-left">
                <Menu.Button className="inline-flex w-full items-center justify-center rounded-lg border border-transparent bg-white/10 px-2 py-1 text-sm font-medium text-white transition-colors hover:border-white hover:text-brand-accent-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 sm:px-3">
                  <UserCircleIcon className="block h-6 w-6 fill-transparent" />
                  <span className="ml-1 inline-block h-2 w-2 rounded-full bg-green-400" />
                </Menu.Button>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 mt-2 w-52 origin-top-right divide-y divide-gray-100 rounded-md border border-white/20 bg-brand-gray-primary text-gray-200 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="px-1 py-1 ">
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to={routes.profile()}
                            className={clsx(
                              'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                              active
                                ? 'bg-brand-gray-secondary text-white'
                                : 'text-gray-100'
                            )}
                          >
                            View Profile
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={logOut}
                            className={clsx(
                              'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                              active
                                ? 'bg-brand-gray-secondary text-white'
                                : 'text-gray-100'
                            )}
                          >
                            Log Out
                          </button>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          ) : (
            <Button
              size="small"
              text="Login"
              onClick={() => setIsLoginModalOpen(true)}
            />
          )}
        </>
      )}
    </>
  )
}

export default ProfileIcon
