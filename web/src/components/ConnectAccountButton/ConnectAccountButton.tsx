import { ConnectAccountProviders } from '@infinity-keys/core'

import { toast } from '@redwoodjs/web/dist/toast'

import { useAuth } from 'src/auth'
import Button from 'src/components/Button/Button'
import { connectAccountApiUrl } from 'src/lib/urlBuilders'

const ConnectAccountButton = ({
  provider,
  text = 'Connect',
}: {
  provider: ConnectAccountProviders
  text?: string
}) => {
  const { currentUser } = useAuth()

  const fetchAuthUrl = async () => {
    const res = await fetch(connectAccountApiUrl(provider), {
      headers: {
        Authorization: `Bearer ${currentUser?.authId}`,
        'auth-provider': 'dbAuth',
        'Content-Type': 'application/json',
      },
    })

    if (!res.ok) {
      return toast.error('Error obtaining auth URL.')
    }

    const data = await res.json()

    if (!data.authUrl) {
      return toast.error('Error obtaining auth URL.')
    }

    window.location.href = data.authUrl
  }

  return (
    <Button
      text={text}
      onClick={fetchAuthUrl}
      size="small"
      variant="faded"
      border={false}
    />
  )
}

export default ConnectAccountButton