import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  CheckboxField,
  Submit,
} from '@redwoodjs/forms'

import type { UpdateStepNftCheckInput } from 'types/graphql'
import type { RWGqlError } from '@redwoodjs/forms'

type FormStepNftCheck = NonNullable<EditStepNftCheckById['stepNftCheck']>

interface StepNftCheckFormProps {
  stepNftCheck?: EditStepNftCheckById['stepNftCheck']
  onSave: (data: UpdateStepNftCheckInput, id?: FormStepNftCheck['id']) => void
  error: RWGqlError
  loading: boolean
}

const StepNftCheckForm = (props: StepNftCheckFormProps) => {
  const onSubmit = (data: FormStepNftCheck) => {
    props.onSave(data, props?.stepNftCheck?.id)
  }

  return (
    <div className="rw-form-wrapper">
      <Form<FormStepNftCheck> onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
          name="stepId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Step id
        </Label>

        <TextField
          name="stepId"
          defaultValue={props.stepNftCheck?.stepId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="stepId" className="rw-field-error" />

        <Label
          name="requireAllNfts"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Require all nfts
        </Label>

        <CheckboxField
          name="requireAllNfts"
          defaultChecked={props.stepNftCheck?.requireAllNfts}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="requireAllNfts" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default StepNftCheckForm
