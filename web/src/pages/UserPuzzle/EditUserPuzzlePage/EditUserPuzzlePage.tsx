import EditUserPuzzleCell from 'src/components/UserPuzzle/EditUserPuzzleCell'

type UserPuzzlePageProps = {
  id: string
}

const EditUserPuzzlePage = ({ id }: UserPuzzlePageProps) => {
  return <EditUserPuzzleCell id={id} />
}

export default EditUserPuzzlePage
