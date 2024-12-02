# NestJS Microservices Project

A microservices-based application built with NestJS, featuring authentication and notification services. The project uses MongoDB for data persistence, Bull for job processing, and Docker for containerization.

## Architecture

The project consists of two main microservices:

- **Auth Service**: Handles user authentication and management
- **Notifications Service**: Manages email notifications and delayed notifications processing

## Prerequisites

- Node.js (v16 or higher)
- pnpm
- Docker and Docker Compose
- MongoDB
- Redis (for Bull queue)

## Installation

1. Clone the repository

2. Install dependencies

```bash
pnpm install
```

3. Environment Setup:
   Create `.env` files for each service in their respective directories:
   (I'm attaching my .env files for reference)

   - `apps/auth/.env`

   ```
     DB_URI=mongodb://mongo:27017/nestjs

     JWT_SECRET=4YdOfiPtyv1aYAjSdr7MidPOnmZHtT4AdLAvQldpHvD2SROwEXS7E1JQHhUn0XEy0bOCCHnI8zIxWKocI7ASb7Kh3uQ0spn9FsZ
     JWT_EXPIRATION=3600000000

     HTTP_PORT=3001
     TCP_PORT=3002

     NOTIFICATIONS_HOST=notifications
     NOTIFICATIONS_PORT=3003
   ```

   - `apps/notifications/.env`

   ```
     PORT=3003
     REDIS_HOST=localhost
     REDIS_PORT=6380
     SMTP_HOST=smtp.gmail.com
     SMTP_PORT=587
     SMTP_USER=your_email@gmail.com
     SMTP_PASSWORD=your_email_password
   ```

## Running the Application

### Using Docker

Start all services using Docker Compose:

```bash
docker compose up
```

## Tests

Not implemented here, test files were created by the NestJS CLI.
