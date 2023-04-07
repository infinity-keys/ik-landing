import { FieldError, Label, TextField } from '@redwoodjs/forms'

import type { UpdateStepFunctionCallInput } from 'types/graphql'
import type { RWGqlError } from '@redwoodjs/forms'

interface StepFunctionCallFormProps {
  onSave?: (data: UpdateStepFunctionCallInput) => void
  error?: RWGqlError
  loading?: boolean
}

const StepFunctionCallForm = (props: StepFunctionCallFormProps) => {
  const onSubmit = (data) => {
    props.onSave(data)
  }

  return (
    <div className="rw-form-wrapper">
      <Label
        name="stepTypeData.methodIds"
        className="rw-label"
        errorClassName="rw-label rw-label-error"
      >
        Method ids{' '}
        <span className="font-light">
          (use comma separated values for multiple ids)
        </span>
      </Label>

      <TextField
        name="stepTypeData.methodIds"
        className="rw-input"
        errorClassName="rw-input rw-input-error"
        validation={{ required: true }}
      />

      <FieldError name="stepTypeData.methodIds" className="rw-field-error" />

      <Label
        name="stepTypeData.contractAddress"
        className="rw-label"
        errorClassName="rw-label rw-label-error"
      >
        Contract address
      </Label>

      <TextField
        name="stepTypeData.contractAddress"
        className="rw-input"
        errorClassName="rw-input rw-input-error"
      />

      <FieldError
        name="stepTypeData.contractAddress"
        className="rw-field-error"
      />
    </div>
  )
}

export default StepFunctionCallForm
