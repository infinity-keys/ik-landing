import { PAGINATION_COUNTS } from '@infinity-keys/constants'

import RewardablesCell from 'src/components/RewardablesCell'
import Seo from 'src/components/Seo/Seo'

export enum AlphaModalStatus {
  Hidden = 'HIDDEN',
}

const PlayPage = ({ count, page }: { count?: number; page?: number }) => {
  const [smallestThumbnailCount] = PAGINATION_COUNTS
  const perPage = count ?? smallestThumbnailCount
  const pageNum = page ?? 1

  return (
    <>
      <Seo title="Play" />
      <RewardablesCell
        count={perPage}
        page={pageNum}
        types={['PACK', 'PUZZLE']}
        sortType="FEATURED"
        landingRoute={'PLAY'}
      />
    </>
  )
}

export default PlayPage
