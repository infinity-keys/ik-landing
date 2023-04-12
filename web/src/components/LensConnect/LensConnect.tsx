import {
  useWalletLogin,
  useActiveWallet,
  useActiveProfile,
  useWalletLogout,
} from '@lens-protocol/react-web'
import { useAccount } from 'wagmi'

const LensConnect = () => {
  const { isConnected, connector } = useAccount()

  const {
    execute: connectToLens,
    error: connectToLensError,
    isPending: connectToLensPending,
  } = useWalletLogin()
  const { data: wallet } = useActiveWallet()
  const { data: profile } = useActiveProfile()
  const { execute: logout, isPending } = useWalletLogout()

  const onLoginClick = async () => {
    const signer = await connector.getSigner()
    await connectToLens(signer)
  }

  return (
    <div>
      {connectToLensError && <p>Error connecting to Lens</p>}

      {!isConnected ? (
        <p>connect wallet to use lens</p>
      ) : (
        <div>
          <button disabled={isPending} onClick={logout}>
            disconnect
          </button>
          <br />
          <button disabled={connectToLensPending} onClick={onLoginClick}>
            connect
          </button>
        </div>
      )}

      {wallet && <p>You are logged-in with {wallet.address}</p>}
      <p>Active profile: {profile?.handle}</p>
    </div>
  )
}

export default LensConnect
