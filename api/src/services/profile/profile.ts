import { db } from 'src/lib/db'

export const deleteUserProgress = async () => {
  console.log('deleteUserProgress is accessible')
  // ... rest of your function ...
  return 'deleteUserProgress is accessible'
}

export const resolvers = {
  Mutation: {
    deleteUserProgress,
  },
}
