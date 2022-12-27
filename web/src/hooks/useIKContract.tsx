import { useEffect, useState } from 'react'

import { contractAddressLookup } from '@infinity-keys/constants'
import { IKAchievementABI__factory } from '@infinity-keys/contracts'
import { validChain } from '@infinity-keys/core'
import { useNetwork } from 'wagmi'

export const useIKContract = () => {
  const { chain } = useNetwork()
  const [contractAddress, setContractAddress] = useState('')
  const [isValidChain, setIsValidChain] = useState(false)

  useEffect(() => {
    const valid = validChain(chain?.id || 0)
    setIsValidChain(valid)

    if (valid) {
      setContractAddress(contractAddressLookup[chain.id])
    } else {
      setContractAddress('')
    }
  }, [chain])

  return { contractAddress, isValidChain, abi: IKAchievementABI__factory.abi }
}
