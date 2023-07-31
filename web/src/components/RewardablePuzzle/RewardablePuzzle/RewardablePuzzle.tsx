import { useState } from 'react'

import { Transition } from '@headlessui/react'
import ClockIcon from '@heroicons/react/24/outline/ClockIcon'
import LightBulbIcon from '@heroicons/react/24/outline/LightBulbIcon'
import XCircleIcon from '@heroicons/react/24/outline/XCircleIcon'
import { buildUrlString } from '@infinity-keys/core'
import type { FindRewardablePuzzleBySlug } from 'types/graphql'

import { useAuth } from 'src/auth'
import Alert from 'src/components/Alert/Alert'
import Button from 'src/components/Button'
import Seo from 'src/components/Seo/Seo'
import { rewardableLandingRoute } from 'src/lib/urlBuilders'

import '@infinity-keys/react-lens-share-button/dist/style.css'

interface Props {
  rewardable: FindRewardablePuzzleBySlug['rewardable']
}

const iconData = [
  {
    label: 'Lens Account',
    icon: <LightBulbIcon className="h-10 w-10 fill-transparent" />,
  },
  {
    label: 'Patience',
    icon: <ClockIcon className="h-10 w-10 fill-transparent stroke-1" />,
  },
  {
    label: 'Wallet',
    icon: <LightBulbIcon className="h-10 w-10 fill-transparent" />,
  },
]

const Rewardable = ({ rewardable }: Props) => {
  const { isAuthenticated } = useAuth()
  const [showOverlay, setShowOverlay] = useState(false)
  const [currentOverlayContent, setCurrentOverlayContent] = useState(0)

  if (!rewardable?.puzzle) {
    return null
  }

  // the full https url to this page
  const url = buildUrlString(
    rewardableLandingRoute({
      slug: rewardable.slug,
      type: 'PUZZLE',
    })
  )

  return (
    <>
      <Seo
        title={rewardable.name}
        description={`Can you unlock the ${rewardable.name} puzzle?`}
        imageUrl={rewardable.puzzle.coverImage}
        url={url}
      />

      <div className="mx-auto flex max-w-lg flex-col justify-center pb-8 md:max-w-5xl md:flex-row md:gap-6 md:px-4 ">
        <div className="relative aspect-[4/3] w-full flex-1 overflow-hidden md:max-w-[50%]">
          <div className="absolute inset-0 flex items-center justify-center">
            <img className="w-full" src={rewardable.puzzle.coverImage} alt="" />
          </div>
        </div>
        <div className="relative flex w-full flex-1 flex-col gap-4 text-center md:max-w-[50%]">
          <div className="flex-1 border-y-2 border-stone-50">
            <div className="relative h-full">
              <div className="flex h-full flex-col justify-center gap-12 px-12 py-20">
                {isAuthenticated ? (
                  <>
                    <div className="markdown">
                      <p className="mb-4 font-bold">Get Ready!</p>
                      <p>Check the items below before you jump in.</p>
                    </div>

                    <div className="relative grid grid-cols-3 gap-4">
                      {iconData.map(({ label, icon }, index) => (
                        <button
                          key={label}
                          onClick={() => {
                            setCurrentOverlayContent(index)
                            setShowOverlay(true)
                          }}
                          className="flex flex-col items-center justify-center transition-opacity hover:opacity-60"
                        >
                          <span className="block">{icon}</span>
                          {label}
                        </button>
                      ))}
                    </div>
                  </>
                ) : (
                  <div>
                    <div className="flex justify-center">
                      <Alert text="Must be logged in to play." />
                    </div>
                  </div>
                )}
              </div>

              <Transition
                show={showOverlay}
                enter="transition-opacity duration-75"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity duration-150"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="absolute top-0 flex h-full w-full items-center justify-center bg-stone-700 text-center">
                  <div className="flex flex-col items-center px-12 py-20">
                    {iconData[currentOverlayContent].icon}
                    <p className="mt-2 mb-4">
                      {iconData[currentOverlayContent].label}
                    </p>
                    <p>
                      Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                      Temporibus totam animi nihil alias unde?
                    </p>
                  </div>
                  <button
                    onClick={() => setShowOverlay(false)}
                    type="button"
                    className="absolute top-4 right-4 transition-colors hover:text-brand-accent-secondary"
                  >
                    <XCircleIcon className="h-7 w-7 fill-transparent" />
                  </button>
                </div>
              </Transition>
            </div>
          </div>

          <div>
            {isAuthenticated ? (
              showOverlay ? (
                <Button text="Ask on Discord" />
              ) : (
                <Button text="Start Quest" />
              )
            ) : (
              <Button text="Login" />
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Rewardable
