import { Fragment, PropsWithChildren } from 'react'

import { Tab } from '@headlessui/react'
import clsx from 'clsx'

const TabLabel = ({ children }: PropsWithChildren) => {
  return (
    <Tab as={Fragment}>
      {({ selected }) => (
        <button
          className={clsx(
            'border-b-2',
            selected ? 'border-brand-accent-primary' : 'border-transparent'
          )}
        >
          {children}
        </button>
      )}
    </Tab>
  )
}

export default TabLabel
