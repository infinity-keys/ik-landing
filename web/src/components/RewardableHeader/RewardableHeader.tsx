import CloudImage from 'src/components/CloudImage/CloudImage'
import Heading from 'src/components/Heading/Heading'
import Markdown from 'src/components/Markdown/Markdown'

interface RewardableHeaderProps {
  name: string
  currentStep?: string
  instructions?: string
  cloudinaryId?: string
}

const RewardableHeader = ({
  name,
  currentStep,
  instructions,
  cloudinaryId,
}: RewardableHeaderProps) => {
  return (
    <div className="mx-auto max-w-prose pb-12">
      {cloudinaryId && !currentStep && (
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

      {instructions && !currentStep && (
        <div className="pack__text pt-4 text-lg">
          <Markdown>{instructions}</Markdown>
        </div>
      )}
    </div>
  )
}

export default RewardableHeader
