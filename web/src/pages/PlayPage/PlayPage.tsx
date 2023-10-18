import { Fragment, useState } from 'react'

import { Transition } from '@headlessui/react'
import { PAGINATION_COUNTS } from '@infinity-keys/constants'

import RewardablesCell from 'src/components/RewardablesCell'
import Seo from 'src/components/Seo/Seo'

export enum AlphaModalStatus {
  Hidden = 'HIDDEN',
}

const PlayPage = ({ count, page }: { count?: number; page?: number }) => {
  const [isHidden, setIsHidden] = useState(true)
  const [smallestThumbnailCount] = PAGINATION_COUNTS
  const perPage = count ?? smallestThumbnailCount
  const pageNum = page ?? 1

  return (
    <>
      <Seo title="Play" />
      <RewardablesCell
        count={perPage}
        page={pageNum}
        types={['PACK', 'PUZZLE']}
        sortType="FEATURED"
        landingRoute={'PLAY'}
      />

      <Transition appear show={!isHidden} as={Fragment}>
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
          <div className="flex min-h-full items-center justify-center p-8 pt-12 text-center text-gray-100">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            ></Transition.Child>
          </div>
        </div>
      </Transition>
    </>
  )
}

export default PlayPage
