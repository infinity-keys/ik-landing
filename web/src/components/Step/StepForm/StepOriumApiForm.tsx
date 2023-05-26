import { FieldError, Label, SelectField } from '@redwoodjs/forms'

const StepSimpleTextForm = () => {
  return (
    <div className="rw-form-wrapper">
      <Label
        name="stepTypeData.checkType"
        className="rw-label"
        errorClassName="rw-label rw-label-error"
      >
        Check Type
      </Label>

      <SelectField
        name="stepTypeData.checkType"
        className="rw-input"
        errorClassName="rw-input rw-input-error"
        validation={{ required: true }}
      >
        <option>HAS_CREATED_VAULT</option>
        <option> HAS_DEPOSITED_NFT</option>
        <option>HAS_CREATED_SCHOLARSHIP</option>
      </SelectField>

      <FieldError name="stepTypeData.checkType" className="rw-field-error" />
    </div>
  )
}

export default StepSimpleTextForm
