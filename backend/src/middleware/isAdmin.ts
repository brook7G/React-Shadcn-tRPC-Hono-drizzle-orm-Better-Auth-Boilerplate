import { os } from '@orpc/server'

type User = {
  role: string
  // add other user fields if needed
}

type ContextWithUser = {
  user?: User
}

// Middleware to check if user is admin
export const isAdmin = os.middleware<ContextWithUser, unknown>(async (ctx, next) => {
  if (!ctx.user || ctx.user.role !== 'admin') {
    throw new Error('Not authorized: Admins only')
  }
  return next()
})
