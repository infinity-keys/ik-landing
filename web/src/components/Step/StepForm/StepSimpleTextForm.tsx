import { FieldError, Label, TextField } from '@redwoodjs/forms'

const StepSimpleTextForm = () => {
  return (
    <div className="rw-form-wrapper">
      <Label
        name="stepTypeData.solution"
        className="rw-label"
        errorClassName="rw-label rw-label-error"
      >
        Solution
      </Label>

      <TextField
        name="stepTypeData.solution"
        className="rw-input"
        errorClassName="rw-input rw-input-error"
        validation={{ required: true }}
      />

      <FieldError name="stepTypeData.solution" className="rw-field-error" />
    </div>
  )
}

export default StepSimpleTextForm
