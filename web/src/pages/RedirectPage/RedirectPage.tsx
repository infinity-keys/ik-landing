import Seo from 'src/components/Seo/Seo'
import { useRedirection } from 'src/providers/redirection'

const RedirectPage = () => {
  const { errorMessage, successMessage, isLoading } = useRedirection()

  if (isLoading)
    return (
      <div className="flex min-h-screen min-w-full items-center justify-center">
        Loading...
      </div>
    )

  return (
    <div className="flex justify-center">
      <Seo title="Redirect" />

      <div className="w-full max-w-md rounded-lg bg-black/20 p-12 text-center">
        {typeof errorMessage === 'string' ? (
          <>
            <h1 className="font-bold">Oops - there was an issue</h1>
            <p className="mt-4 text-brand-accent-secondary">
              {errorMessage.substring(0, 200)}
            </p>
          </>
        ) : (
          <div>
            <h1 className="text-2xl font-bold text-brand-accent-primary">
              {successMessage}
            </h1>
            <p className="mt-4">You will be redirected shortly</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default RedirectPage
