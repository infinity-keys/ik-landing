import { toast } from '@redwoodjs/web/dist/toast'

import Button from 'src/components/Button/Button'

const DiscordAuthButton = () => {
  const fetchAuthUrl = async () => {
    const res = await fetch(
      '/.redwood/functions/connect-account?provider=discord'
    )

    if (!res.ok) {
      return toast.error('Error obtaining auth URL.')
    }

    const data = await res.json()
    console.log('data: ', data)

    if (!data.authUrl) {
      return toast.error('Error obtaining auth URL.')
    }

    window.location.href = data.authUrl
  }

  return <Button text="Connect Discord Account" onClick={fetchAuthUrl} />
}

export default DiscordAuthButton
