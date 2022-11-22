import { buildUrlString } from '@infinity-keys/core'
import { LensShareButton } from '@infinity-keys/react-lens-share-button'

import CollapsibleMarkdown from 'src/components/CollapsibleMarkdown/CollapsibleMarkdown'
import Heading from 'src/components/Heading/Heading'
import Markdown from 'src/components/Markdown/Markdown'
import Puzzle from 'src/components/Puzzle/Puzzle'
import Seo from 'src/components/Seo/Seo'
import ThumbnailMini from 'src/components/ThumbnailMini/ThumbnailMini'
import TwitterShare from 'src/components/TwitterShare/TwitterShare'
import Wrapper from 'src/components/Wrapper/Wrapper'

import '@infinity-keys/react-lens-share-button/dist/style.css'

// @TODO: remove and replace
const steps = [
  { name: 'Step One', step: 1 },
  { name: 'Step Two with a longer name', step: 2 },
  { name: 'Step Threeeee', step: 3 },
  { name: 'Step Four', step: 4 },
  { name: 'The Penultimate', step: 5 },
  { name: 'Six', step: 6 },
]

const title = 'Puzzle Name'
const currentStep = 3
const instructions =
  '*Intructions* This is some markdown **bold** but it is a little longer than the other. We should start wrapping sometime soon.'
const challenge = 'This is some markdown **bold**'
const url = '/step'

const StepPage = () => {
  return (
    <Wrapper full>
      <Seo
        title={title}
        description={`Can you unlock the ${title} puzzle?`}
        // imageUrl={cloudinaryId && cloudinaryUrl(cloudinaryId, 500, 500, false)}
        // url={asPath}
      />

      <main className="puzzle__main w-full px-4 pt-10 text-center md:pt-20">
        <div className="mx-auto max-w-prose pb-12">
          <Heading as="h1">
            {title} - {currentStep}
          </Heading>
          <div className="pt-4 text-lg">
            <Markdown>{instructions}</Markdown>
          </div>
        </div>

        <Puzzle puzzleId={'puzzleId'} count={5} />

        <div className="mx-auto mt-12 mb-12 max-w-prose bg-black/10 p-4 md:mt-16 md:mb-20">
          {challenge && (
            <CollapsibleMarkdown
              title="Challenge"
              content={challenge}
              defaultOpen
            />
          )}
        </div>

        {steps.length > 1 && (
          <div>
            <p className="mb-8 text-4xl font-bold uppercase opacity-90">
              Puzzle Name Steps
            </p>
            <div className="flex-cols flex flex-wrap justify-center gap-4 pb-12 sm:flex-row md:pb-20">
              {steps.map(({ name, step }) => (
                <ThumbnailMini
                  key={name}
                  name={name}
                  step={step}
                  currentStep={currentStep}
                />
              ))}
            </div>
          </div>
        )}
      </main>

      <div className="mb-9 flex justify-center gap-4 px-4">
        <LensShareButton
          postBody={`Can you unlock the ${name} puzzle?`}
          url={buildUrlString(url)}
          className="text-sm font-medium"
        />
        <TwitterShare
          tweetBody={`Can you unlock the ${name} puzzle? @InfinityKeys\n\n${buildUrlString(
            url
          )}`}
        />
      </div>
    </Wrapper>
  )
}

export default StepPage
