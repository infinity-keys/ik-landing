import { gql, useLazyQuery } from '@apollo/client'
import { useNetwork } from 'wagmi'

import Button from 'src/components/Button/Button'
import Heading from 'src/components/Heading/Heading'
import LoadingIcon from 'src/components/LoadingIcon/LoadingIcon'
import Seo from 'src/components/Seo/Seo'
import Wrapper from 'src/components/Wrapper/Wrapper'

const GET_CLAIM = gql`
  query GetClaim($account: String!, $tokenId: Int!, $chainId: Int!) {
    claim(account: $account, tokenId: $tokenId, chainId: $chainId) {
      success
      claimed
      chainClaimed
      signature
      message
    }
  }
`
const ClaimPage = () => {
  const {
    chain: { id: chainId },
  } = useNetwork()

  const [claim, { called, loading, data }] = useLazyQuery(GET_CLAIM, {
    variables: { account, tokenId, chainId },
  })

  // if (called && loading) return <p>Loading ...</p>
  // if (!called) {
  //   return <button onClick={() => loadGreeting()}>Load greeting</button>
  // }

  return (
    <Wrapper>
      <Seo title="Claim" description="Claim page" />

      <div className="mb-8">
        <Heading>ClaimPage</Heading>
      </div>

      {loading && <LoadingIcon />}

      <p>{data?.claim?.message}</p>

      <p>{JSON.stringify(data)}</p>

      {!data?.claim?.signature && !data?.claim?.claimed && (
        <Button text="Check my NFTs" onClick={() => claim()} />
      )}

      {data?.claim?.signature && <Button text="Mint Treasure" />}
    </Wrapper>
  )
}

export default ClaimPage
