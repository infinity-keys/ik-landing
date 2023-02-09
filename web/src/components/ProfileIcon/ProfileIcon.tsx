import { Fragment } from 'react'

import { Menu, Transition } from '@headlessui/react'
import UserCircleIcon from '@heroicons/react/24/outline/UserCircleIcon'
import clsx from 'clsx'

import { useAuth } from '@redwoodjs/auth'
import { Link, routes } from '@redwoodjs/router'

const ProfileIcon = () => {
  const { isAuthenticated, logOut } = useAuth()

  return (
    <div className="text-right">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex w-full items-center justify-center rounded-lg border border-transparent bg-white/10 px-2 py-1 text-sm font-medium text-white transition-colors hover:border-white hover:text-turquoise focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 sm:px-3 sm:py-2">
            <UserCircleIcon className="block h-6 w-6 fill-transparent sm:h-7 sm:w-7" />
            <span
              className={clsx(
                'ml-1 inline-block h-2 w-2 rounded-full',
                isAuthenticated ? 'bg-turquoise' : 'bg-orange-300'
              )}
            ></span>
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md border border-white/20 bg-blue text-gray-200 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1 ">
              {isAuthenticated ? (
                <>
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        to={routes.auth()}
                        className={clsx(
                          'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                          active ? 'bg-indigo-500 text-white' : 'text-gray-100'
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
                          active ? 'bg-indigo-500 text-white' : 'text-gray-100'
                        )}
                      >
                        Log Out
                      </button>
                    )}
                  </Menu.Item>
                </>
              ) : (
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      to={routes.auth()}
                      className={clsx(
                        'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                        active ? 'bg-indigo-500 text-white' : 'text-gray-100'
                      )}
                    >
                      Sign In
                    </Link>
                  )}
                </Menu.Item>
              )}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
}

export default ProfileIcon
