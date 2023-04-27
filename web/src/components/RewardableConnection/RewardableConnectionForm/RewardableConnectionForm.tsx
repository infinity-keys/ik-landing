import type {
  EditRewardableConnectionById,
  UpdateRewardableConnectionInput,
} from 'types/graphql'

import { FieldError, Label, TextField, NumberField } from '@redwoodjs/forms'
import type { RWGqlError } from '@redwoodjs/forms'

type FormRewardableConnection = NonNullable<
  EditRewardableConnectionById['rewardableConnection']
>

interface RewardableConnectionFormProps {
  rewardableConnection?: EditRewardableConnectionById['rewardableConnection']
  onSave?: (
    data: UpdateRewardableConnectionInput,
    id?: FormRewardableConnection['id']
  ) => void
  error?: RWGqlError
  loading?: boolean
}

const RewardableConnectionForm = (props: RewardableConnectionFormProps) => {
  return (
    <div className="rw-form-wrapper mt-8">
      <Label
        name="rewardableConnection.parentId"
        className="rw-label"
        errorClassName="rw-label rw-label-error"
      >
        Parent ID
      </Label>

      <TextField
        name="rewardableConnection.parentId"
        defaultValue={props.rewardableConnection?.parentId}
        className="rw-input"
        errorClassName="rw-input rw-input-error"
      />

      <FieldError
        name="rewardableConnection.parentId"
        className="rw-field-error"
      />

      <Label
        name="rewardableConnection.childSortWeight"
        className="rw-label"
        errorClassName="rw-label rw-label-error"
      >
        Sort Weight
      </Label>

      <NumberField
        name="rewardableConnection.childSortWeight"
        defaultValue={props.rewardableConnection?.childSortWeight}
        className="rw-input"
        errorClassName="rw-input rw-input-error"
      />

      <FieldError
        name="rewardableConnection.childSortWeight"
        className="rw-field-error"
      />
    </div>
  )
}

export default RewardableConnectionForm
