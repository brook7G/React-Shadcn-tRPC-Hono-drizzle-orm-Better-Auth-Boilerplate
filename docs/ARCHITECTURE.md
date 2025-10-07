# Architecture Documentation

## System Overview

This is a full-stack web application built with modern technologies, featuring a React frontend and Node.js backend with MySQL database.

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │    Backend      │    │    Database     │
│   (React)       │◄──►│   (Hono.js)     │◄──►│    (MySQL)      │
│                 │    │                 │    │                 │
│ - React Router  │    │ - Better Auth   │    │ - Drizzle ORM   │
│ - shadcn/ui     │    │ - Admin Plugin  │    │ - Migrations    │
│ - React Query   │    │ - Rate Limiting │    │ - Seeding       │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## Frontend Architecture

### Technology Stack
- **React 18** - UI library with hooks and concurrent features
- **TypeScript** - Type safety and better developer experience
- **Vite** - Fast build tool and development server
- **React Router** - Client-side routing
- **React Query** - Server state management
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Reusable component library

### Folder Structure
```
frontend/src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui base components
│   ├── forms/          # Form components
│   └── layout/         # Layout components
├── hooks/              # Custom React hooks
│   ├── auth/           # Authentication hooks
│   └── api/            # API interaction hooks
├── pages/              # Page components
│   ├── admin/          # Admin panel pages
│   └── auth/           # Authentication pages
├── lib/                # Utility libraries
├── types/              # TypeScript type definitions
└── config/             # Configuration files
```

### Component Architecture
```
App
├── Router
│   ├── PublicRoutes
│   │   ├── HomePage
│   │   ├── LoginPage
│   │   └── RegisterPage
│   └── ProtectedRoutes
│       └── AdminPanel
│           ├── UserManagement
│           ├── Dashboard
│           └── Settings
└── GlobalProviders
    ├── QueryClient
    ├── AuthProvider
    └── ThemeProvider
```

### State Management
- **React Query** - Server state, caching, and synchronization
- **React Context** - Global state (auth, theme)
- **Local State** - Component-specific state with useState/useReducer
- **Form State** - Form handling with controlled components

## Backend Architecture

### Technology Stack
- **Hono.js** - Fast web framework for the edge
- **Better Auth** - Authentication and session management
- **Drizzle ORM** - Type-safe SQL toolkit
- **MySQL** - Relational database
- **Zod** - Runtime type validation

### Folder Structure
```
backend/src/
├── config/             # Configuration files
│   ├── env_config.ts   # Environment variables
│   └── betterauth_config.ts # Auth configuration
├── database/           # Database layer
│   ├── schema/         # Database schemas
│   ├── migrations/     # Database migrations
│   └── seeds/          # Database seeders
├── routes/             # API routes
├── middleware/         # Custom middleware
├── utils/              # Utility functions
│   ├── auth.ts         # Authentication setup
│   └── logger.ts       # Logging utility
└── index.ts            # Server entry point
```

### API Architecture
```
HTTP Request
    ↓
CORS Middleware
    ↓
Rate Limiting
    ↓
Request Logging
    ↓
Authentication Check
    ↓
Route Handler
    ↓
Business Logic
    ↓
Database Query
    ↓
Response
```

### Authentication Flow
```
1. User Registration:
   Phone Number → OTP → Verification → Account Creation

2. User Login:
   Phone + Password → Validation → Session Creation → JWT Token

3. Protected Routes:
   Request → JWT Validation → Role Check → Access Granted/Denied
```

## Database Architecture

### Schema Design
```sql
-- Users table
users
├── id (Primary Key)
├── name
├── email (Unique)
├── phoneNumber (Unique)
├── role (admin/user)
├── banned (Boolean)
├── emailVerified
├── phoneNumberVerified
├── createdAt
└── updatedAt

-- Sessions table
sessions
├── id (Primary Key)
├── userId (Foreign Key)
├── token (Unique)
├── expiresAt
├── ipAddress
├── userAgent
├── createdAt
└── updatedAt

-- Accounts table (Better Auth)
accounts
├── id (Primary Key)
├── userId (Foreign Key)
├── providerId
├── accountId
├── password (Hashed)
├── accessToken
├── refreshToken
├── createdAt
└── updatedAt
```

### Relationships
```
User (1) ←→ (Many) Sessions
User (1) ←→ (Many) Accounts
```

## Security Architecture

### Authentication Security
- **JWT Tokens** - Stateless authentication
- **Password Hashing** - bcrypt with salt rounds
- **Session Management** - Secure session handling
- **Role-Based Access** - Granular permissions

### API Security
- **CORS Configuration** - Restricted origins
- **Rate Limiting** - Request throttling
- **Input Validation** - Zod schema validation
- **SQL Injection Prevention** - Parameterized queries

### Frontend Security
- **XSS Prevention** - React's built-in protection
- **CSRF Protection** - SameSite cookies
- **Secure Storage** - No sensitive data in localStorage
- **Route Protection** - Authentication guards

## Data Flow

### User Registration Flow
```
1. Frontend: User enters phone number
2. Frontend: Send OTP request to backend
3. Backend: Generate and send OTP
4. Frontend: User enters OTP code
5. Frontend: Send verification request
6. Backend: Verify OTP and create user
7. Backend: Return success response
8. Frontend: Redirect to dashboard
```

### User Login Flow
```
1. Frontend: User enters credentials
2. Frontend: Send login request
3. Backend: Validate credentials
4. Backend: Create session and JWT
5. Backend: Return user data and token
6. Frontend: Store session data
7. Frontend: Redirect to dashboard
```

### Admin Operations Flow
```
1. Frontend: Admin performs action
2. Frontend: Send authenticated request
3. Backend: Validate JWT token
4. Backend: Check admin permissions
5. Backend: Execute database operation
6. Backend: Return operation result
7. Frontend: Update UI and show feedback
```

## Performance Considerations

### Frontend Performance
- **Code Splitting** - Route-based lazy loading
- **Bundle Optimization** - Tree shaking and minification
- **Caching Strategy** - React Query caching
- **Image Optimization** - Lazy loading and compression

### Backend Performance
- **Connection Pooling** - Efficient database connections
- **Query Optimization** - Indexed queries and joins
- **Response Caching** - API response caching
- **Compression** - Gzip response compression

### Database Performance
- **Indexing Strategy** - Primary and foreign key indexes
- **Query Optimization** - Efficient SQL queries
- **Connection Management** - Pool size optimization
- **Migration Strategy** - Non-blocking schema changes

## Scalability Considerations

### Horizontal Scaling
- **Stateless Backend** - No server-side session storage
- **Database Replication** - Read replicas for scaling
- **CDN Integration** - Static asset distribution
- **Load Balancing** - Multiple server instances

### Vertical Scaling
- **Resource Optimization** - Memory and CPU efficiency
- **Database Tuning** - Query and index optimization
- **Caching Layers** - Redis for session storage
- **Monitoring** - Performance metrics and alerts

## Deployment Architecture

### Development Environment
```
Developer Machine
├── Frontend (Vite Dev Server)
├── Backend (Node.js)
└── Database (Local MySQL)
```

### Production Environment
```
Load Balancer
├── Frontend (Static Files on CDN)
├── Backend (Multiple Instances)
└── Database (MySQL Cluster)
```

### CI/CD Pipeline
```
Code Push → Tests → Build → Deploy → Monitor
```

## Error Handling

### Frontend Error Handling
- **Error Boundaries** - React error boundaries
- **API Error Handling** - Centralized error processing
- **User Feedback** - Toast notifications
- **Fallback UI** - Graceful degradation

### Backend Error Handling
- **Global Error Handler** - Centralized error processing
- **Structured Logging** - JSON formatted logs
- **Error Classification** - Different error types
- **Client Error Responses** - Consistent error format

## Monitoring & Observability

### Logging Strategy
- **Structured Logs** - JSON format with metadata
- **Log Levels** - Debug, Info, Warn, Error
- **Request Tracing** - Request ID tracking
- **Performance Metrics** - Response time logging

### Health Checks
- **Database Health** - Connection status
- **API Health** - Endpoint availability
- **System Health** - Memory and CPU usage
- **External Dependencies** - Third-party service status