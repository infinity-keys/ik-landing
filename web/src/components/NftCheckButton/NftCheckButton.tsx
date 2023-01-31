import clsx from 'clsx'
import { FindStepQuery } from 'types/graphql'
import { useAccount } from 'wagmi'

import Button from 'src/components/Button/Button'
import LoadingIcon from 'src/components/LoadingIcon/LoadingIcon'
import UseMakeAttempt from 'src/hooks/useMakeAttempt'

import Markdown from '../Markdown'

const NftCheckButton = ({
  step,
  puzzleId,
  numberOfSteps,
}: {
  step: FindStepQuery['step']
  puzzleId: string
  numberOfSteps: number
}) => {
  const { address } = useAccount()
  const { loading, failedAttempt, makeAttempt } = UseMakeAttempt()
  const { chainId, tokenId, contractAddress, poapEventId } = step.stepNftCheck

  const handleClick = async () => {
    if (!address) return

    const reqBody = {
      account: address,
      ...(chainId && { chainId }),
      ...(tokenId && { tokenId }),
      ...(contractAddress && { contractAddress }),
      ...(poapEventId && { poapEventId }),
    }

    await makeAttempt({
      stepId: step.id,
      stepType: step.type,
      numberOfSteps,
      puzzleId,
      reqBody,
    })
  }

  return (
    <div>
      {loading ? (
        <LoadingIcon />
      ) : (
        <>
          <Button text="Check NFTs" onClick={handleClick} />

          <div
            className={clsx(
              'relative flex justify-center pt-6 text-gray-150',
              failedAttempt ? 'opacity-1' : 'opacity-0'
            )}
            data-cy="fail_message_check"
          >
            <Markdown>
              {step.failMessage ||
                'Thats not it. Need help? [Join our discord](https://discord.gg/infinitykeys)'}
            </Markdown>
          </div>
        </>
      )}
    </div>
  )
}

export default NftCheckButton
