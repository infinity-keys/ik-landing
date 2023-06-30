import { PAGINATION_COUNTS } from '@infinity-keys/constants'
import { buildUrlString } from '@infinity-keys/core'

import RewardablesCell from 'src/components/RewardablesCell'
import Seo from 'src/components/Seo/Seo'

const RewardablesPage = ({
  count,
  page,
}: {
  count?: number
  page?: number
}) => {
  const [smallestThumbnailCount] = PAGINATION_COUNTS

  const perPage = count ?? smallestThumbnailCount
  const pageNum = page ?? 1

  return (
    <>
      <Seo title="Puzzles" url={buildUrlString(`/puzzles`)} />
      <RewardablesCell count={perPage} page={pageNum} types={['PUZZLE']} />
    </>
  )
}

export default RewardablesPage
