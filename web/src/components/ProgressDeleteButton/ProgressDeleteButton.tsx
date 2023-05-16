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
  onClick: () => void
  disabled?: boolean
  setDeleteProgressLoading: (loading: boolean) => void
}

const ProgressDeleteButton = ({
  onClick,
  disabled = false,
  setDeleteProgressLoading,
}: ProgressDeleteButtonProps) => {
  const [deleteUserProgress] = useMutation(DELETE_USER_PROGRESS_MUTATION)

  const handleClick = async () => {
    setDeleteProgressLoading(true)
    await deleteUserProgress()
    onClick()
    setDeleteProgressLoading(false)
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
