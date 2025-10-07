# Modern Full-Stack Boilerplate

A production-ready boilerplate with authentication, admin panel, and modern UI components.

## 🚀 Features

- **Authentication System**
  - Phone number-based authentication with OTP
  - Better Auth integration
  - Role-based access control (Admin/User)
  - Protected routes

- **Admin Panel**
  - User management (CRUD operations)
  - Ban/Unban users
  - Role assignment
  - Search and filtering

- **Modern UI**
  - Tailwind CSS + shadcn/ui components
  - Responsive design
  - Toast notifications (Sonner)
  - Data tables with sorting/filtering

- **Backend**
  - Hono.js server
  - MySQL database with Drizzle ORM
  - Better Auth for authentication
  - Admin plugin for user management

## 📁 Project Structure

```
Boilerplate/
├── backend/                 # Node.js backend
│   ├── src/
│   │   ├── config/         # Configuration files
│   │   ├── database/       # Database schema & migrations
│   │   ├── routes/         # API routes
│   │   ├── utils/          # Utilities & auth setup
│   │   └── index.ts        # Server entry point
│   └── package.json
├── frontend/               # React frontend
│   ├── src/
│   │   ├── components/     # UI components
│   │   ├── hooks/          # Custom hooks
│   │   ├── pages/          # Page components
│   │   └── types/          # Type definitions
│   └── package.json
└── README.md
```

## 🛠️ Setup Instructions

### Prerequisites
- Node.js 18+
- MySQL database
- npm or yarn

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   ```bash
   cp .env.example .env
   ```
   
   Configure your `.env` file:
   ```env
   DB_HOST=localhost
   DB_PORT=3306
   DB_USER=root
   DB_PASSWORD=your_password
   DB_NAME=boilerplate_db
   
   PHONE_OTP_REQUIRED=true
   RATE_LIMIT_WINDOW_SECONDS=60
   RATE_LIMIT_MAX=100
   ```

4. **Database Setup**
   ```bash
   # Generate migrations
   npm run db:generate
   
   # Run migrations
   npm run db:migrate
   ```

5. **Start the server**
   ```bash
   npm run dev
   ```

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

## 🔐 Authentication Flow

### Registration Process
1. User enters phone number
2. OTP is sent to phone
3. User verifies OTP
4. Account is created automatically

### Login Process
1. User enters phone number and password
2. System validates credentials
3. Session is created
4. User is redirected to dashboard

### Admin Features
- Create users with email/password
- Assign roles (Admin/User)
- Ban/Unban users
- View user details
- Bulk operations

## 📱 API Endpoints

### Authentication
- `POST /api/auth/sign-up/phone-number` - Register with phone
- `POST /api/auth/sign-in/phone-number` - Login with phone
- `POST /api/auth/send-otp` - Send OTP
- `POST /api/auth/verify-otp` - Verify OTP

### Admin (Protected)
- `GET /api/auth/admin/list-users` - List all users
- `POST /api/auth/admin/create-user` - Create new user
- `PUT /api/auth/admin/update-user` - Update user
- `DELETE /api/auth/admin/remove-user` - Delete user
- `POST /api/auth/admin/ban-user` - Ban user
- `POST /api/auth/admin/unban-user` - Unban user

## 🎨 UI Components

### Pages
- **Home** - Landing page with features
- **Login** - Phone authentication
- **Register** - OTP-based registration
- **Dashboard** - Admin panel
- **User Management** - CRUD operations

### Components
- **ProtectedRoute** - Role-based route protection
- **UserForm** - User creation/editing form
- **DataTable** - Enhanced data table with filtering
- **Toast Notifications** - Success/error messages

## 🔧 Configuration

### Database Schema
```typescript
// User table
user: {
  id: string (primary key)
  name: string
  email: string (unique)
  phoneNumber: string (unique)
  role: string
  banned: boolean
  emailVerified: boolean
  phoneNumberVerified: boolean
}
```

### Better Auth Configuration
```typescript
// Authentication plugins
- phoneNumber() - Phone-based auth
- admin() - Admin management
- haveIBeenPwned() - Password security
```

## 🚀 Deployment

### Backend Deployment
1. Build the project: `npm run build`
2. Set production environment variables
3. Run migrations: `npm run db:migrate`
4. Start server: `npm start`

### Frontend Deployment
1. Build the project: `npm run build`
2. Deploy `dist` folder to your hosting service
3. Configure environment variables

## 🧪 Default Credentials

An admin user is automatically created on server startup:
- **Email**: admin@example.com
- **Password**: Admin@example.com
- **Phone**: +251912345678
- **Role**: admin

## 📚 Tech Stack

### Backend
- **Framework**: Hono.js
- **Database**: MySQL + Drizzle ORM
- **Authentication**: Better Auth
- **Validation**: Zod
- **Logging**: Custom logger

### Frontend
- **Framework**: React + TypeScript
- **Routing**: React Router
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **State Management**: React Query
- **Notifications**: Sonner

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details