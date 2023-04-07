import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  NumberField,
  Submit,
} from '@redwoodjs/forms'

import type {
  EditRewardableConnectionById,
  UpdateRewardableConnectionInput,
} from 'types/graphql'
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
        name="parentId"
        className="rw-label"
        errorClassName="rw-label rw-label-error"
      >
        Parent id
      </Label>

      <TextField
        name="parentId"
        defaultValue={props.rewardableConnection?.parentId}
        className="rw-input"
        errorClassName="rw-input rw-input-error"
      />

      <FieldError name="parentId" className="rw-field-error" />

      <Label
        name="childId"
        className="rw-label"
        errorClassName="rw-label rw-label-error"
      >
        Child id
      </Label>

      <TextField
        name="childId"
        defaultValue={props.rewardableConnection?.childId}
        className="rw-input"
        errorClassName="rw-input rw-input-error"
      />

      <FieldError name="childId" className="rw-field-error" />

      <Label
        name="childSortWeight"
        className="rw-label"
        errorClassName="rw-label rw-label-error"
      >
        Child sort weight
      </Label>

      <NumberField
        name="childSortWeight"
        defaultValue={props.rewardableConnection?.childSortWeight}
        className="rw-input"
        errorClassName="rw-input rw-input-error"
      />

      <FieldError name="childSortWeight" className="rw-field-error" />
    </div>
  )
}

export default RewardableConnectionForm
