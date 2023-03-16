import type {
  QueryResolvers,
  MutationResolvers,
  OrganizationUserRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const organizationUsers: QueryResolvers['organizationUsers'] = () => {
  return db.organizationUser.findMany()
}

export const organizationUser: QueryResolvers['organizationUser'] = ({
  id,
}) => {
  return db.organizationUser.findUnique({
    where: { id },
  })
}

export const createOrganizationUser: MutationResolvers['createOrganizationUser'] =
  ({ input }) => {
    return db.organizationUser.create({
      data: input,
    })
  }

export const updateOrganizationUser: MutationResolvers['updateOrganizationUser'] =
  ({ id, input }) => {
    return db.organizationUser.update({
      data: input,
      where: { id },
    })
  }

export const deleteOrganizationUser: MutationResolvers['deleteOrganizationUser'] =
  ({ id }) => {
    return db.organizationUser.delete({
      where: { id },
    })
  }

export const OrganizationUser: OrganizationUserRelationResolvers = {
  organization: (_obj, { root }) => {
    return db.organizationUser
      .findUnique({ where: { id: root?.id } })
      .organization()
  },
  user: (_obj, { root }) => {
    return db.organizationUser.findUnique({ where: { id: root?.id } }).user()
  },
}
