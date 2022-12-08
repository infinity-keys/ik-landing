import UserPuzzleCell from 'src/components/UserPuzzle/UserPuzzleCell'

type UserPuzzlePageProps = {
  id: string
}

const UserPuzzlePage = ({ id }: UserPuzzlePageProps) => {
  return <UserPuzzleCell id={id} />
}

export default UserPuzzlePage
