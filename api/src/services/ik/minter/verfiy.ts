import { ethers } from 'ethers'
import castArray from 'lodash/castArray'
import { QueryResolvers } from 'types/graphql'

import { contractAddressLookup } from 'src/lib/walletConstants'

import { checkBalance } from './check-balance'
const privateKey = process.env.PRIVATE_KEY_VERIFY
const secret = process.env.MINT_SECRET_VERIFY

const wallet = new ethers.Wallet(privateKey || '')

export const verify: QueryResolvers['verify'] = async ({
  account,
  tokenId,
  chainId,
  gatedIds,
}) => {
  if (
    typeof tokenId !== 'string' ||
    typeof account !== 'string' ||
    typeof chainId !== 'string'
  )
    return { success: false }

  const getSignature = async () => {
    const chainIdAsNumber = parseInt(chainId, 10)

    const contractAddress = contractAddressLookup[chainIdAsNumber]

    if (!contractAddress) throw new Error('No contract address!')

    const hash = ethers.utils.solidityKeccak256(
      ['address', 'address', 'string', 'string'],
      [contractAddress, account, tokenId, secret]
    )

    return await wallet.signMessage(ethers.utils.arrayify(hash))
  }

  // If not gated- its a single puzzle and we need to check cookie
  // If gated- its a pack, check the balance of the gatedIds
  if (gatedIds) {
    const tokenIds = castArray(gatedIds)

    const { claimed: ownedStatus, claimedTokens } = await checkBalance({
      account,
      tokenIds,
      chainId,
    })

    if (!ownedStatus) {
      return {
        success: true,
        signature: '',
        message:
          'You do not have the required NFTS on this chain. Please ensure you have completed the above puzzles and are on the correct chain.',
        claimedTokens,
      }
    }

    // We do own!! Get siggy.
    try {
      const signature = await getSignature()
      return { success: true, signature, message: '', claimedTokens }
    } catch (e) {
      return { success: false }
    }
  }

  // @TODO: update this with new puzzle logic
  // if (!gatedIds) {
  //   const jwt = req.cookies[IK_ID_COOKIE]
  //   if (!jwt) return { success: false }

  //   const gql = await gqlApiSdk()
  //   const { puzzles } = await gql.GetPuzzleInfoByNftId({
  //     nftId: parseInt(tokenId, 10),
  //   })
  //   const successRoutes = puzzles.map(({ success_route }) => success_route)
  //   const canAccess = await jwtHasClaim(jwt, successRoutes)
  //   if (!canAccess) return { success: false }

  //   // We can access!! Get siggy.
  //   try {
  //     const signature = await getSignature()

  //     return { success: true, signature }
  //   } catch (e) {
  //     return { success: false }
  //   }
  // }
}
