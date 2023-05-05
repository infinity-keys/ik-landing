import type { EditPuzzleById, UpdatePuzzleInput } from 'types/graphql'

import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  Submit,
} from '@redwoodjs/forms'
import type { RWGqlError } from '@redwoodjs/forms'

type FormPuzzle = NonNullable<EditPuzzleById['puzzle']>

interface PuzzleFormProps {
  puzzle?: EditPuzzleById['puzzle']
  onSave: (data: UpdatePuzzleInput, id?: FormPuzzle['id']) => void
  error: RWGqlError
  loading: boolean
}

const PuzzleForm = (props: PuzzleFormProps) => {
  const onSubmit = (data: FormPuzzle) => {
    props.onSave(data, props?.puzzle?.id)
  }

  return (
    <div className="rw-form-wrapper">
      <Form<FormPuzzle> onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
          name="rewardableId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Rewardable id
        </Label>

        <TextField
          name="rewardableId"
          defaultValue={props.puzzle?.rewardableId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="rewardableId" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default PuzzleForm
