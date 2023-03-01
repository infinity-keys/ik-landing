import AnonPuzzleCell from 'src/components/AnonPuzzleCell'

type AnonPuzzlePageProps = {
  slug: string
}

const AnonPuzzlePage = ({ slug }: AnonPuzzlePageProps) => {
  return <AnonPuzzleCell slug={slug} />
}

export default AnonPuzzlePage
