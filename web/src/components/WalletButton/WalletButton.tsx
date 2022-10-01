import { useEffect, useState } from 'react'

import ShieldExclamationIcon from '@heroicons/react/24/outline/ShieldExclamationIcon'
import WalletIcon from '@heroicons/react/24/outline/WalletIcon'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import clsx from 'clsx'

import Button from 'src/components/Button/Button'
import useCurrentWidth from 'src/hooks/useCurrentWidth'

const MAGIC_WIDTH = 768

export default function WalletButton() {
  const [isSmall, setIsSmall] = useState<boolean>(false)
  const width = useCurrentWidth()

  useEffect(() => {
    if (width < MAGIC_WIDTH) {
      setIsSmall(true)
    } else {
      setIsSmall(false)
    }
  }, [width, setIsSmall])

  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        // Note: If your app doesn't use authentication, you
        // can remove all 'authenticationStatus' checks
        const ready = mounted && authenticationStatus !== 'loading'
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === 'authenticated')

        return (
          <div
            {...(!ready && {
              'aria-hidden': true,
              className: 'opacity-0 pointer-events-none select-none',
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <Button
                    text={isSmall ? 'Connect' : 'Connect Wallet'}
                    onClick={openConnectModal}
                    type="button"
                    responsive
                  />
                )
              }
              if (chain.unsupported) {
                return (
                  <Button
                    text={isSmall ? '' : 'Wrong Network'}
                    onClick={openChainModal}
                    type="button"
                    variant={isSmall ? 'faded' : 'solid'}
                  >
                    {isSmall && (
                      <ShieldExclamationIcon className="h-8 w-8 fill-transparent stroke-red-600" />
                    )}
                  </Button>
                )
              }
              return (
                <div className="flex gap-2">
                  <Button
                    onClick={openChainModal}
                    type="button"
                    variant="faded"
                    text={isSmall ? '' : chain.name || 'Unknown'}
                    responsive
                  >
                    {chain.hasIcon && (
                      <div
                        className={clsx('flex shrink-0', { 'mr-4': !isSmall })}
                      >
                        {chain.iconUrl && (
                          <img
                            width={24}
                            height={24}
                            alt={`${chain.name} icon` ?? 'Chain icon'}
                            src={chain.iconUrl}
                          />
                        )}
                      </div>
                    )}
                  </Button>
                  <Button
                    text={isSmall ? '' : account.displayName}
                    onClick={openAccountModal}
                    type="button"
                    variant="faded"
                    responsive
                  >
                    {isSmall && (
                      <WalletIcon className="h-7 w-7 fill-transparent" />
                    )}
                  </Button>
                </div>
              )
            })()}
          </div>
        )
      }}
    </ConnectButton.Custom>
  )
}
