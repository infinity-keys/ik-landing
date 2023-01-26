import { buildUrlString, cloudinaryUrl } from '@infinity-keys/core'
import { LensShareButton } from '@infinity-keys/react-lens-share-button'
import type { FindRewardablePuzzleBySlug } from 'types/graphql'

import { useParams } from '@redwoodjs/router'

import RewardableHeader from 'src/components/RewardableHeader/RewardableHeader'
import Seo from 'src/components/Seo/Seo'
import StepsCell from 'src/components/StepsCell'
import TwitterShare from 'src/components/TwitterShare/TwitterShare'
import '@infinity-keys/react-lens-share-button/dist/style.css'

interface Props {
  rewardable: NonNullable<FindRewardablePuzzleBySlug['puzzle']>
}

const Rewardable = ({ rewardable }: Props) => {
  const { step: stepParam } = useParams()
  const stepNum = stepParam && parseInt(stepParam, 10)
  const stepIndex = stepNum && stepNum - 1

  return (
    <>
      <Seo
        title={rewardable.name}
        description={`Can you unlock the ${rewardable.name} puzzle?`}
        imageUrl={
          rewardable.nfts[0]?.cloudinaryId &&
          cloudinaryUrl(rewardable.nfts[0]?.cloudinaryId, 500, 500, false, 1)
        }
        url={buildUrlString(`/puzzle/${rewardable.slug}`)}
      />

      <div className="puzzle__main w-full px-4 text-center">
        <RewardableHeader
          name={rewardable.name}
          instructions={rewardable.explanation}
          cloudinaryId={rewardable.nfts[0]?.cloudinaryId}
          currentStep={stepParam}
        />

        <StepsCell
          stepId={stepParam && rewardable.puzzle.steps[stepIndex].id}
          puzzleId={rewardable.puzzle.id}
          stepNum={stepNum && stepNum}
        />
      </div>

      <div className="flex justify-center gap-4 px-4 pb-9 pt-8">
        <LensShareButton
          postBody={`Can you unlock the ${rewardable.name} puzzle?`}
          url={buildUrlString(`/puzzle/${rewardable.slug}`)}
          className="text-sm font-medium"
        />
        <TwitterShare
          tweetBody={`Can you unlock the ${
            rewardable.name
          } puzzle? @InfinityKeys\n\n${buildUrlString(
            `/puzzle/${rewardable.slug}`
          )}`}
        />
      </div>
    </>
  )
}

export default Rewardable
