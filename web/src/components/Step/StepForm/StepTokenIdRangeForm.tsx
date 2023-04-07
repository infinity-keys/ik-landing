import { FieldError, Label, TextField, NumberField } from '@redwoodjs/forms'

import type { UpdateStepTokenIdRangeInput } from 'types/graphql'
import type { RWGqlError } from '@redwoodjs/forms'

interface StepTokenIdRangeFormProps {
  onSave?: (data: UpdateStepTokenIdRangeInput) => void
  error?: RWGqlError
  loading?: boolean
}

const StepTokenIdRangeForm = (props: StepTokenIdRangeFormProps) => {
  return (
    <div className="rw-form-wrapper">
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
        validation={{ required: true }}
      />

      <FieldError
        name="stepTypeData.contractAddress"
        className="rw-field-error"
      />

      <Label
        name="stepTypeData.chainId"
        className="rw-label"
        errorClassName="rw-label rw-label-error"
      >
        Chain id{' '}
        <a
          href="https://docs.moralis.io/web3-data-api/evm/resolve-api#supported-chains"
          className="text-sm font-light text-gray-200 underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          A Moralis supported chain id
        </a>
      </Label>

      <TextField
        name="stepTypeData.chainId"
        className="rw-input"
        errorClassName="rw-input rw-input-error"
        validation={{ required: true }}
      />

      <FieldError name="stepTypeData.chainId" className="rw-field-error" />

      <Label
        name="stepTypeData.startId"
        className="rw-label"
        errorClassName="rw-label rw-label-error"
      >
        Start id
      </Label>

      <NumberField
        name="stepTypeData.startId"
        className="rw-input"
        errorClassName="rw-input rw-input-error"
        validation={{ required: true }}
      />

      <FieldError name="stepTypeData.startId" className="rw-field-error" />

      <Label
        name="stepTypeData.endId"
        className="rw-label"
        errorClassName="rw-label rw-label-error"
      >
        End id
      </Label>

      <NumberField
        name="stepTypeData.endId"
        className="rw-input"
        errorClassName="rw-input rw-input-error"
        validation={{ required: true }}
      />

      <FieldError name="stepTypeData.endId" className="rw-field-error" />
    </div>
  )
}

export default StepTokenIdRangeForm
