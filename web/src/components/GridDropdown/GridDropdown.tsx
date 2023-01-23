import { Fragment, forwardRef, HTMLProps } from 'react'

import { Menu, Transition } from '@headlessui/react'
import ChevronDownIcon from '@heroicons/react/20/solid/ChevronDownIcon'
import { PAGINATION_COUNTS } from '@infinity-keys/constants'
import clsx from 'clsx'

import { Link } from '@redwoodjs/router'

interface GridDropdownProps {
  currentCount: number
  urlBase: string
}

interface GridDropdownLinkProps extends HTMLProps<HTMLAnchorElement> {
  href: string
}

// required for close on select with Next Link in Menu dropdown
const DropdownLink = forwardRef<HTMLAnchorElement, GridDropdownLinkProps>(
  (props, ref) => {
    const { href, children, ...rest } = props
    return (
      <Link to={href}>
        <a ref={ref} {...rest}>
          {children}
        </a>
      </Link>
    )
  }
)

DropdownLink.displayName = 'DropdownLink'

const GridDropdown = ({ currentCount, urlBase }: GridDropdownProps) => {
  return (
    <Menu as="div" className="relative z-10 ml-5 inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full justify-center rounded-md border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium shadow-sm hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-turquoise focus:ring-offset-2 focus:ring-offset-gray-100">
          {currentCount}
          <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
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
        <Menu.Items className="absolute right-0 mt-2 w-full origin-top-right overflow-hidden rounded-md border border-white/20 bg-blue text-right shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="">
            {PAGINATION_COUNTS.map((count) => {
              const selectedCount = currentCount === count
              const [smallestThumbnailCount] = PAGINATION_COUNTS

              return (
                <Menu.Item key={count} disabled={selectedCount}>
                  {({ active }) => (
                    <DropdownLink
                      href={
                        count === smallestThumbnailCount
                          ? urlBase
                          : `${urlBase}/${count}/1`
                      }
                      style={{
                        pointerEvents: selectedCount ? 'none' : 'auto',
                      }}
                      className={clsx(
                        {
                          'bg-turquoise font-medium': selectedCount,
                          'bg-indigo-500': active,
                        },
                        'block px-4 py-4 text-sm hover:bg-indigo-500 md:py-2'
                      )}
                    >
                      {count}
                    </DropdownLink>
                  )}
                </Menu.Item>
              )
            })}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

export default GridDropdown