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

  const handleClick = async () => {
    if (!address) return

    const reqBody = {
      chainId: step.stepNftCheck?.chainId,
      tokenId: step.stepNftCheck?.tokenId,
      contractAddress: step.stepNftCheck?.contractAddress,
      account: address,
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
