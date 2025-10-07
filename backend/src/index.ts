import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { serve } from '@hono/node-server'
import { RPCHandler } from '@orpc/server/fetch'
import { allowedOrigins, port, config } from './config/env_config.js'
import { logger } from './utils/logger.js'
import { router } from './routes/_app.js'
import { seedAdmin } from './database/seeds/admin-seed.js'

const app = new Hono()

// CORS
app.use('*', cors({
  origin: (origin, _c) => {
    return allowedOrigins.includes(origin) ? origin : null
  },
  allowMethods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  allowHeaders: ['Content-Type', 'Authorization'],
  exposeHeaders: ['Content-Length', 'Content-Type'],
  credentials: true,
  maxAge: 600,
}))

let Auth: any = null

// Request logging middleware
app.use('*', async (c, next) => {
  const startedAt = Date.now()
  await next()
  const durationMs = Date.now() - startedAt
  logger.info(`${c.req.method} ${c.req.path} ${c.res.status} - ${durationMs}ms`, {
    version: config.version,
    env: config.nodeEnv,
    durationMs,
    method: c.req.method,
    path: c.req.path,
    status: c.res.status,
  })
})

// Auth routes via Better Auth fetch-style handler
app.on(['GET', 'POST'], '/api/auth/*', async (c) => {
  if (!Auth) {
    return c.json({ error: 'Authentication service not ready' }, 503)
  }
  try {
    return await ('handler' in Auth ? Auth.handler(c.req.raw) : (Auth as any)(c.req.raw))
  } catch (error) {
    logger.error('Auth handler error:', {
      error,
      version: config.version,
      env: config.nodeEnv,
      path: c.req.path,
      method: c.req.method,
    })
    return c.json({ error: 'Authentication error' }, 500)
  }
})

// ORPC via Fetch adapter
const rpcHandler = new RPCHandler(router)
app.all('/rpc/*', async (c) => {
  try {
    const { matched, response } = await rpcHandler.handle(c.req.raw, {
      prefix: '/rpc',
      context: {},
    })
    if (matched) {
      return response
    }
    return c.notFound()
  } catch (error) {
    logger.error('RPC handler error:', {
      error,
      version: config.version,
      env: config.nodeEnv,
      path: c.req.path,
      method: c.req.method,
    })
    return c.json({ error: 'RPC error' }, 500)
  }
})

// Start server
const startServer = async () => {
  try {
    const { auth } = await import('./utils/auth.js')
    Auth = auth

    // Seed admin user
    await seedAdmin()

    serve({
      port,
      fetch: app.fetch,
    })
    logger.info(`Server listening on port ${port}`, { version: config.version, env: config.nodeEnv })
  } catch (error) {
    logger.error('Failed to start server:', { error, version: config.version, env: config.nodeEnv })
    process.exit(1)
  }
}

startServer()