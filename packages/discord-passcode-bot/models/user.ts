import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  discordId: { type: String, required: true, unique: true },
  solvedPuzzles: [{ type: mongoose.Types.ObjectId, ref: 'Puzzle' }],
})

export const User = mongoose.model('User', userSchema)
