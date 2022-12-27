import { useEffect, useState } from 'react'

import { contractAddressLookup } from '@infinity-keys/constants'
import { IKAchievementABI__factory } from '@infinity-keys/contracts'
import { validChain } from '@infinity-keys/core'

export const useIKContract = (chain) => {
  const [contractAddress, setContractAddress] = useState('')

  useEffect(() => {
    if (validChain(chain?.id || 0)) {
      setContractAddress(contractAddressLookup[chain.id])
    } else {
      setContractAddress('')
    }
  }, [chain])

  return { contractAddress, abi: IKAchievementABI__factory.abi }
}
