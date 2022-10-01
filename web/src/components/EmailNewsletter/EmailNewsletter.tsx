import { useForm } from '@formspree/react'

import Button from 'src/components/Button/Button'

const EmailNewsletter = () => {
  const [state, handleSubmit] = useForm('xnqrqdaq')
  if (state.succeeded) {
    return (
      <div data-cy="email-newsletter-success">Thank you for signing up!</div>
    )
  }
  return (
    <form
      data-cy="email-newsletter"
      onSubmit={handleSubmit}
      method="POST"
      className="sm:mx-auto sm:max-w-xl lg:mx-0"
    >
      <div className="sm:flex">
        <div className="min-w-0 flex-1">
          <label htmlFor="email" className="sr-only">
            Email address
          </label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="Enter your email"
            className="block w-full rounded-md border-0 px-4 py-3 text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:ring-offset-2 focus:ring-offset-gray-900"
          />
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-3">
          <Button
            type="submit"
            variant="purple"
            disabled={state.submitting}
            text="Subscribe"
            fullWidth
          />
        </div>
      </div>
    </form>
  )
}

export default EmailNewsletter
