import mongoose from 'mongoose'

const puzzleSchema = new mongoose.Schema({
  title: {
    type: String,
    unique: true,
  },
  text: String,
  passcode: String,
  image: String,
})

export const Puzzle = mongoose.model('PasscodePuzzle', puzzleSchema)
