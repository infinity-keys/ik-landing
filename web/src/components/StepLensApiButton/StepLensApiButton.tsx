import { useState } from 'react'

import { useActiveProfile } from '@lens-protocol/react-web'
import { useConnectModal } from '@rainbow-me/rainbowkit'
import { FindStepQuery } from 'types/graphql'
import { useAccount } from 'wagmi'

import Alert from 'src/components/Alert/Alert'
import Button from 'src/components/Button/Button'
import LensConnect from 'src/components/LensConnect/LensConnect'
import LoadingIcon from 'src/components/LoadingIcon/LoadingIcon'
import Markdown from 'src/components/Markdown/Markdown'
import useMakeAttempt from 'src/hooks/useMakeAttempt'

const StepLensApiButton = ({
  step,
  puzzleId,
}: {
  step: FindStepQuery['step']
  puzzleId: string
}) => {
  const { address } = useAccount()
  const { openConnectModal } = useConnectModal()
  const { loading, failedAttempt, errorMessage, makeAttempt } = useMakeAttempt()
  const { data: lensProfile } = useActiveProfile()
  const [customErrorMessage, setCustomErrorMessage] = useState('')

  const handleClick = async () => {
    setCustomErrorMessage('')

    if (!step?.id) return setCustomErrorMessage('Missing step id')
    if (!lensProfile?.id)
      return setCustomErrorMessage('Please connect your Lens profile')

    await makeAttempt({
      stepId: step.id,
      puzzleId,
      reqBody: {
        type: 'lens-check',
        account: address,
        lensId: lensProfile.id,
      },
    })
  }

  return (
    <div>
      {loading ? (
        <LoadingIcon />
      ) : (
        <div>
          {address && lensProfile?.id ? (
            <Button text="Check Wallet" onClick={handleClick} />
          ) : !address ? (
            <div className="flex flex-col items-center justify-center gap-4">
              <Alert text="Please connect your wallet to continue" />
              <Button text="Connect Wallet" onClick={openConnectModal} />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-4">
              <Alert text="Please connect your Lens profile to continue" />
              <LensConnect />
            </div>
          )}

          {(errorMessage || customErrorMessage) && (
            <p className="mt-4 italic text-gray-200">
              {errorMessage || customErrorMessage}
            </p>
          )}

          {failedAttempt && !errorMessage && (
            <div
              className={'relative flex justify-center pt-6 text-gray-150'}
              data-cy="fail_message_check"
            >
              <Markdown>
                {step?.failMessage ||
                  'This wallet address has not completed the required action. Need help? [Join our discord](https://discord.gg/infinitykeys)'}
              </Markdown>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default StepLensApiButton
