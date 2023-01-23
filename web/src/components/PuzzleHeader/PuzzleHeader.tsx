import CloudImage from 'src/components/CloudImage/CloudImage'
import Heading from 'src/components/Heading/Heading'
import Markdown from 'src/components/Markdown/Markdown'

interface PuzzleHeaderProps {
  name: string
  currentStep?: number
  instructions?: string
  cloudinaryId?: string
}

const PuzzleHeader = ({
  name,
  currentStep,
  instructions,
  cloudinaryId,
}: PuzzleHeaderProps) => {
  return (
    <div className="mx-auto max-w-prose pb-12">
      {cloudinaryId && (
        <div className="flex justify-center pb-8">
          <div className="rounded-md bg-black/20 p-2">
            <CloudImage
              height={240}
              width={240}
              id={cloudinaryId}
              circle={false}
            />
          </div>
        </div>
      )}

      <Heading as="h1">
        {name} {currentStep && `- ${currentStep}`}
      </Heading>

      {instructions && (
        <div className="pack__text pt-4 text-lg">
          <Markdown>{instructions}</Markdown>
        </div>
      )}
    </div>
  )
}

export default PuzzleHeader
