import { gql, useLazyQuery } from '@apollo/client'
import {
  marketplaceLookup,
  marketplaceNameLookup,
} from '@infinity-keys/constants'
import { useChainModal, useConnectModal } from '@rainbow-me/rainbowkit'
import {
  useContractWrite,
  usePrepareContractWrite,
  useNetwork,
  useWaitForTransaction,
} from 'wagmi'

import Button from 'src/components/Button/Button'
import Heading from 'src/components/Heading/Heading'
import LoadingIcon from 'src/components/LoadingIcon/LoadingIcon'
import Seo from 'src/components/Seo/Seo'
import Wrapper from 'src/components/Wrapper/Wrapper'
import { useIKContract } from 'src/hooks/useIKContract'
import { useIKMinter } from 'src/hooks/useIKMinter'

const GET_CLAIM = gql`
  query GetClaim($account: String!, $tokenId: Int!, $chainId: Int!) {
    claim(account: $account, tokenId: $tokenId, chainId: $chainId) {
      claimed
      chainClaimed
      signature
      message
    }
  }
`
const ClaimPage = () => {
  const { isConnected } = useIKMinter()
  const { contractAddress, isValidChain, abi } = useIKContract()
  const { chain } = useNetwork()
  const { openConnectModal } = useConnectModal()
  const { openChainModal } = useChainModal()

  const [claim, { loading: queryLoading, data }] = useLazyQuery(GET_CLAIM, {
    variables: { account, tokenId, chainId: chain?.id },
  })

  const {
    claimed = false,
    chainClaimed = 0,
    signature = '',
    message = '',
  } = data?.claim || {}

  const { config } = usePrepareContractWrite({
    addressOrName: contractAddress,
    contractInterface: abi,
    functionName: 'claim',
    args: [tokenId, signature],
    enabled: !!signature,
  })

  const {
    data: contractData,
    write,
    error: writeError,
  } = useContractWrite(config)

  const {
    error: transactionError,
    isLoading: transactionPending,
    isSuccess: transactionSuccess,
  } = useWaitForTransaction({
    hash: contractData?.hash,
  })

  return (
    <Wrapper>
      <Seo title="Claim" description="Claim page" />

      <div className="mb-8">
        <Heading>ClaimPage</Heading>
      </div>

      {(queryLoading || transactionPending) && <LoadingIcon />}

      {message && <p>{message}</p>}

      {!isConnected && (
        <Button text="Connect Wallet" onClick={openConnectModal} />
      )}

      {isConnected && !isValidChain && (
        <Button text="Switch Chains" onClick={openChainModal} />
      )}

      {!signature && !claimed && isConnected && isValidChain && (
        <Button text="Check my NFTs" onClick={() => claim()} />
      )}

      {signature &&
        isConnected &&
        !claimed &&
        !transactionSuccess &&
        isValidChain && (
          <>
            <p>Claim Your Trophy on {chain.name}</p>
            <Button text="Mint Treasure" onClick={() => write()} />
          </>
        )}

      {claimed && chainClaimed !== 0 && (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={`${marketplaceLookup[chainClaimed]}${tokenId}`}
          className="mt-6 text-gray-200 underline"
        >
          View NFT On {marketplaceNameLookup[chainClaimed]}
        </a>
      )}

      {(writeError || transactionError) && <p>Error processing transaction</p>}
    </Wrapper>
  )
}

export default ClaimPage
