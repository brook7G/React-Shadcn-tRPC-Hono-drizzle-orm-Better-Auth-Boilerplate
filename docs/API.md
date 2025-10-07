# API Documentation

## Authentication Endpoints

### Phone Number Registration
```http
POST /api/auth/send-otp
Content-Type: application/json

{
  "phoneNumber": "+1234567890"
}
```

**Response:**
```json
{
  "message": "OTP sent successfully"
}
```

### Verify OTP & Register
```http
POST /api/auth/verify-otp
Content-Type: application/json

{
  "phoneNumber": "+1234567890",
  "code": "123456"
}
```

**Response:**
```json
{
  "user": {
    "id": "user_id",
    "phoneNumber": "+1234567890",
    "phoneNumberVerified": true
  }
}
```

### Phone Number Login
```http
POST /api/auth/sign-in/phone-number
Content-Type: application/json

{
  "phoneNumber": "+1234567890",
  "password": "userpassword"
}
```

**Response:**
```json
{
  "user": {
    "id": "user_id",
    "name": "User Name",
    "phoneNumber": "+1234567890",
    "role": "user"
  },
  "session": {
    "token": "session_token",
    "expiresAt": "2024-12-31T23:59:59Z"
  }
}
```

## Admin Endpoints

All admin endpoints require authentication and admin role.

### List Users
```http
GET /api/auth/admin/list-users
Authorization: Bearer <token>

Query Parameters:
- searchValue: string (optional)
- searchField: "name" | "email" | "phoneNumber"
- filterField: "role" | "banned"
- filterValue: string | boolean
```

**Response:**
```json
{
  "users": [
    {
      "id": "user_id",
      "name": "John Doe",
      "email": "john@example.com",
      "phoneNumber": "+1234567890",
      "role": "user",
      "banned": false,
      "emailVerified": true,
      "phoneNumberVerified": true
    }
  ]
}
```

### Create User
```http
POST /api/auth/admin/create-user
Authorization: Bearer <token>
Content-Type: application/json

{
  "email": "newuser@example.com",
  "password": "securepassword",
  "name": "New User",
  "role": "user",
  "data": {
    "phoneNumber": "+1234567890"
  }
}
```

### Update User
```http
PUT /api/auth/admin/update-user
Authorization: Bearer <token>
Content-Type: application/json

{
  "userId": "user_id",
  "data": {
    "name": "Updated Name",
    "phoneNumber": "+0987654321"
  }
}
```

### Set User Role
```http
POST /api/auth/admin/set-role
Authorization: Bearer <token>
Content-Type: application/json

{
  "userId": "user_id",
  "role": "admin"
}
```

### Ban User
```http
POST /api/auth/admin/ban-user
Authorization: Bearer <token>
Content-Type: application/json

{
  "userId": "user_id",
  "banReason": "Violation of terms"
}
```

### Unban User
```http
POST /api/auth/admin/unban-user
Authorization: Bearer <token>
Content-Type: application/json

{
  "userId": "user_id"
}
```

### Remove User
```http
DELETE /api/auth/admin/remove-user
Authorization: Bearer <token>
Content-Type: application/json

{
  "userId": "user_id"
}
```

## Error Responses

All endpoints may return error responses in this format:

```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Human readable error message"
  }
}
```

### Common Error Codes
- `UNAUTHORIZED` - Invalid or missing authentication
- `FORBIDDEN` - Insufficient permissions
- `VALIDATION_ERROR` - Invalid request data
- `USER_NOT_FOUND` - User does not exist
- `PHONE_ALREADY_EXISTS` - Phone number already registered
- `INVALID_OTP` - OTP verification failed