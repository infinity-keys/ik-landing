import { Fragment, useEffect } from 'react'

import { gql, useLazyQuery } from '@apollo/client'
import { OPTIMISM_CHAIN_ID } from '@infinity-keys/constants'
import {
  contractAddressLookup,
  marketplaceLookup,
  marketplaceNameLookup,
} from '@infinity-keys/constants'
import { IKAchievementABI__factory } from '@infinity-keys/contracts'
import { useChainModal, useConnectModal } from '@rainbow-me/rainbowkit'
import capitalize from 'lodash/capitalize'
import type {
  FindClaimNftQuery,
  FindClaimNftQueryVariables,
} from 'types/graphql'
import { AddNftRewardMutation } from 'types/graphql'
import {
  useContractWrite,
  usePrepareContractWrite,
  useNetwork,
  useWaitForTransaction,
  useAccount,
} from 'wagmi'

import { Link } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Alert from 'src/components/Alert/Alert'
import Button from 'src/components/Button/Button'
import CloudImage from 'src/components/CloudImage/CloudImage'
import Heading from 'src/components/Heading/Heading'
import LoadingIcon from 'src/components/LoadingIcon/LoadingIcon'
import { rewardableLandingRoute } from 'src/lib/urlBuilders'

export const QUERY = gql`
  query FindClaimNftQuery($id: String!) {
    rewardable(id: $id) {
      id
      type
      availableChains
      slug
      name
      asChildPublicParentRewardables {
        parentRewardable {
          slug
          name
          type
        }
      }
      puzzle {
        isAnon
      }
      nfts {
        cloudinaryId
      }
    }
  }
`

const CHECK_CLAIM_QUERY = gql`
  query CheckClaimQuery($account: String!, $rewardableId: String!) {
    claim(account: $account, rewardableId: $rewardableId) {
      claimed
      chainClaimed
      signature
      tokenId
      errors
    }
  }
`

const ADD_NFT_REWARD_MUTATION = gql`
  mutation AddNftRewardMutation($id: String!) {
    addNftReward(id: $id) {
      id
    }
  }
`

export const Loading = () => <LoadingIcon />

export const Empty = () => <div>Empty</div>

export const Failure = ({
  error,
}: CellFailureProps<FindClaimNftQueryVariables>) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
  rewardable,
}: CellSuccessProps<FindClaimNftQuery, FindClaimNftQueryVariables>) => {
  const { chain } = useNetwork()
  const { isConnected, address } = useAccount()
  const { openConnectModal } = useConnectModal()
  const { openChainModal } = useChainModal()
  const isValidChain = chain?.id === OPTIMISM_CHAIN_ID

  const contractAddress = isValidChain
    ? contractAddressLookup[OPTIMISM_CHAIN_ID]
    : ''

  // checks both db and blockchain to see if user is eligible to mint
  // if successful, it returns all the data needed to mint nft
  const [claim, { loading: queryLoading, data }] = useLazyQuery(
    CHECK_CLAIM_QUERY,
    {
      variables: {
        account: address,
        rewardableId: rewardable.id,
      },
    }
  )

  // add nft to userRewards table on successful transaction
  const [updateReward] = useMutation<AddNftRewardMutation>(
    ADD_NFT_REWARD_MUTATION
  )

  const {
    claimed = false,
    chainClaimed = 0,
    signature = '',
    tokenId = undefined,
  } = data?.claim || {}

  const { config } = usePrepareContractWrite({
    addressOrName: contractAddress,
    contractInterface: IKAchievementABI__factory.abi,
    functionName: 'claim',
    args: [tokenId, signature],
    // keeps this hook from firing until we get a valid signature
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

  useEffect(() => {
    if (transactionSuccess) {
      // once the transaction succeeds, add NFT to userReward
      updateReward({
        variables: {
          id: rewardable.id,
        },
      })
    }
  }, [transactionSuccess, rewardable.id, updateReward])

  if (!rewardable.nfts.length) {
    return <div>No NFT found for this {capitalize(rewardable.type)}</div>
  }

  const nftImage = rewardable.nfts[0]?.cloudinaryId
  const canClaim = !signature && !claimed && isConnected && isValidChain
  const canMint =
    signature &&
    !claimed &&
    !transactionSuccess &&
    !transactionPending &&
    isConnected &&
    isValidChain

  return (
    <div>
      <div className="mb-8 flex flex-col items-center">
        {nftImage && (
          <div className="mb-6">
            <CloudImage id={nftImage} height={200} width={200} />
          </div>
        )}
        <Heading>Claim Your Treasure</Heading>
      </div>

      {!queryLoading &&
        data?.claim?.errors?.map((err: string, i: number) => (
          <p className="mb-4 italic text-gray-200" key={i}>
            {err}
          </p>
        ))}

      {(queryLoading || transactionPending) && (
        <div className="my-4">
          <LoadingIcon />
        </div>
      )}

      {transactionPending && (
        <div className="mb-4 flex justify-center">
          <Alert text="Transaction pending. Do not close page." />
        </div>
      )}

      {!isConnected && (
        <Button text="Connect Wallet" onClick={openConnectModal} />
      )}

      {isConnected && !isValidChain && (
        <>
          <p className="mb-4 italic text-gray-200">
            This NFT can only be minted on Optimism
          </p>
          <Button text="Switch Chains" onClick={openChainModal} />
        </>
      )}

      {canClaim && <Button text="Check My NFTs" onClick={claim} />}

      {canMint && (
        <>
          <p className="mb-4">Claim Your Trophy on {chain.name}</p>
          <Button text="Mint Treasure" onClick={mintNft} />
        </>
      )}

      {transactionSuccess && (
        <p className="mb-4">Your trophy has been claimed!</p>
      )}

      {(claimed || transactionSuccess) && (
        <div>
          <div className="pb-8">
            <Button
              to={rewardableLandingRoute({
                type: rewardable.type,
                slug: rewardable.slug,
                anonPuzzle: rewardable.puzzle?.isAnon,
              })}
              text={`Return to ${rewardable.name} ${capitalize(
                rewardable.type
              )}`}
            />
          </div>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={`${marketplaceLookup[chainClaimed || chain?.id]}${tokenId}`}
            className="text-gray-200 underline transition-colors hover:text-brand-accent-primary"
          >
            View NFT On {marketplaceNameLookup[chainClaimed || chain?.id]}
          </a>
        </div>
      )}

      {(writeError || transactionError) && (
        <p className="mt-4 italic text-gray-200">
          Error processing transaction. Please try again.
        </p>
      )}

      {/* Allows user to navigate to every public parent of this puzzle */}
      {rewardable.asChildPublicParentRewardables.length > 0 && (
        <div className="pt-6 text-center text-gray-200">
          <p>
            Return to:
            {rewardable?.asChildPublicParentRewardables.map((parent, index) => {
              const { slug, name, type } = parent?.parentRewardable || {}
              if (!slug || !name || !type) return null

              return (
                <Fragment key={slug + type}>
                  {/* prepend a comma to all but the first item */}
                  {index ? ', ' : ''}
                  <Link
                    to={rewardableLandingRoute({ slug, type })}
                    className="ml-2 mt-2 inline-block italic transition-colors hover:text-brand-accent-primary"
                  >
                    {name} {capitalize(type)}
                  </Link>
                </Fragment>
              )
            })}
          </p>
        </div>
      )}
    </div>
  )
}
