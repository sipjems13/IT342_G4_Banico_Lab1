# Mini Application - User Registration & Authentication

A full-stack web application with user registration and authentication features built with Spring Boot and React.

## Tech Stack

**Backend:**
- Spring Boot 4.0.2
- Spring Security
- Spring Data JPA
- MySQL Database
- JWT Authentication
- Java 19

**Frontend:**
- React
- Vite
- JavaScript

## Prerequisites

- Java 19 or higher
- Node.js and npm
- XAMPP (for MySQL)
- Maven

## Setup Instructions

### 1. Database Setup

1. Start XAMPP and run MySQL
2. Open phpMyAdmin (http://localhost/phpmyadmin)
3. Create a new database:
   ```sql
   CREATE DATABASE miniapp_db;
   ```

### 2. Backend Setup

1. Navigate to the backend folder:
   ```bash
   cd backend
   ```

2. Update `src/main/resources/application.properties` if needed:
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/miniapp_db
   spring.datasource.username=root
   spring.datasource.password=
   ```

3. Run the Spring Boot application:
   ```bash
   mvnw spring-boot:run
   ```
   Or using Maven:
   ```bash
   mvn spring-boot:run
   ```

The backend will start on `http://localhost:8080`

### 3. Frontend Setup

1. Navigate to the web folder:
   ```bash
   cd web
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

The frontend will start on `http://localhost:5173`

## API Endpoints

### Authentication

- **POST** `/api/auth/register` - Register a new user
  ```json
  {
    "email": "user@example.com",
    "password": "password123",
    "fullName": "John Doe"
  }
  ```

- **POST** `/api/auth/login` - Login user
  - Parameters: `email`, `password`

- **POST** `/api/auth/logout` - Logout user

## Database Schema

### Users Table
- `user_id` (BIGINT, Primary Key, Auto Increment)
- `email` (VARCHAR, Unique, Not Null)
- `password_hash` (VARCHAR, Not Null)
- `full_name` (VARCHAR)
- `created_at` (TIMESTAMP)

## Features

- User registration with email validation
- Password encryption using BCrypt
- CORS enabled for frontend-backend communication
- MySQL database integration
- RESTful API design

## Troubleshooting

**Database Connection Issues:**
- Ensure XAMPP MySQL is running
- Verify database name is `miniapp_db`
- Check username/password in application.properties

**CORS Errors:**
- Backend is configured to allow requests from `http://localhost:5173`
- If using a different port, update `SecurityConfig.java`

**Port Already in Use:**
- Backend: Change port in `application.properties`: `server.port=8081`
- Frontend: Vite will automatically suggest an alternative port

## Project Structure

```
.
├── backend/
│   ├── src/main/java/com/miniapp/miniapplication/
│   │   ├── config/          # Security and CORS configuration
│   │   ├── controller/      # REST API controllers
│   │   ├── dto/            # Data Transfer Objects
│   │   ├── entity/         # JPA entities
│   │   ├── repository/     # Database repositories
│   │   └── service/        # Business logic
│   └── src/main/resources/
│       └── application.properties
└── web/
    ├── src/
    │   ├── components/
    │   └── App.jsx
    └── package.json
```

## License

This project is for educational purposes.
