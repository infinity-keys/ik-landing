import EditRewardableCell from 'src/components/EditRewardableCell'
import Seo from 'src/components/Seo/Seo'

const EditPuzzleFormPage = ({ slug }: { slug: string }) => {
  return (
    <>
      <Seo title="Edit your puzzle" />
      <EditRewardableCell slug={slug} />
    </>
  )
}

export default EditPuzzleFormPage
