import { gql, useLazyQuery } from '@apollo/client'
import {
  contractAddressLookup,
  marketplaceLookup,
  marketplaceNameLookup,
} from '@infinity-keys/constants'
import { IKAchievementABI__factory } from '@infinity-keys/contracts'
import { validChain } from '@infinity-keys/core'
import { useChainModal, useConnectModal } from '@rainbow-me/rainbowkit'
import {
  useContractWrite,
  usePrepareContractWrite,
  useNetwork,
  useWaitForTransaction,
  useAccount,
} from 'wagmi'

import Button from 'src/components/Button/Button'
import Heading from 'src/components/Heading/Heading'
import LoadingIcon from 'src/components/LoadingIcon/LoadingIcon'
import Seo from 'src/components/Seo/Seo'
import Wrapper from 'src/components/Wrapper/Wrapper'

// @TODO: get this dynamically
const tokenId = 105

const CHECK_CLAIM = gql`
  query CheckClaim($account: String!, $tokenId: Int!, $chainId: Int!) {
    claim(account: $account, tokenId: $tokenId, chainId: $chainId) {
      claimed
      chainClaimed
      signature
      message
    }
  }
`
const ClaimPage = () => {
  const { chain } = useNetwork()
  const { isConnected, address } = useAccount()
  const { openConnectModal } = useConnectModal()
  const { openChainModal } = useChainModal()
  const isValidChain = validChain(chain?.id || 0)
  const contractAddress = isValidChain && contractAddressLookup[chain?.id]

  const [claim, { loading: queryLoading, data }] = useLazyQuery(CHECK_CLAIM, {
    variables: { account: address, tokenId, chainId: chain?.id },
  })

  const {
    claimed = false,
    chainClaimed = 0,
    signature = '',
    message = '',
  } = data?.claim || {}

  const { config } = usePrepareContractWrite({
    addressOrName: contractAddress,
    contractInterface: IKAchievementABI__factory.abi,
    functionName: 'claim',
    args: [tokenId, signature],
    enabled: !!signature,
  })

  const {
    data: writeData,
    write: mintNft,
    error: writeError,
  } = useContractWrite(config)

  const {
    error: transactionError,
    isLoading: transactionPending,
    isSuccess: transactionSuccess,
  } = useWaitForTransaction({
    hash: writeData?.hash,
  })

  return (
    <Wrapper>
      <Seo title="Claim" description="Claim page" />

      <div className="mb-8">
        <Heading>ClaimPage</Heading>
      </div>

      {(queryLoading || transactionPending) && (
        <div className="mb-4">
          <LoadingIcon />
        </div>
      )}

      {message && <p className="mb-4">{message}</p>}

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
        !claimed &&
        !transactionSuccess &&
        isConnected &&
        isValidChain && (
          <>
            <p className="mb-4">Claim Your Trophy on {chain.name}</p>
            <Button text="Mint Treasure" onClick={mintNft} />
          </>
        )}

      {transactionSuccess && (
        <p className="mb-4">Your trophy has been claimed!</p>
      )}

      {(claimed || transactionSuccess) && (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={`${marketplaceLookup[chainClaimed || chain?.id]}${tokenId}`}
          className="mt-6 text-gray-200 underline"
        >
          View NFT On {marketplaceNameLookup[chainClaimed || chain?.id]}
        </a>
      )}

      {(writeError || transactionError) && (
        <p className="mt-4 italic text-gray-200">
          Error processing transaction. Please try again.
        </p>
      )}
    </Wrapper>
  )
}

export default ClaimPage
