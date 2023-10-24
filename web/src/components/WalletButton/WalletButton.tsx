import ShieldExclamationIcon from '@heroicons/react/24/outline/ShieldExclamationIcon'
import { ConnectButton } from '@rainbow-me/rainbowkit'

import Button from 'src/components/Button/Button'

export default function WalletButton({
  size = 'medium',
}: {
  size?: 'small' | 'medium' | 'large'
}) {
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
                    size={size}
                    round
                  >
                    Connect
                  </Button>
                )
              }
              if (chain.unsupported) {
                return (
                  <Button
                    onClick={openChainModal}
                    type="button"
                    round
                    size={size}
                  >
                    <ShieldExclamationIcon className="h-6 w-12 fill-transparent stroke-red-600" />
                  </Button>
                )
              }
              return (
                <div className="flex gap-2">
                  <Button
                    onClick={openAccountModal}
                    type="button"
                    round
                    size={size}
                  >
                    {account.displayName}
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
