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
  const { getToken } = useAuth()

  const fetchAuthUrl = async () => {
    const token = await getToken()

    if (!token) {
      return toast.error('Error obtaining auth token.')
    }

    const res = await fetch(connectAccountApiUrl(provider), {
      headers: {
        Authorization: `Bearer ${token}`,
        'auth-provider': 'clerk',
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
    <Button onClick={fetchAuthUrl} size="small">
      {text}
    </Button>
  )
}

export default ConnectAccountButton
