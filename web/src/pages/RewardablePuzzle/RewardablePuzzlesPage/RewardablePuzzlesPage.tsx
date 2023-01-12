import { PAGINATION_COUNTS } from '@infinity-keys/constants'

import RewardablesCell from 'src/components/RewardablePuzzle/RewardablePuzzlesCell'

const RewardablesPage = ({ count, page }) => {
  const [smallestThumbnailCount] = PAGINATION_COUNTS

  const perPage = parseInt(count, 10) || smallestThumbnailCount
  const pageNum = parseInt(page, 10) || 1

  return <RewardablesCell count={perPage} page={pageNum} type="PUZZLE" />
}

export default RewardablesPage
