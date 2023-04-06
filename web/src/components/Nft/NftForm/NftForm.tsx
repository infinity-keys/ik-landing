import {
  Form,
  FormError,
  FieldError,
  Label,
  NumberField,
  TextField,
  TextAreaField,
  Submit,
} from '@redwoodjs/forms'

import type { EditNftById, UpdateNftInput } from 'types/graphql'
import type { RWGqlError } from '@redwoodjs/forms'

type FormNft = NonNullable<EditNftById['nft']>

interface NftFormProps {
  nft?: EditNftById['nft']
  onSave?: (data: UpdateNftInput, id?: FormNft['id']) => void
  error?: RWGqlError
  loading?: boolean
}

const NftForm = (props: NftFormProps) => {
  const onSubmit = (data: FormNft) => {
    props.onSave(data, props?.nft?.id)
  }

  return (
    <div className="rw-form-wrapper mt-8">
      <Label
        name="nft.tokenId"
        className="rw-label"
        errorClassName="rw-label rw-label-error"
      >
        Token id
      </Label>

      <NumberField
        name="nft.tokenId"
        defaultValue={props.nft?.tokenId}
        className="rw-input"
        errorClassName="rw-input rw-input-error"
        // validation={{ required: true }}
        min={0}
      />

      <FieldError name="nft.tokenId" className="rw-field-error" />

      <Label
        name="nft.contractName"
        className="rw-label"
        errorClassName="rw-label rw-label-error"
      >
        Contract name
      </Label>

      <TextField
        name="nft.contractName"
        defaultValue={props.nft?.contractName}
        className="rw-input"
        errorClassName="rw-input rw-input-error"
        // validation={{ required: true }}
      />

      <FieldError name="nft.contractName" className="rw-field-error" />

      <Label
        name="nft.data"
        className="rw-label"
        errorClassName="rw-label rw-label-error"
      >
        Data
      </Label>

      <TextAreaField
        name="nft.data"
        defaultValue={JSON.stringify(props.nft?.data)}
        className="rw-input min-h-[200px]"
        errorClassName="rw-input rw-input-error"
        validation={{
          valueAsJSON: true,
          // required: true
        }}
      />

      <FieldError name="nft.data" className="rw-field-error" />

      <Label
        name="nft.cloudinaryId"
        className="rw-label"
        errorClassName="rw-label rw-label-error"
      >
        Cloudinary id
      </Label>

      <TextField
        name="nft.cloudinaryId"
        defaultValue={props.nft?.cloudinaryId}
        className="rw-input"
        errorClassName="rw-input rw-input-error"
        // validation={{ required: true }}
      />

      <FieldError name="nft.cloudinaryId" className="rw-field-error" />
    </div>
  )
}

export default NftForm
