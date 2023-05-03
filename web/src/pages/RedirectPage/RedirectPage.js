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
    <div className="flex justify-center text-center">
      <Seo title="Redirect" />

      <div className="bg-black/20 py-8 px-12">
        {typeof errorMessage === 'string' ? (
          <>
            <h1 className="font-bold">Oops - there was an issue</h1>
            <p className="mt-4 text-orange-300">
              {errorMessage.substring(0, 200)}
            </p>
          </>
        ) : (
          <div>
            <h1 className="rounded text-2xl font-bold text-brand-accent-primary">
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
