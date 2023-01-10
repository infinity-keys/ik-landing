import { buildUrlString } from '@infinity-keys/core'
import { LensShareButton } from '@infinity-keys/react-lens-share-button'
import type { FindRewardablePuzzleBySlug } from 'types/graphql'

import {
  useParams,
  // useParams
} from '@redwoodjs/router'

import PuzzleHeader from 'src/components/PuzzleHeader/PuzzleHeader'
import Seo from 'src/components/Seo/Seo'
import StepCell from 'src/components/StepCell'
import TwitterShare from 'src/components/TwitterShare/TwitterShare'
import Wrapper from 'src/components/Wrapper/Wrapper'
import '@infinity-keys/react-lens-share-button/dist/style.css'

interface Props {
  rewardable: NonNullable<FindRewardablePuzzleBySlug['puzzle']>
}

const url = '/puzzle'
const cloudinary_id = 'ik-alpha-trophies/Map-04_xzczep'

const Rewardable = ({ rewardable }: Props) => {
  const { step: stepParam } = useParams()
  const stepIndex = stepParam && parseInt(stepParam, 10) - 1

  return (
    <Wrapper full fullHeight>
      <Seo
        title={rewardable.name}
        description={`Can you unlock the ${rewardable.name} puzzle?`}
        // imageUrl={cloudinaryId && cloudinaryUrl(cloudinaryId, 500, 500, false)}
        // url={asPath}
      />

      <main className="puzzle__main w-full px-4 pt-10 text-center md:pt-20">
        <PuzzleHeader
          name={rewardable.name}
          instructions={rewardable.explanation}
          cloudinaryId={cloudinary_id}
        />

        <StepCell
          stepId={stepParam && rewardable.puzzle.steps[stepIndex].id}
          puzzleId={rewardable.puzzle.id}
        />
      </main>

      <div className="flex justify-center gap-4 px-4 pb-9 pt-8">
        <LensShareButton
          postBody={`Can you unlock the ${rewardable.name} puzzle?`}
          url={buildUrlString(rewardable.slug)}
          className="text-sm font-medium"
        />
        <TwitterShare
          tweetBody={`Can you unlock the ${
            rewardable.name
          } puzzle? @InfinityKeys\n\n${buildUrlString(url)}`}
        />
      </div>
    </Wrapper>
  )
}

export default Rewardable
