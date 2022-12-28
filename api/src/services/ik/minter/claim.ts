import { QueryResolvers } from 'types/graphql'

import { checkClaimed } from './check-claimed'
import { verify } from './verify'

export const claim: QueryResolvers['claim'] = async ({
  account,
  tokenId,
  chainId,
}) => {
  const {
    claimed,
    chainClaimed,
    success: checkClaimedSuccess,
  } = await checkClaimed({
    account,
    tokenId,
  })

  if (!checkClaimedSuccess) {
    return { success: false, message: 'Error checking blockchain' }
  }

  if (claimed) {
    return {
      success: true,
      claimed,
      chainClaimed,
      message: 'You have already claimed this NFT',
    }
  }

  const {
    signature,
    success: verifySuccess,
    message: verifyMessage,
  } = await verify({
    account,
    tokenId,
    chainId,
  })

  if (!verifySuccess || !signature) {
    return { success: false, message: verifyMessage }
  }

  return {
    success: true,
    chainClaimed,
    signature,
  }
}
