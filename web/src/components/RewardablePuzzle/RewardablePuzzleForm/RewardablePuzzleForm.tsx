import type { EditRewardableById, UpdateRewardableInput } from 'types/graphql'

import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  CheckboxField,
  RadioField,
  Submit,
} from '@redwoodjs/forms'
import type { RWGqlError } from '@redwoodjs/forms'

type FormRewardable = NonNullable<EditRewardableById['rewardable']>

interface RewardableFormProps {
  rewardable?: EditRewardableById['rewardable']
  onSave: (data: UpdateRewardableInput, id?: FormRewardable['id']) => void
  error: RWGqlError
  loading: boolean
}

const RewardableForm = (props: RewardableFormProps) => {
  const onSubmit = (data: FormRewardable) => {
    props.onSave(data, props?.rewardable?.id)
  }

  return (
    <div className="rw-form-wrapper">
      <Form<FormRewardable> onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
          name="name"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Name
        </Label>

        <TextField
          name="name"
          defaultValue={props.rewardable?.name}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="name" className="rw-field-error" />

        <Label
          name="slug"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Slug
        </Label>

        <TextField
          name="slug"
          defaultValue={props.rewardable?.slug}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="slug" className="rw-field-error" />

        <Label
          name="explanation"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Explanation
        </Label>

        <TextField
          name="explanation"
          defaultValue={props.rewardable?.explanation}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="explanation" className="rw-field-error" />

        <Label
          name="successMessage"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Success message
        </Label>

        <TextField
          name="successMessage"
          defaultValue={props.rewardable?.successMessage}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="successMessage" className="rw-field-error" />

        <Label
          name="listPublicly"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          List publicly
        </Label>

        <CheckboxField
          name="listPublicly"
          defaultChecked={props.rewardable?.listPublicly}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="listPublicly" className="rw-field-error" />

        <Label
          name="type"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Type
        </Label>

        <div className="rw-check-radio-items">
          <RadioField
            id="rewardable-type-0"
            name="type"
            defaultValue="PUZZLE"
            defaultChecked={props.rewardable?.type?.includes('PUZZLE')}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
          <div>Puzzle</div>
        </div>

        <div className="rw-check-radio-items">
          <RadioField
            id="rewardable-type-1"
            name="type"
            defaultValue="PACK"
            defaultChecked={props.rewardable?.type?.includes('PACK')}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
          <div>Pack</div>
        </div>

        <div className="rw-check-radio-items">
          <RadioField
            id="rewardable-type-2"
            name="type"
            defaultValue="BUNDLE"
            defaultChecked={props.rewardable?.type?.includes('BUNDLE')}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
          <div>Bundle</div>
        </div>

        <FieldError name="type" className="rw-field-error" />

        <Label
          name="orgId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Org id
        </Label>

        <TextField
          name="orgId"
          defaultValue={props.rewardable?.orgId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="orgId" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default RewardableForm
