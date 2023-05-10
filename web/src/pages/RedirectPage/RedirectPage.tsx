import LoadingIcon from 'src/components/LoadingIcon/LoadingIcon'
import Seo from 'src/components/Seo/Seo'
import { useRedirection } from 'src/providers/redirection'

const RedirectPage = () => {
  const { errorMessage, successMessage, isLoading } = useRedirection()

  if (isLoading) return <LoadingIcon />

  return (
    <div className="flex justify-center">
      <Seo title="Redirect" />

      <div className="w-full max-w-md rounded-lg border-2 border-brand-accent-primary/10 bg-black/20 py-12 px-6 text-center">
        {typeof errorMessage === 'string' ? (
          <>
            <h1 className="font-bold">Oops - there was an issue</h1>
            <p className="mt-4 text-brand-accent-secondary">
              {errorMessage.substring(0, 200)}
            </p>
          </>
        ) : (
          <>
            <h1 className="text-2xl font-bold text-brand-accent-primary">
              {successMessage}
            </h1>
            <p className="mt-4">You will be redirected shortly</p>
          </>
        )}
      </div>
    </div>
  )
}

export default RedirectPage