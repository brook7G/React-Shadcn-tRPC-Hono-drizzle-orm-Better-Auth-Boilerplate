
import { handshake } from '../utils/handshake.js'
import { isAdmin } from '../middleware/index.js'
import { os } from '@orpc/server'

// Example: protected admin route
const adminHello = os.handler<{ user?: { name?: string } }>(async (opt) => {
  // Extract user from opt.context, assuming context is attached there
  const ctx = opt.context as { user?: { name?: string } };
  await isAdmin(opt);
  return { user: { name: ctx.user?.name || '' } }
})

export const router = {
  handshake,
  adminHello, // now protected by isAdmin middleware
}

export type AppRouter = typeof router