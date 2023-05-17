import { DeleteUserProgress } from 'types/graphql'

import { useMutation } from '@redwoodjs/web'

import Button from 'src/components/Button'

const DELETE_USER_PROGRESS_MUTATION = gql`
  mutation DeleteUserProgress {
    deleteUserProgress {
      success
    }
  }
`

interface ProgressDeleteButtonProps {
  disabled?: boolean
  setDeleteProgressLoading: (loading: boolean) => void
}

const ProgressDeleteButton = ({
  disabled = false,
  setDeleteProgressLoading,
}: ProgressDeleteButtonProps) => {
  const [deleteUserProgress] = useMutation<DeleteUserProgress>(
    DELETE_USER_PROGRESS_MUTATION,
    {
      onCompleted: () => {
        setDeleteProgressLoading(false)
      },
      onError: () => {
        setDeleteProgressLoading(false)
      },
    }
  )

  const handleClick = async () => {
    setDeleteProgressLoading(true)
    deleteUserProgress()
  }

  return (
    <div>
      <Button
        onClick={handleClick}
        disabled={disabled}
        text={'Clear my progress'}
      />
    </div>
  )
}

export default ProgressDeleteButton
