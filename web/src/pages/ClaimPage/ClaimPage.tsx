import { useParams } from '@redwoodjs/router'

import ClaimNftCell from 'src/components/ClaimNftCell'
import Seo from 'src/components/Seo/Seo'

const ClaimPage = () => {
  const { id: rewardableId } = useParams()

  return (
    <div className="text-center">
      <Seo title="Claim" description="Claim page" />

      <ClaimNftCell id={rewardableId} />
    </div>
  )
}

export default ClaimPage
