import { useForm, SelectField, Form, TextField } from '@redwoodjs/forms'

type RewardableShared = {
  name: string
  slug: string
}

type RewardablePuzzle = RewardableShared & {
  stepId: number
}

type RewardablePack = RewardableShared & {
  rewardablePuzzles: string[]
}

const RewardableForm = () => {
  const formMethods = useForm<RewardableShared>()

  const onSubmit = (data) => {
    console.log(data)
  }

  return (
    <div>
      <Form formMethods={formMethods} onSubmit={onSubmit}>
        <TextField name="name"></TextField>
        <TextField name="slug"></TextField>
        <SelectField name="rewardableType">
          <option value="puzzle">Puzzle</option>
          <option value="pack">Pack</option>
        </SelectField>
      </Form>
    </div>
  )
}

export default RewardableForm

// material ai
// controller
// https://echobind.com/post/conditionally-render-fields-using-react-hook-form

// Form Design (Bloom Dictates)
// you choose puzzle...
// then you see the puzzle form
//
