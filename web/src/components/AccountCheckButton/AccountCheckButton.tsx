import { useState } from 'react'

import { FindStepQuery } from 'types/graphql'
import { useAccount } from 'wagmi'

import Button from 'src/components/Button/Button'
import LoadingIcon from 'src/components/LoadingIcon/LoadingIcon'
import Markdown from 'src/components/Markdown/Markdown'
import WalletButton from 'src/components/WalletButton/WalletButton'
import useMakeAttempt from 'src/hooks/useMakeAttempt'

const AccountCheckButton = ({
  step,
  puzzleId,
}: {
  step: FindStepQuery['step']
  puzzleId: string
}) => {
  const { address } = useAccount()
  const { loading, failedAttempt, errorMessage, makeAttempt } = useMakeAttempt()
  const [customErrorMessage, setCustomErrorMessage] = useState('')

  const handleClick = async () => {
    setCustomErrorMessage('')
    if (!step?.id) return setCustomErrorMessage('Missing step id')

    await makeAttempt({
      stepId: step.id,
      puzzleId,
      reqBody: {
        type: 'account-check',
        account: address,
      },
    })
  }

  return (
    <div>
      {loading ? (
        <LoadingIcon />
      ) : (
        <div>
          {address ? (
            <Button text="Check Wallet" onClick={handleClick} />
          ) : (
            <WalletButton />
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

export default AccountCheckButton
