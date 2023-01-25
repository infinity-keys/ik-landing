import type {
  QueryResolvers,
  MutationResolvers,
  SolveRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const solves: QueryResolvers['solves'] = () => {
  return db.solve.findMany()
}

export const solve: QueryResolvers['solve'] = ({ id }) => {
  return db.solve.findUnique({
    where: { id },
  })
}

export const createSolve: MutationResolvers['createSolve'] = ({ input }) => {
  return db.solve.create({
    data: input,
  })
}

export const updateSolve: MutationResolvers['updateSolve'] = ({
  id,
  input,
}) => {
  return db.solve.update({
    data: input,
    where: { id },
  })
}

export const deleteSolve: MutationResolvers['deleteSolve'] = ({ id }) => {
  return db.solve.delete({
    where: { id },
  })
}

export const Solve: SolveRelationResolvers = {
  user: (_obj, { root }) => {
    return db.solve.findUnique({ where: { id: root?.id } }).user()
  },
  attempt: (_obj, { root }) => {
    return db.solve.findUnique({ where: { id: root?.id } }).attempt()
  },
}
