import {
  CreateSubmissionMutation,
  CreateSubmissionMutationVariables,
} from 'types/graphql'

import {
  FieldError,
  Form,
  FormError,
  Label,
  TextField,
  Submit,
  SubmitHandler,
} from '@redwoodjs/forms'
import { useMutation } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/toast'

interface EmailSubmissionProps {
  puzzleId: string
  userId: string
}

interface FormValues {
  email: string
}

const CREATE_SUBMISSION_MUTATION = gql`
  mutation CreateSubmissionMutation($input: CreateSubmissionInput!) {
    createSubmission(input: $input) {
      data
      puzzleId
    }
  }
`

const EmailSubmission = ({ puzzleId, userId }: EmailSubmissionProps) => {
  const [create, { loading, error }] = useMutation<
    CreateSubmissionMutation,
    CreateSubmissionMutationVariables
  >(CREATE_SUBMISSION_MUTATION, {
    onCompleted: () => {
      // @TODO: clear field
      toast.success('Thank you for your submission!')
    },
  })

  const onSubmit: SubmitHandler<FormValues> = ({ email }) => {
    create({
      variables: {
        input: {
          data: { email },
          puzzleId,
          userId,
        },
      },
    })
  }

  return (
    <div>
      {/* @TODO: Toaster is hidden behind header (z-index) */}
      <Toaster />
      <Form onSubmit={onSubmit} config={{ mode: 'onBlur' }}>
        <FormError error={error} wrapperClassName="form-error" />

        <Label name="email" errorClassName="error">
          Email
        </Label>
        <TextField
          name="email"
          validation={{
            required: true,
            pattern: {
              value: /^[^@]+@[^.]+\..+$/,
              message: 'Please enter a valid email address',
            },
          }}
          errorClassName="error"
        />
        <FieldError name="email" className="error" />

        <Submit disabled={loading}>Save</Submit>
      </Form>
    </div>
  )
}

export default EmailSubmission
