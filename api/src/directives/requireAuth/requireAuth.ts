import gql from 'graphql-tag'
import { SiteRole } from 'types/graphql'

import {
  createValidatorDirective,
  ValidatorDirectiveFunc,
} from '@redwoodjs/graphql-server'

import { requireAuth as applicationRequireAuth } from 'src/lib/auth'

export const schema = gql`
  """
  Use to check whether or not a user is authenticated and is associated
  with an optional set of roles.
  """
  directive @requireAuth(roles: [String]) on FIELD_DEFINITION
`

type RequireAuthValidate = ValidatorDirectiveFunc<{ roles?: SiteRole[] }>

const validate: RequireAuthValidate = ({ directiveArgs }) => {
  const { roles } = directiveArgs

  applicationRequireAuth({ roles })
}

const requireAuth = createValidatorDirective(schema, validate)

export default requireAuth
