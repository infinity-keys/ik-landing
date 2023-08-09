import clsx from 'clsx'
import { LensFormMutation, LensFormMutationVariables } from 'types/graphql'

import {
  Form,
  Label,
  TextField,
  FieldError,
  Submit,
  useForm,
} from '@redwoodjs/forms'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/dist/toast'

import Seo from 'src/components/Seo/Seo'

const LENS_FORM_MUTATION = gql`
  mutation LensFormMutation($input: AddLensFormInput!) {
    addLensForm(input: $input) {
      success
    }
  }
`

type FormDataType = {
  Name: string
  'Wallet Address': string
  'Social Account One': string
  'Social Account Two'?: string
}

const LensProfileFormPage = () => {
  const [submitForm, { loading, data }] = useMutation<
    LensFormMutation,
    LensFormMutationVariables
  >(LENS_FORM_MUTATION, {
    onError() {
      toast.error('An error occurred submitting the form.')
    },
  })
  const formMethods = useForm<FormDataType>()

  const onSubmit = (data: FormDataType) => {
    submitForm({
      variables: {
        input: {
          name: data['Name'],
          walletAddress: data['Wallet Address'],
          socialLinkOne: data['Social Account One'],
          socialLinkTwo: data['Social Account Two'] || null,
        },
      },
    })
  }

  return (
    <>
      <Seo title="LensProfileForm" />

      <div className="mx-auto max-w-xl rounded-md bg-black/30 p-8">
        <h1 className="mb-8 text-3xl font-bold text-white">
          {data?.addLensForm.success
            ? 'Thank you!'
            : 'Request Your Lens Profile'}
        </h1>

        {data?.addLensForm.success ? (
          <div>The form has been successfully submitted.</div>
        ) : (
          <Form
            onSubmit={onSubmit}
            formMethods={formMethods}
            className={clsx('flex flex-col', {
              'opacity-50': loading,
            })}
          >
            <div className="relative mb-4 flex flex-1 flex-col pb-7">
              <Label
                name="Name"
                className="mb-1 text-sm"
                errorClassName="mb-1 text-sm"
              />
              <TextField
                disabled={loading}
                name="Name"
                className="rounded border-brand-gray-secondary bg-transparent"
                errorClassName="rounded border-red-400 bg-transparent"
                validation={{ required: true }}
              />
              <FieldError
                name="Name"
                className="absolute left-0 bottom-0 text-sm italic text-gray-150"
              />
            </div>

            <div className="relative mb-4 flex flex-col pb-7">
              <Label
                name="Wallet Address"
                className="mb-1 text-sm"
                errorClassName="mb-1 text-sm"
              />
              <TextField
                disabled={loading}
                name="Wallet Address"
                className="rounded border-brand-gray-secondary bg-transparent placeholder:text-gray-200"
                errorClassName="rounded border-red-400 bg-transparent"
                validation={{
                  required: true,
                  pattern: {
                    value: /^0x[a-fA-F0-9]{40}$/,
                    message: 'Invalid Ethereum address',
                  },
                }}
                placeholder="0x123..."
              />
              <FieldError
                name="Wallet Address"
                className="absolute left-0 bottom-0 text-sm italic text-gray-150"
              />
            </div>

            <div className="relative mb-3 flex flex-col pb-7">
              <Label
                name="Link to Social Media Account"
                className="mb-1 text-sm"
                errorClassName="mb-1 text-sm"
              />
              <TextField
                disabled={loading}
                name="Social Account One"
                className="rounded border-brand-gray-secondary bg-transparent placeholder:text-gray-200"
                errorClassName="rounded border-red-400 bg-transparent"
                validation={{
                  required: true,
                  pattern: {
                    value: /^https?:\/\//,
                    message: 'Link must start with http:// or https://',
                  },
                }}
              />
              <FieldError
                name="Social Account One"
                className="absolute left-0 bottom-0 text-sm italic text-gray-150"
              />
            </div>

            <div className="relative mb-3 flex flex-col pb-7">
              <Label
                name="Link to Another Social Media Account (optional)"
                className="mb-1 text-sm"
                errorClassName="mb-1 text-sm"
              />
              <TextField
                disabled={loading}
                name="Social Account Two"
                className="rounded border-brand-gray-secondary bg-transparent placeholder:text-gray-200"
                errorClassName="rounded border-red-400 bg-transparent"
                validation={{
                  pattern: {
                    value: /^https?:\/\//,
                    message: 'Link must start with http:// or https://',
                  },
                }}
              />
              <FieldError
                name="Social Account Two"
                className="absolute left-0 bottom-0 text-sm italic text-gray-150"
              />
            </div>

            <Submit
              className="rounded bg-brand-accent-primary py-2 text-white transition-colors hover:bg-brand-accent-secondary"
              disabled={loading}
            >
              Submit
            </Submit>
          </Form>
        )}
      </div>
    </>
  )
}

export default LensProfileFormPage
