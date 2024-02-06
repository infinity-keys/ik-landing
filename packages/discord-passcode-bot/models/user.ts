import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  discordId: { type: String, required: true, unique: true },
})

export const User = mongoose.model('User', userSchema)
