import { useAccount } from 'wagmi'
import { FindStepQuery } from 'types/graphql'

import Alert from 'src/components/Alert/Alert'
import Button from 'src/components/Button/Button'
import LoadingIcon from 'src/components/LoadingIcon/LoadingIcon'
import Markdown from 'src/components/Markdown/Markdown'
import useMakeAttempt from 'src/hooks/useMakeAttempt'

const TokenIdRangeButton = ({
  step,
  puzzleId,
}: {
  step: FindStepQuery['step']
  puzzleId: string
}) => {
  const { address } = useAccount()
  const { loading, failedAttempt, errorMessage, makeAttempt } = useMakeAttempt()

  const handleClick = async () => {
    await makeAttempt({
      stepId: step.id,
      puzzleId,
      reqBody: {
        type: 'token-id-range',
        tokenIdRangeSolution: {
          account: address,
        },
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
            <div className="flex justify-center">
              <Alert text="Please connect your wallet to continue" />
            </div>
          )}

          {errorMessage && (
            <p className="mt-4 italic text-gray-200">{errorMessage}</p>
          )}

          {failedAttempt && !errorMessage && (
            <div
              className={'relative flex justify-center pt-6 text-gray-150'}
              data-cy="fail_message_check"
            >
              <Markdown>
                {step.failMessage ||
                  'This wallet address does not have the required NFT. Need help? [Join our discord](https://discord.gg/infinitykeys)'}
              </Markdown>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default TokenIdRangeButton