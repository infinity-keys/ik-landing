import {
  CreateSubmissionMutation,
  CreateSubmissionMutationVariables,
} from 'types/graphql'

import {
  FieldError,
  Form,
  Label,
  TextField,
  Submit,
  SubmitHandler,
} from '@redwoodjs/forms'
import { useMutation } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/toast'

const CREATE_SUBMISSION_MUTATION = gql`
  mutation CreateSubmissionMutation($input: CreateSubmissionInput!) {
    createSubmission(input: $input) {
      email
      address
      id
    }
  }
`

const EmailSubmission = () => {
  const [create, { loading, error }] = useMutation<
    CreateSubmissionMutation,
    CreateSubmissionMutationVariables
  >(CREATE_SUBMISSION_MUTATION, {
    onCompleted: () => {
      toast.success('Thank you for your submission!')
    },
  })

  const onSubmit: SubmitHandler<any> = ({ email }) => {
    create({
      variables: {
        input: {
          email,
          puzzleId: '12',
          userId: '12',
        },
      },
    })
  }

  return (
    <div>
      <Toaster />
      <Form onSubmit={onSubmit} config={{ mode: 'onBlur' }}>
        <Label name="email" errorClassName="error">
          Email
        </Label>
        <TextField
          name="email"
          validation={{ required: true }}
          errorClassName="error"
        />
        <FieldError name="email" className="error" />

        <Submit disabled={loading}>Save</Submit>
      </Form>
    </div>
  )
}

export default EmailSubmission
