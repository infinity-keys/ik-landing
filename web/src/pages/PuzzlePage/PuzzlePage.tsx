import {
  buildUrlString,
  ThumbnailGridLayoutType,
  ThumbnailProgress,
} from '@infinity-keys/core'
import { LensShareButton } from '@infinity-keys/react-lens-share-button'

import CloudImage from 'src/components/CloudImage/CloudImage'
import Heading from 'src/components/Heading/Heading'
import Markdown from 'src/components/Markdown/Markdown'
import Seo from 'src/components/Seo/Seo'
import Thumbnail from 'src/components/Thumbnail/Thumbnail'
import TwitterShare from 'src/components/TwitterShare/TwitterShare'
import Wrapper from 'src/components/Wrapper/Wrapper'
import useCurrentWidth from 'src/hooks/useCurrentWidth'
import '@infinity-keys/react-lens-share-button/dist/style.css'

const title = 'Puzzle Name'
const instructions =
  '*Intructions* This is some markdown **bold** but it is a little longer than the other. We should start wrapping sometime soon.'
const url = '/puzzle'
const cloudinary_id = 'ik-alpha-trophies/Map-04_xzczep'

const puzzles = [
  { did: '1', step: 1, name: 'Step', url: '/step' },
  { id: '2', step: 2, name: 'Step 2', url: '/step' },
  { id: '3', step: 3, name: 'Step 3', url: '/step' },
  { id: '4', step: 4, name: 'Step 4', url: '/step' },
  { id: '5', step: 5, name: 'Step 5', url: '/step' },
]
const currentStep = 3

const PuzzlePage = () => {
  const width = useCurrentWidth()
  const layout =
    width < 640 ? ThumbnailGridLayoutType.List : ThumbnailGridLayoutType.Grid

  return (
    <Wrapper>
      <Seo
        title={title}
        description={`Can you unlock the ${title} puzzle?`}
        // imageUrl={cloudinaryId && cloudinaryUrl(cloudinaryId, 500, 500, false)}
        // url={asPath}
      />

      <main className="puzzle__main w-full px-4 pt-10 text-center md:pt-20">
        <div className="flex justify-center pb-8">
          <div className="rounded-md bg-black/20 p-2">
            <CloudImage
              height={240}
              width={240}
              id={cloudinary_id}
              circle={false}
            />
          </div>
        </div>
        <div className="mx-auto max-w-prose pb-12">
          <Heading as="h1">{title}</Heading>
          <div className="pt-4 text-lg">
            <Markdown>{instructions}</Markdown>
          </div>
        </div>

        <ul className="align-stretch mx-auto my-10 flex flex-wrap justify-center gap-6 py-8 sm:mt-6 sm:max-w-none">
          {puzzles.map((data) => {
            // const data = thumbnailData(puzzle)
            return (
              <li
                key={data.id}
                className="w-full max-w-[20rem] sm:max-w-[15rem]"
              >
                <Thumbnail
                  isGrid={layout === ThumbnailGridLayoutType.Grid}
                  id={data.id}
                  name={data.name}
                  url={data.url}
                  // cloudinary_id={data.cloudinary_id}
                  progress={
                    data.step === currentStep
                      ? ThumbnailProgress.Current
                      : data.step < currentStep
                      ? ThumbnailProgress.Completed
                      : ThumbnailProgress.NotCompleted
                  }
                />
              </li>
            )
          })}
        </ul>
      </main>

      <div className="flex justify-center gap-4 px-4 pb-9 pt-8">
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

export default PuzzlePage
