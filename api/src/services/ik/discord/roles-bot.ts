import discord from 'discord.js'
import type { MutationResolvers } from 'types/graphql'

import { db } from 'src/lib/db'
import { logger } from 'src/lib/logger'

const client = new discord.Client({
  intents: ['Guilds'],
})

client.login(process.env.DISCORD_ROLES_BOT_KEY)

const tokenToRolesLookup: {
  [key: string]: string
} = {
  '121': '1052737472083267645',
  '110': '1052737472083267645',
  '117': '1069804182225293383',
  '143': '1087720699747115028',
  '150': '1087720699747115028',
  '157': '1105987236966715482',
  '3': '1105987236966715482',
  '155': '1095812191371923506',
  '160': '1099693363533463552',
  '153': '1117864259511140424',
  '146': '1117657824395284520',
  '154': '1096866085157994558',
  '174': '1114587675521990656',
  '122': '1090981608275853344',
}

export const syncDiscordRoles: MutationResolvers['syncDiscordRoles'] =
  async () => {
    try {
      // Grab the Discord id off the user's authId. This will eventually change
      // when we add option to connect Discord to all users
      const discordId = context.currentUser?.authId?.split('DISCORD-')[1]

      if (!discordId) {
        throw new Error(
          'This feature is currently only available to profiles using Discord login. It is coming soon to all users.'
        )
      }

      // Get all the user's claimed NFTs from their user rewards
      const userRewards = await db.userReward.findMany({
        where: {
          userId: context.currentUser?.id,
        },
        select: {
          nfts: {
            select: {
              tokenId: true,
            },
          },
        },
      })

      // Get unique set of just the token ids
      const claimedNfts = new Set(
        userRewards.flatMap(({ nfts }) =>
          nfts.length ? nfts.map(({ tokenId }) => tokenId) : []
        )
      )

      // Get only the token ids that correlate to a Discord role
      const eligibleNfts = Array.from(claimedNfts).filter(
        (tokenId) => tokenId.toString() in tokenToRolesLookup
      )

      if (!eligibleNfts.length) {
        return { success: true, message: 'No new roles available' }
      }

      // Get the server data
      const guild = await client.guilds.fetch(
        process.env.DISCORD_ROLES_GUILD_ID || ''
      )

      // Get the user if they are in the server
      // @TODO: Cache was not updating when role was removed in Discord. When
      // fixed, we can remove { force: true }
      const member = await guild.members.fetch({ user: discordId, force: true })

      // Make array of roles they are eligible for but do not already have
      const newRoles = eligibleNfts.flatMap((tokenId) => {
        const roles = tokenToRolesLookup[tokenId.toString()]
        const hasRoles = Array.isArray(roles)
          ? roles.every((r) => member.roles.cache.has(r))
          : member.roles.cache.has(roles)

        return !hasRoles ? roles : []
      })

      // User already has all their roles
      if (!newRoles.length) {
        return { success: true, message: 'Your roles are up to date.' }
      }

      // Add all the roles
      await member.roles.add(newRoles)

      return {
        success: true,
        message: `Added ${newRoles.length} new ${
          newRoles.length === 1 ? 'role' : 'roles'
        }`,
      }
    } catch (e) {
      logger.error('Error in /roles-bot', e)

      if (e instanceof Error) {
        return e.message === 'Unknown User'
          ? {
              success: false,
              errors: [
                'Please join the Infinity Keys server to get your new roles.',
              ],
            }
          : { success: false, errors: [e.message] }
      }

      return { success: false, errors: ['Error syncing Discord roles.'] }
    }
  }
