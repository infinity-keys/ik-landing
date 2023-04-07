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
import { useRef } from 'react'

type FormStepNftCheck = NonNullable<EditStepNftCheckById['stepNftCheck']>

interface StepNftCheckFormProps {
  stepNftCheck?: EditStepNftCheckById['stepNftCheck']
  onSave?: (data: UpdateStepNftCheckInput, id?: FormStepNftCheck['id']) => void
  error?: RWGqlError
  loading?: boolean
  handleSetNftCheckData: (data: {
    tempId: number
    contractAddress?: string
    tokenId?: number
    poapEventId?: string
    chainId?: number
  }) => void
}

const StepNftCheckForm = (props: StepNftCheckFormProps) => {
  const contractRef = useRef<HTMLInputElement>(null)
  const chainRef = useRef<HTMLInputElement>(null)
  const poapRef = useRef<HTMLInputElement>(null)
  const tokenIdRef = useRef<HTMLInputElement>(null)

  const handleOnClick = (e) => {
    e.preventDefault()

    props.handleSetNftCheckData({
      tempId: new Date().getTime(),
      contractAddress: contractRef.current.value || null,
      chainId: chainRef.current.value ? parseInt(chainRef.current.value) : null,
      tokenId: tokenIdRef.current.value
        ? parseInt(tokenIdRef.current.value)
        : null,
      poapEventId: poapRef.current.value || null,
    })

    contractRef.current.value = ''
    chainRef.current.value = ''
    tokenIdRef.current.value = ''
    poapRef.current.value = ''
  }

  return (
    <div className="rw-form-wrapper">
      <Label
        name="stepTypeData.requireAllNfts"
        className="rw-label"
        errorClassName="rw-label rw-label-error"
      >
        Require all nfts
      </Label>

      <CheckboxField
        name="stepTypeData.requireAllNfts"
        defaultChecked={true}
        className="rw-input"
        errorClassName="rw-input rw-input-error"
      />

      <FieldError
        name="stepTypeData.requireAllNfts"
        className="rw-field-error"
      />

      <div className="mt-4 flex flex-col">
        <label htmlFor="contractAddress">Contract Address</label>
        <input type="text" id="contractAddress" ref={contractRef} />
      </div>

      <div className="mt-4 flex flex-col">
        <label htmlFor="chainId">Chain Id</label>
        <input type="number" id="chainId" min={0} ref={chainRef} />
      </div>

      <div className="mt-4 flex flex-col">
        <label htmlFor="tokenId">Token Id</label>
        <input type="number" id="tokenId" min={0} ref={tokenIdRef} />
      </div>

      <div className="mt-4 flex flex-col">
        <label htmlFor="poapId">Poap Event Id</label>
        <input type="text" id="poapId" ref={poapRef} />
      </div>

      <button
        className="mt-4 border bg-slate-300 py-1 px-3"
        onClick={handleOnClick}
      >
        Add NFT Check
      </button>
    </div>
  )
}

export default StepNftCheckForm
