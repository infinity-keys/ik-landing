import { QueryResolvers } from 'types/graphql'

import { checkClaimed } from './check-claimed'
import { verify } from './verfiy'

export const claim: QueryResolvers['claim'] = async ({
  account,
  tokenId,
  chainId,
}) => {
  const { claimed, chainClaimed } = await checkClaimed({
    account,
    tokenId,
  })

  if (claimed) {
    return {
      success: false,
      claimed,
      message: 'You have already claimed this NFT',
    }
  }

  const { signature, message: verifyMessage } = await verify({
    account,
    tokenId,
    chainId,
  })

  if (!signature) {
    return { success: false, message: verifyMessage }
  }

  return {
    success: true,
    chainClaimed,
    message: 'You are eligible to claim this NFT',
    signature,
  }
}
