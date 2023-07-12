import type {
  QueryResolvers,
  MutationResolvers,
  DiscordConnectionRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const discordConnections: QueryResolvers['discordConnections'] = () => {
  return db.discordConnection.findMany()
}

export const discordConnection: QueryResolvers['discordConnection'] = ({
  id,
}) => {
  return db.discordConnection.findUnique({
    where: { id },
  })
}

export const createDiscordConnection: MutationResolvers['createDiscordConnection'] =
  ({ input }) => {
    return db.discordConnection.create({
      data: input,
    })
  }

export const updateDiscordConnection: MutationResolvers['updateDiscordConnection'] =
  ({ id, input }) => {
    return db.discordConnection.update({
      data: input,
      where: { id },
    })
  }

export const deleteDiscordConnection: MutationResolvers['deleteDiscordConnection'] =
  ({ id }) => {
    return db.discordConnection.delete({
      where: { id },
    })
  }

export const DiscordConnection: DiscordConnectionRelationResolvers = {
  user: (_obj, { root }) => {
    return db.discordConnection.findUnique({ where: { id: root?.id } }).user()
  },
}
