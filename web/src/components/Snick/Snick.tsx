import { useState } from 'react'

import { EVMAccountAddress, Signature } from '@snickerdoodlelabs/objects'
import { SnickerdoodleWebIntegration } from '@snickerdoodlelabs/web-integration'
import { useAccount, useSignMessage } from 'wagmi'

import { useAuth } from 'src/auth'

const webIntegrationConfig = {}

const Snickerdoodle = () => {
  const myMessage = 'Hello Snickerdoodle!' // you app's login message
  const { data, isError, isSuccess, signMessage } = useSignMessage({
    message: myMessage,
  })
  const { address, isConnected } = useAccount()
  const { currentUser } = useAuth()
  const [isInit, setIsInit] = useState<boolean>(false)
  // This option shows how to authenticate a user account with a custom EIP-191
  // compatible message signature that your app may already be asking the user to sign
  React.useEffect(() => {
    if (!isInit && isConnected && address && data) {
      setIsInit(true)
      const webIntegration = new SnickerdoodleWebIntegration(
        webIntegrationConfig
      )
      webIntegration
        .initialize()
        .andThen((proxy) => {
          return proxy.account.addAccountWithExternalSignature(
            EVMAccountAddress(address),
            myMessage,
            Signature(data),
            1
          )
        })
        .mapErr((err) => {
          console.log(err)
        })
    }
  }, [isConnected, address, data, isInit])

  console.log({ data, isError, isSuccess })

  React.useEffect(() => {
    if (data) {
      console.log('Full Signature String: ' + data)
    }
  }, [data])

  if (
    isConnected &&
    !isInit &&
    currentUser &&
    currentUser.roles.includes('ADMIN')
  ) {
    return (
      <button className="button-64" onClick={() => signMessage()}>
        Personal Sign
      </button>
    )
  } else if (
    isConnected &&
    isInit &&
    currentUser &&
    currentUser.roles.includes('ADMIN')
  ) {
    return (
      <>
        {isSuccess && (
          <div>
            Signature:{' '}
            {data?.slice(0, 12) +
              '...' +
              data?.slice(data.length - 13, data.length - 1)}
          </div>
        )}
        {isError && <div>Error signing message</div>}
      </>
    )
  } else {
    return <></>
  }
}

export default Snickerdoodle
