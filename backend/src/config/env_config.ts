import 'dotenv/config'

const nodeEnv = process.env.NODE_ENV ?? 'development'
const version = process.env.VERSION ?? process.env.npm_package_version ?? '1.0.0'
const logLevel = (process.env.LOG_LEVEL ?? 'info') as 'silent' | 'error' | 'warn' | 'info' | 'debug' | 'trace'

const defaultDevOrigins = [
  'http://localhost:3000',
  'http://localhost:5173',
  'http://127.0.0.1:5173',
]

const corsAllowedOriginsEnv = process.env.CORS_ALLOWED_ORIGINS ?? ''
export const allowedOrigins = (corsAllowedOriginsEnv
  ? corsAllowedOriginsEnv.split(',')
  : nodeEnv === 'development'
    ? defaultDevOrigins
    : []
)
  .map((o: string) => o.trim())
  .filter(Boolean)

export const corsOptions = {
  origin: (origin: string | undefined) => {
    if (!origin) {
      // Allow non-browser requests (e.g., health checks, curl) by default
      return '*'
    }
    return allowedOrigins.includes(origin) ? origin : null
  },
  allowMethods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  allowHeaders: ['Content-Type', 'Authorization'],
  exposeHeaders: ['Content-Length', 'Content-Type'],
  credentials: true,
  maxAge: 600,
}

export const port = Number(process.env.PORT ?? 3000)

export const config = {
  nodeEnv,
  allowedOrigins,
  port,
  version,
  logLevel,
  mysql: {
    host: process.env.MYSQL_HOST ?? '127.0.0.1',
    port: Number(process.env.MYSQL_PORT ?? 3306),
    user: process.env.MYSQL_USER ?? 'root',
    password: process.env.MYSQL_PASSWORD ?? '',
    database: process.env.MYSQL_DATABASE ?? 'app',
    connectionLimit: Number(process.env.MYSQL_CONNECTION_LIMIT ?? 10),
  },
  loginEnabled: (process.env.LOGIN_ENABLED),
  registerEnabled: (process.env.REGISTER_ENABLED),
  forgotPasswordEnabled: (process.env.FORGOT_PASSWORD_ENABLED),
  resetPasswordEnabled: (process.env.RESET_PASSWORD_ENABLED),
  otpEnabled: (process.env.OTP_ENABLED),
}


