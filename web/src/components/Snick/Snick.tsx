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

  // This option shows how to authenticate a user account with a custom EIP-191
  // compatible message signature that your app may already be asking the user to sign
  React.useEffect(() => {
    if (isConnected && address && data) {
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
  }, [isConnected, address, data])

  console.log({ data, isError, isSuccess })

  React.useEffect(() => {
    if (data) {
      console.log('Full Signature String: ' + data)
    }
  }, [data])

  return isConnected && currentUser && currentUser.roles.includes('ADMIN') ? (
    <div className="flex justify-center p-12 text-white">
      <button onClick={() => signMessage()}>Sign</button>
    </div>
  ) : (
    <></>
  )
}

export default Snickerdoodle
