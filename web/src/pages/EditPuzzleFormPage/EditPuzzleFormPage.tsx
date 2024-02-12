import EditPuzzleCell from 'src/components/EditPuzzleCell'
import Seo from 'src/components/Seo/Seo'

const EditPuzzleFormPage = ({ slug }: { slug: string }) => {
  return (
    <>
      <Seo title="Edit your puzzle" />
      <EditPuzzleCell slug={slug} />
    </>
  )
}

export default EditPuzzleFormPage
