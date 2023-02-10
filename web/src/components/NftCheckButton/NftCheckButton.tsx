import clsx from 'clsx'
import { FindStepQuery } from 'types/graphql'
import { useAccount } from 'wagmi'

import Button from 'src/components/Button/Button'
import LoadingIcon from 'src/components/LoadingIcon/LoadingIcon'
import useMakeAttempt from 'src/hooks/useMakeAttempt'

import Alert from '../Alert/Alert'
import Markdown from '../Markdown'

const NftCheckButton = ({
  step,
  puzzleId,
}: {
  step: FindStepQuery['step']
  puzzleId: string
}) => {
  const { address } = useAccount()
  const { loading, failedAttempt, errorMessage, makeAttempt } = useMakeAttempt()
  const { chainId, tokenId, contractAddress, poapEventId } = step.stepNftCheck

  const handleClick = async () => {
    const reqBody = {
      account: address,
      ...(chainId && { chainId }),
      ...(typeof tokenId === 'number' && { tokenId }),
      ...(contractAddress && { contractAddress }),
      ...(poapEventId && { poapEventId }),
    }

    await makeAttempt({
      stepId: step.id,
      puzzleId,
      reqBody,
    })
  }

  return (
    <div>
      {loading ? (
        <LoadingIcon />
      ) : (
        <div>
          {address ? (
            <Button text="Check NFTs" onClick={handleClick} />
          ) : (
            <div className="flex justify-center">
              <Alert text="Please connect your wallet to continue" />
            </div>
          )}

          {errorMessage && (
            <p className="mt-4 italic text-gray-200">{errorMessage}</p>
          )}

          <div
            className={clsx(
              'relative flex justify-center pt-6 text-gray-150',
              failedAttempt && !errorMessage ? 'opacity-1' : 'opacity-0'
            )}
            data-cy="fail_message_check"
          >
            <Markdown>
              {step.failMessage ||
                'Thats not it. Need help? [Join our discord](https://discord.gg/infinitykeys)'}
            </Markdown>
          </div>
        </div>
      )}
    </div>
  )
}

export default NftCheckButton
