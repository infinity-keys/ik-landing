import ShieldExclamationIcon from '@heroicons/react/24/outline/ShieldExclamationIcon'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import clsx from 'clsx'

import Button from 'src/components/Button/Button'
import useCurrentWidth from 'src/hooks/useCurrentWidth'

const BREAK_POINT = 1024

export default function WalletButton() {
  const width = useCurrentWidth()
  const isSmall = width < BREAK_POINT

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
                    onClick={() => {
                      if (window.Buffer) {
                        openConnectModal()
                      } else {
                        import('buffer').then((buffer) => {
                          window.Buffer = buffer.Buffer
                          openConnectModal()
                        })
                      }
                    }}
                    type="button"
                    size="small"
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
                    border={false}
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
                    text={chain.name || 'Unknown'}
                    size="small"
                    border={false}
                  >
                    {chain.hasIcon && (
                      <div
                        className={clsx('mr-2 flex shrink-0', {
                          'mr-4': !isSmall,
                        })}
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
                    text={account.displayName}
                    onClick={openAccountModal}
                    type="button"
                    variant="faded"
                    size="small"
                    border={false}
                  />
                </div>
              )
            })()}
          </div>
        )
      }}
    </ConnectButton.Custom>
  )
}
