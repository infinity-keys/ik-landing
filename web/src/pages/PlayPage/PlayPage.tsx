import { Fragment, useEffect, useState } from 'react'

import { Dialog, Transition } from '@headlessui/react'
import XMarkIcon from '@heroicons/react/24/outline/XMarkIcon'
import { PAGINATION_COUNTS } from '@infinity-keys/constants'

import Button from 'src/components/Button'
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

  function closeModal() {
    setIsHidden(true)
    window.localStorage.setItem('alphaModal', AlphaModalStatus.Hidden)
  }

  useEffect(() => {
    const alphaModal = window.localStorage.getItem('alphaModal')
    setIsHidden(alphaModal === AlphaModalStatus.Hidden)
  }, [])

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
        <Dialog as="div" className="relative z-30" onClose={closeModal}>
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
              >
                <Dialog.Panel className="w-full max-w-2xl transform transition-all">
                  <div className="relative rounded-lg border-2 border-brand-accent-primary/20 bg-brand-gray-primary text-left align-middle">
                    <div className="p-4 lg:p-8">
                      <p className="mb-8 text-center text-2xl font-bold text-white">
                        Infinity Keys
                        <br />
                        <span className="text-lg">(alpha version)</span>
                      </p>
                      <p className="mb-4">
                        Infinity Keys is gaming infrastructure for user-created
                        missions that link to analog or digital experiences.
                      </p>
                      <p className="mb-4">
                        Solve the puzzles to sample games built with Infinity
                        Keys backend technology.
                      </p>
                      <p>
                        Stay connected for product updates, promotions, and
                        information about Infinity Keys tokens and experiences.
                      </p>

                      <div className="mx-auto max-w-[250px] pt-12">
                        <Button
                          fullWidth
                          text="Play Now"
                          onClick={closeModal}
                        />
                      </div>

                      <div className="mt-8 flex flex-col items-center justify-between gap-4 text-center text-sm text-brand-accent-secondary sm:flex-row">
                        <a
                          href="https://twitter.com/InfinityKeys"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block flex-1 rounded bg-white/10 py-2 px-4 transition-colors hover:text-white"
                        >
                          Follow Us on Twitter
                        </a>
                        <a
                          href="https://discord.gg/infinitykeys"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block flex-1 rounded bg-white/10 py-2 px-4 transition-colors hover:text-white"
                        >
                          Join our Discord
                        </a>
                        <a
                          href="https://docs.infinitykeys.io/infinity-keys-docs/gameplay/how-to-play"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block flex-1 rounded bg-white/10 py-2 px-4 transition-colors hover:text-white"
                        >
                          Docs
                        </a>
                      </div>
                    </div>

                    <button
                      onClick={closeModal}
                      type="button"
                      className="absolute left-full top-0 flex h-10 w-10 -translate-y-1/2 -translate-x-1/2 items-center justify-center rounded-full border-2 border-brand-accent-primary/20 bg-brand-gray-primary"
                    >
                      <XMarkIcon className="h-5 w-5" />
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export default PlayPage
