import { ConnectAccountProviders } from '@infinity-keys/core'
import {
  DeleteDiscordConnectionMutation,
  DeleteDiscordConnectionMutationVariables,
} from 'types/graphql'

import { useMutation } from '@redwoodjs/web'
import { LoaderIcon, toast } from '@redwoodjs/web/dist/toast'

const DELETE_ACCOUNT_CONNECTION = gql`
  mutation DeleteDiscordConnectionMutation($provider: String!) {
    deleteAccountConnection(provider: $provider) {
      success
      errors
    }
  }
`

const DisconnectAccountButton = ({
  provider,
  text = 'Disconnect',
  onSuccess,
}: {
  provider: ConnectAccountProviders
  text?: string
  onSuccess?: () => void
}) => {
  const [deleteConnection, { loading }] = useMutation<
    DeleteDiscordConnectionMutation,
    DeleteDiscordConnectionMutationVariables
  >(DELETE_ACCOUNT_CONNECTION, {
    variables: {
      provider,
    },
    onCompleted: ({ deleteAccountConnection }) => {
      if (deleteAccountConnection?.success && onSuccess) {
        onSuccess()
      }

      if (deleteAccountConnection?.errors?.length) {
        toast.error(deleteAccountConnection?.errors[0])
      }
    },
    onError: () => {
      toast.error('Error connecting Lens profile to user account.')
    },
  })

  return loading ? (
    <LoaderIcon />
  ) : (
    <button
      onClick={() => deleteConnection()}
      className="overflow-hidden rounded-md p-2 text-sm text-gray-200 transition-colors hover:bg-white/10 hover:text-brand-accent-primary"
    >
      {text}
    </button>
  )
}

export default DisconnectAccountButton
