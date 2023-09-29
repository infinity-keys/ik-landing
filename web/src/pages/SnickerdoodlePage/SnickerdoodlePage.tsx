import 'reflect-metadata'
import { EVMAccountAddress, Signature } from '@snickerdoodlelabs/objects'
import { SnickerdoodleWebIntegration } from '@snickerdoodlelabs/web-integration'
// import { ethers } from 'ethers'
import { useAccount, useSignMessage } from 'wagmi'

const webIntegrationConfig = {}

// const connectWallet = async () => {
//   if (typeof window.ethereum !== 'undefined') {
//     await window.ethereum.request({ method: 'eth_requestAccounts' })
//     const provider = new ethers.providers.Web3Provider(window.ethereum)
//     const signerInstance = provider.getSigner()

//     const webIntegration = new SnickerdoodleWebIntegration(
//       webIntegrationConfig,
//       signerInstance
//     )

//     webIntegration
//       .initialize()
//       .map((sdlDataWallet) => {
//         console.log('success', sdlDataWallet)
//         // Implement your success logic here
//       })
//       .mapErr((err) => {
//         console.error('err: ', err)
//         // Implement your error handling logic here
//       })
//   } else {
//     console.error('Ethereum provider not detected')
//   }
// }

const SnickerdoodlePage = () => {
  const myMessage = 'Hello Snickerdoodle!' // you app's login message
  const { data, isError, isSuccess, signMessage } = useSignMessage({
    message: myMessage,
  })
  const { address, isConnected } = useAccount()

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

  React.useEffect(() => {
    if (data) {
      console.log('Full Signature String: ' + data)
    }
  }, [data])

  if (isConnected) {
    return (
      <div className="text-white">
        <button className="button-64" onClick={() => signMessage()}>
          Personal Sign
        </button>
        {isSuccess && (
          <div>
            Signature:{' '}
            {data?.slice(0, 12) +
              '...' +
              data?.slice(data.length - 13, data.length - 1)}
          </div>
        )}
        {isError && <div>Error signing message</div>}
      </div>
    )
  } else {
    return <></>
  }
}

export default SnickerdoodlePage
