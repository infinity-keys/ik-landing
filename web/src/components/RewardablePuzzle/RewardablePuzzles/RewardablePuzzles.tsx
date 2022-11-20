import type {
  DeleteRewardableMutationVariables,
  FindRewardables,
} from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/RewardablePuzzle/RewardablePuzzlesCell'
import {
  checkboxInputTag,
  formatEnum,
  timeTag,
  truncate,
} from 'src/lib/formatters'

const DELETE_REWARDABLE_MUTATION = gql`
  mutation DeleteRewardableMutation($id: String!) {
    deleteRewardable(id: $id) {
      id
    }
  }
`

const RewardablesList = ({ rewardables }: FindRewardables) => {
  const [deleteRewardable] = useMutation(DELETE_REWARDABLE_MUTATION, {
    onCompleted: () => {
      toast.success('Rewardable deleted')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id: DeleteRewardableMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete rewardable ' + id + '?')) {
      deleteRewardable({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Created at</th>
            <th>Updated at</th>
            <th>Name</th>
            <th>Slug</th>
            <th>Explanation</th>
            <th>Success message</th>
            <th>List publicly</th>
            <th>Type</th>
            <th>Org id</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {rewardables.map((rewardable) => (
            <tr key={rewardable.id}>
              <td>{truncate(rewardable.id)}</td>
              <td>{timeTag(rewardable.createdAt)}</td>
              <td>{timeTag(rewardable.updatedAt)}</td>
              <td>{truncate(rewardable.name)}</td>
              <td>{truncate(rewardable.slug)}</td>
              <td>{truncate(rewardable.explanation)}</td>
              <td>{truncate(rewardable.successMessage)}</td>
              <td>{checkboxInputTag(rewardable.listPublicly)}</td>
              <td>{formatEnum(rewardable.type)}</td>
              <td>{truncate(rewardable.orgId)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.puzzle({ id: rewardable.id })}
                    title={'Show rewardable ' + rewardable.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editPuzzle({ id: rewardable.id })}
                    title={'Edit rewardable ' + rewardable.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete rewardable ' + rewardable.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(rewardable.id)}
                  >
                    Delete
                  </button>
                </nav>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default RewardablesList
