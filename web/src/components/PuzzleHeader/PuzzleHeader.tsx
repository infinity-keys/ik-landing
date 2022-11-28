import Heading from 'src/components/Heading/Heading'
import Markdown from 'src/components/Markdown/Markdown'

interface PuzzleHeaderProps {
  name: string
  currentStep?: number
  instructions?: string
}

const PuzzleHeader = ({
  name,
  currentStep,
  instructions,
}: PuzzleHeaderProps) => {
  return (
    <div className="mx-auto max-w-prose pb-12">
      <Heading as="h1">
        {name} {currentStep && `- ${currentStep}`}
      </Heading>

      {instructions && (
        <div className="pt-4 text-lg">
          <Markdown>{instructions}</Markdown>
        </div>
      )}
    </div>
  )
}

export default PuzzleHeader
