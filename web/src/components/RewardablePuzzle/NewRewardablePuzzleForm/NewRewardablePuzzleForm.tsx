import { DevTool } from '@hookform/devtools'

import { Form, useForm } from '@redwoodjs/forms'

export default () => {
  const { register, control } = useForm({
    mode: 'onChange',
  })

  const onSubmit = () => {
    console.log('submitted')
  }

  return (
    <>
      <Form onSubmit={onSubmit}>
        <h1>React Hook Form DevTools</h1>

        <label htmlFor="test">Test</label>
        <input id="test" {...register('test')} />

        <input type="submit" />
      </Form>
      <DevTool placement="bottom-right" control={control} />{' '}
      {/* set up the dev tool */}
    </>
  )
}
