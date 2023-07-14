import type {
  QueryResolvers,
  MutationResolvers,
  LensKeypConnectionRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const lensKeypConnections: QueryResolvers['lensKeypConnections'] =
  () => {
    return db.lensKeypConnection.findMany()
  }

export const lensKeypConnection: QueryResolvers['lensKeypConnection'] = ({
  id,
}) => {
  return db.lensKeypConnection.findUnique({
    where: { id },
  })
}

export const createLensKeypConnection: MutationResolvers['createLensKeypConnection'] =
  ({ input }) => {
    return db.lensKeypConnection.create({
      data: input,
    })
  }

export const updateLensKeypConnection: MutationResolvers['updateLensKeypConnection'] =
  ({ id, input }) => {
    return db.lensKeypConnection.update({
      data: input,
      where: { id },
    })
  }

export const deleteLensKeypConnection: MutationResolvers['deleteLensKeypConnection'] =
  ({ id }) => {
    return db.lensKeypConnection.delete({
      where: { id },
    })
  }

export const LensKeypConnection: LensKeypConnectionRelationResolvers = {
  user: (_obj, { root }) => {
    return db.lensKeypConnection.findUnique({ where: { id: root?.id } }).user()
  },
}
