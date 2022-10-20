import { z } from 'zod'

export const emailSchema = z.string().min(5).email()
