import { Fragment, useEffect } from 'react'

import { gql, useLazyQuery } from '@apollo/client'
import {
  contractAddressLookup,
  marketplaceLookup,
  OPTIMISM_CHAIN_ID,
} from '@infinity-keys/constants'
import { IKAchievementABI__factory } from '@infinity-keys/contracts'
import { useChainModal, useConnectModal } from '@rainbow-me/rainbowkit'
import capitalize from 'lodash/capitalize'
import type {
  CheckClaimQueryVariables,
  FindClaimNftQuery,
  FindClaimNftQueryVariables,
  AddNftRewardMutation,
  AddNftRewardMutationVariables,
} from 'types/graphql'
import { CheckClaimQuery } from 'types/graphql'
import {
  useAccount,
  useContractWrite,
  usePrepareContractWrite,
  useNetwork,
  useWaitForTransaction,
} from 'wagmi'

import { Link } from '@redwoodjs/router'
import {
  type CellSuccessProps,
  type CellFailureProps,
  useMutation,
} from '@redwoodjs/web'

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
      slug
      name
      asChildPublicParentRewardables {
        parentRewardable {
          slug
          name
          type
        }
      }
      nfts {
        cloudinaryId
      }
    }
  }
`

const CHECK_CLAIM_QUERY = gql`
  query CheckClaimQuery($rewardableId: String!, $account: String!) {
    claim(rewardableId: $rewardableId, account: $account) {
      claimed
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
  const { address } = useAccount()
  const { openConnectModal } = useConnectModal()
  const { openChainModal } = useChainModal()
  const { chain } = useNetwork()

  // Checks both db and blockchain to see if user is eligible to mint
  // if successful, it runs the gasless claim function
  const [checkClaim, { loading: queryLoading, data }] = useLazyQuery<
    CheckClaimQuery,
    CheckClaimQueryVariables
  >(CHECK_CLAIM_QUERY, {
    variables: {
      rewardableId: rewardable.id,
      account: address as string,
    },
  })

  // Add nft to userRewards table on successful transaction
  const [updateReward] = useMutation<
    AddNftRewardMutation,
    AddNftRewardMutationVariables
  >(ADD_NFT_REWARD_MUTATION)

  const {
    claimed = false,
    signature = '',
    tokenId = undefined,
    errors = [],
  } = data?.claim || {}

  const { config, error: prepareError } = usePrepareContractWrite({
    address: contractAddressLookup[OPTIMISM_CHAIN_ID],
    abi: IKAchievementABI__factory.abi,
    functionName: 'claim',
    args: [tokenId, signature],
    enabled: !!signature,
  })

  const {
    data: writeData,
    write: mintNft,
    error: writeError,
    isLoading: writeLoading,
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
      // Once the transaction succeeds, add NFT to userReward
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

  const contractError = writeError || transactionError || prepareError
  const mustConnect = !address || chain?.id !== OPTIMISM_CHAIN_ID
  const loading = queryLoading || transactionPending || writeLoading
  const canMint =
    !loading &&
    !claimed &&
    signature &&
    !transactionSuccess &&
    !mustConnect &&
    !contractError
  const canCheckClaim =
    !loading && !canMint && !mustConnect && !transactionSuccess

  if (contractError) {
    console.error(contractError)
  }
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

      {!loading &&
        errors?.map((err: string, i: number) => (
          <p className="mb-4 italic text-gray-200" key={i}>
            {err}
          </p>
        ))}

      {contractError && (
        <p className="mb-4 italic text-gray-200">
          An error occurred during the transaction
        </p>
      )}

      {loading && (
        <div className="my-4">
          <LoadingIcon />
        </div>
      )}

      {canCheckClaim && (
        <Button onClick={checkClaim}>Check Ability to Mint</Button>
      )}

      {canMint && <Button onClick={mintNft}>Mint</Button>}

      {mustConnect && (
        <div>
          <p className="pb-4">Please connect your wallet to Optimism</p>
          {!address ? (
            <Button onClick={openConnectModal}>Connect Wallet</Button>
          ) : (
            <Button onClick={openChainModal}>Switch to Optimism</Button>
          )}
        </div>
      )}

      {transactionSuccess && (
        <div>
          <div className="pb-8">
            <Button
              to={rewardableLandingRoute({
                type: rewardable.type,
                slug: rewardable.slug,
              })}
            >{`Return to ${rewardable.name} ${capitalize(
              rewardable.type
            )}`}</Button>
          </div>

          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://optimistic.etherscan.io/token/0x54b743D6055e3BBBF13eb2C748A3783516156e5B"
            className="text-gray-200 underline transition-colors hover:text-brand-accent-primary"
          >
            View transaction
          </a>
        </div>
      )}

      {/* Allows user to navigate to every public parent of this puzzle */}
      {rewardable.asChildPublicParentRewardables.length > 0 && (
        <div className="pt-6 text-center text-gray-200">
          <p>
            Return to:
            {rewardable.asChildPublicParentRewardables.map(
              (rewardable, index) => {
                if (!rewardable?.parentRewardable) return null

                const {
                  parentRewardable: { slug, name, type },
                } = rewardable

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
              }
            )}
          </p>
        </div>
      )}

      <div className="mt-8">
        <Button round solid to="/#waitlist">
          Join Waitlist
        </Button>
      </div>
    </div>
  )
}
