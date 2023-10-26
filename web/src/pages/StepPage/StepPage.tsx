import StepCell from 'src/components/StepCell'

const StepPage = ({ slug, step }: { slug: string; step: number }) => {
  return (
    <>
      <StepCell slug={slug} stepNum={step} />
    </>
  )
}

export default StepPage
