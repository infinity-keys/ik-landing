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
  EditStepSimpleTextById,
  UpdateStepSimpleTextInput,
} from 'types/graphql'
import type { RWGqlError } from '@redwoodjs/forms'

type FormStepSimpleText = NonNullable<EditStepSimpleTextById['stepSimpleText']>

interface StepSimpleTextFormProps {
  stepSimpleText?: EditStepSimpleTextById['stepSimpleText']
  onSave?: (
    data: UpdateStepSimpleTextInput,
    id?: FormStepSimpleText['id']
  ) => void
  error?: RWGqlError
  loading?: boolean
}

const StepSimpleTextForm = (props: StepSimpleTextFormProps) => {
  return (
    <div className="rw-form-wrapper">
      <FormError
        error={props.error}
        wrapperClassName="rw-form-error-wrapper"
        titleClassName="rw-form-error-title"
        listClassName="rw-form-error-list"
      />
      <Label
        name="stepTypeData.solution"
        className="rw-label"
        errorClassName="rw-label rw-label-error"
      >
        Solution
      </Label>

      <TextField
        name="stepTypeData.solution"
        defaultValue={props.stepSimpleText?.solution}
        className="rw-input"
        errorClassName="rw-input rw-input-error"
        validation={{ required: true }}
      />

      <FieldError name="stepTypeData.solution" className="rw-field-error" />
    </div>
  )
}

export default StepSimpleTextForm
