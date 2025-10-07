# Setup Guide

## Prerequisites

- Node.js 18 or higher
- MySQL 8.0 or higher
- npm or yarn package manager

## Quick Start

### 1. Clone and Install

```bash
# Clone the repository
git clone <repository-url>
cd Boilerplate

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 2. Database Setup

```bash
# Create MySQL database
mysql -u root -p
CREATE DATABASE boilerplate_db;
exit
```

### 3. Environment Configuration

**Backend (.env)**
```bash
cd backend
cp .env.example .env
```

Edit `.env` file:
```env
# Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=boilerplate_db

# Authentication Settings
PHONE_OTP_REQUIRED=true
RATE_LIMIT_WINDOW_SECONDS=60
RATE_LIMIT_MAX=100

# Server Configuration
PORT=3000
NODE_ENV=development
```

**Frontend Configuration**
```bash
cd frontend
# Create .env file if needed
echo "VITE_API_URL=http://localhost:3000" > .env
```

### 4. Database Migration

```bash
cd backend

# Generate migration files
npm run db:generate

# Run migrations
npm run db:migrate
```

### 5. Start Development Servers

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

## Default Admin Account

The system automatically creates an admin account on first startup:

- **Email**: admin@example.com
- **Password**: Admin@example.com
- **Phone**: +251912345678
- **Role**: admin

## Available Scripts

### Backend Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run db:generate  # Generate database migrations
npm run db:migrate   # Run database migrations
npm run db:studio    # Open Drizzle Studio
```

### Frontend Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

## Project Structure

```
Boilerplate/
├── backend/
│   ├── src/
│   │   ├── config/           # Configuration files
│   │   │   ├── betterauth_config.ts
│   │   │   └── env_config.ts
│   │   ├── database/         # Database related files
│   │   │   ├── schema/       # Database schemas
│   │   │   ├── seeds/        # Database seeders
│   │   │   └── db.ts         # Database connection
│   │   ├── routes/           # API routes
│   │   ├── utils/            # Utility functions
│   │   │   ├── auth.ts       # Better Auth setup
│   │   │   └── logger.ts     # Logging utility
│   │   └── index.ts          # Server entry point
│   ├── .env                  # Environment variables
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/       # React components
│   │   │   ├── ui/          # shadcn/ui components
│   │   │   └── ...          # Custom components
│   │   ├── hooks/           # Custom React hooks
│   │   │   └── auth/        # Authentication hooks
│   │   ├── pages/           # Page components
│   │   │   ├── admin/       # Admin panel pages
│   │   │   └── ...          # Other pages
│   │   ├── types/           # TypeScript type definitions
│   │   └── lib/             # Utility libraries
│   └── package.json
└── docs/                    # Documentation
```

## Troubleshooting

### Common Issues

**Database Connection Error**
```bash
# Check MySQL service is running
sudo systemctl status mysql

# Verify database exists
mysql -u root -p -e "SHOW DATABASES;"
```

**Port Already in Use**
```bash
# Kill process using port 3000
lsof -ti:3000 | xargs kill -9

# Or change port in .env file
PORT=3001
```

**Migration Errors**
```bash
# Reset database (WARNING: This will delete all data)
npm run db:drop
npm run db:migrate
```

**Frontend Build Errors**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Environment Variables

**Required Backend Variables:**
- `DB_HOST` - MySQL host
- `DB_PORT` - MySQL port
- `DB_USER` - MySQL username
- `DB_PASSWORD` - MySQL password
- `DB_NAME` - Database name

**Optional Backend Variables:**
- `PORT` - Server port (default: 3000)
- `NODE_ENV` - Environment (development/production)
- `PHONE_OTP_REQUIRED` - Enable OTP (default: true)
- `RATE_LIMIT_WINDOW_SECONDS` - Rate limit window (default: 60)
- `RATE_LIMIT_MAX` - Max requests per window (default: 100)

## Production Deployment

### Backend Deployment

1. **Build the application:**
   ```bash
   npm run build
   ```

2. **Set production environment variables**

3. **Run database migrations:**
   ```bash
   npm run db:migrate
   ```

4. **Start the server:**
   ```bash
   npm start
   ```

### Frontend Deployment

1. **Build the application:**
   ```bash
   npm run build
   ```

2. **Deploy the `dist` folder** to your hosting service (Vercel, Netlify, etc.)

3. **Configure environment variables** on your hosting platform

## Next Steps

1. **Customize the UI** - Modify components in `frontend/src/components/`
2. **Add new features** - Create new pages and API endpoints
3. **Configure SMS provider** - Update OTP sending logic in `backend/src/utils/auth.ts`
4. **Set up monitoring** - Add error tracking and analytics
5. **Configure CI/CD** - Set up automated deployment pipelines