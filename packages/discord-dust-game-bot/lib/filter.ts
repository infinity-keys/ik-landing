import { MessageReaction } from 'discord.js'

const filter = (reaction: MessageReaction) => {
  return (
    reaction.emoji.id === process.env.EMOJI_REACTION_IK_ID ||
    reaction.emoji.id === '1065285126935805962' ||
    reaction.emoji.id === '1106277546498199602' ||
    reaction.emoji.id === '1083028535314239610' ||
    reaction.emoji.id === '1083028536568320111'
  )
}
export { filter }
