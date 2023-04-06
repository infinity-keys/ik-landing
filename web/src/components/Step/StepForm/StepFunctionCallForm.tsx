import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  Submit,
} from '@redwoodjs/forms'

import type {
  EditStepFunctionCallById,
  UpdateStepFunctionCallInput,
} from 'types/graphql'
import type { RWGqlError } from '@redwoodjs/forms'

type FormStepFunctionCall = NonNullable<
  EditStepFunctionCallById['stepFunctionCall']
>

interface StepFunctionCallFormProps {
  stepFunctionCall?: EditStepFunctionCallById['stepFunctionCall']
  onSave?: (
    data: UpdateStepFunctionCallInput,
    id?: FormStepFunctionCall['id']
  ) => void
  error?: RWGqlError
  loading?: boolean
}

const StepFunctionCallForm = (props: StepFunctionCallFormProps) => {
  const onSubmit = (data: FormStepFunctionCall) => {
    props.onSave(data, props?.stepFunctionCall?.id)
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
        defaultValue={props.stepFunctionCall?.methodIds}
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
        defaultValue={props.stepFunctionCall?.contractAddress}
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
