import { os } from '@orpc/server'
import { auth } from './auth.js'

// Middleware to check if user is admin
export const isAdmin = os.middleware(async (ctx, next) => {
  if (!ctx.user || ctx.user.role !== 'admin') {
    throw new Error('Not authorized: Admins only')
  }
  return next()
})
