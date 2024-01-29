import EditPuzzleCell from 'src/components/EditPuzzleCell'

const EditPuzzleFormPage = ({ slug }: { slug: string }) => {
  return (
    <>
      <p>Edit</p>
      <EditPuzzleCell slug={slug} />
    </>
  )
}

export default EditPuzzleFormPage
