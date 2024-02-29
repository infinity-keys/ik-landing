import { CreatorToolsRoleMutation } from 'types/graphql'

import { routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/dist/toast'

import { useAuth } from 'src/auth'
import Button from 'src/components/Button'
import LoadingIcon from 'src/components/LoadingIcon/LoadingIcon'
import Seo from 'src/components/Seo/Seo'

const CREATOR_TOOLS_ROLE_MUTATION = gql`
  mutation CreatorToolsRoleMutation {
    addCreatorToolsRole {
      success
    }
  }
`

const CreatorToolsTesterPage = () => {
  const { hasRole } = useAuth()

  const [addRole, { loading, data }] = useMutation<CreatorToolsRoleMutation>(
    CREATOR_TOOLS_ROLE_MUTATION,
    {
      onError() {
        toast.error('Something went wrong with your request.')
      },
      onCompleted({ addCreatorToolsRole }) {
        if (addCreatorToolsRole.success) {
          return toast('Success')
        }

        toast.error('Something went wrong with your request.')
      },
    }
  )
  return (
    <>
      <Seo title="Get the Creator Tools tester role" />

      <div className="flex min-h-[calc(100vh-80px)] items-center justify-center text-center">
        {!loading &&
          (hasRole('CREATOR_TOOLS_TESTER') ||
          data?.addCreatorToolsRole.success ? (
            <div>
              <p className="mb-8 text-xl">You are a Creator Tools tester!</p>
              <Button solid to={routes.formArchetype()}>
                Create a Puzzle
              </Button>
            </div>
          ) : (
            <div>
              <p className="mb-8 text-xl">
                Get the Creator Tools tester role to start creating your own
                puzzles.
              </p>
              <Button solid onClick={addRole} disabled={loading}>
                Get Role
              </Button>
            </div>
          ))}

        {loading && <LoadingIcon />}
      </div>
    </>
  )
}

export default CreatorToolsTesterPage
