# Todo App - Setup & Installation Guide

Complete guide to setting up the Todo App backend for development and production.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Quick Start](#quick-start)
- [Development Setup](#development-setup)
- [Production Setup](#production-setup)
- [Docker Setup](#docker-setup)
- [Database Setup](#database-setup)
- [Environment Configuration](#environment-configuration)
- [Troubleshooting](#troubleshooting)

---

## Prerequisites

### Required Software

- **Node.js**: Version 20.0 or higher
  - Download from [nodejs.org](https://nodejs.org/)
  - Verify with `node --version`

- **npm**: Comes with Node.js
  - Verify with `npm --version`

- **PostgreSQL**: Version 15.0 or higher
  - Download from [postgresql.org](https://www.postgresql.org/download/)
  - Or use Docker for easier setup

- **Git**: For version control
  - Download from [git-scm.com](https://git-scm.com/downloads)
  - Verify with `git --version`

### Optional Tools

- **Docker & Docker Compose**: For containerized deployment
  - Download from [docker.com](https://www.docker.com/products/docker-desktop)

- **PM2**: For production process management
  ```bash
  npm install -g pm2
  ```

---

## Quick Start

Get the Todo App backend running in under 5 minutes using Docker.

### 1. Clone the Repository

```bash
git clone https://github.com/fulanzigler-blip/todo-app.git
cd todo-app/backend
```

### 2. Start with Docker Compose

```bash
docker-compose up -d
```

This will:
- Start PostgreSQL database
- Build and start the backend API
- Run database migrations

### 3. Verify Installation

```bash
# Check server health
curl http://localhost:3000/health

# View API documentation
# Open in browser: http://localhost:3000/docs
```

### 4. Stop Services

```bash
docker-compose down
```

---

## Development Setup

For local development without Docker.

### 1. Clone the Repository

```bash
git clone https://github.com/fulanzigler-blip/todo-app.git
cd todo-app/backend
```

### 2. Install Dependencies

```bash
npm install
```

This will install:
- Fastify (web framework)
- Prisma (ORM)
- Zod (validation)
- TypeScript (type safety)
- Development dependencies

### 3. Set Up PostgreSQL

#### Option A: Using Docker (Recommended)

```bash
# Run PostgreSQL in Docker
docker run --name todo-postgres \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=todoapp \
  -p 5432:5432 \
  -d postgres:15-alpine

# Verify connection
docker exec -it todo-postgres psql -U postgres -d todoapp -c "SELECT version();"
```

#### Option B: Local PostgreSQL Installation

If you have PostgreSQL installed locally:

```bash
# Create database
createdb todoapp

# Or use psql
psql -U postgres
CREATE DATABASE todoapp;
\q
```

### 4. Configure Environment Variables

```bash
# Copy example environment file
cp .env.example .env
```

Edit `.env` with your database configuration:

```env
# Database URL
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/todoapp

# Server port
PORT=3000

# Environment (development/production/test)
NODE_ENV=development

# Server host (optional)
# HOST=0.0.0.0
```

### 5. Initialize Prisma

```bash
# Generate Prisma client
npm run prisma:generate

# Run database migrations
npm run prisma:migrate
```

This will:
- Create the `todos` table
- Apply indexes and constraints

### 6. Seed Database (Optional)

```bash
npm run prisma:seed
```

This will populate the database with sample todos for testing.

### 7. Start Development Server

```bash
npm run dev
```

The server will:
- Start at `http://localhost:3000`
- Auto-reload on file changes
- Log requests to console

### 8. Verify Setup

```bash
# Test health endpoint
curl http://localhost:3000/health

# Create a test todo
curl -X POST http://localhost:3000/api/v1/todos \
  -H "Content-Type: application/json" \
  -d '{"title":"Setup complete!"}'

# Get all todos
curl http://localhost:3000/api/v1/todos
```

---

## Production Setup

For deploying to production.

### 1. Build the Application

```bash
npm run build
```

This compiles TypeScript to JavaScript in the `dist/` directory.

### 2. Set Up Production Database

Use a managed PostgreSQL service or set up your own:

**Recommended services:**
- AWS RDS
- Google Cloud SQL
- Azure Database for PostgreSQL
- Railway
- Supabase
- Neon

Update your `.env`:

```env
DATABASE_URL=postgresql://user:password@production-host:5432/todoapp
NODE_ENV=production
PORT=3000
```

### 3. Run Migrations

```bash
npm run prisma:migrate deploy
```

Note: Use `deploy` instead of `dev` for production to avoid creating migration files.

### 4. Start the Server

#### Option A: Direct with Node

```bash
npm start
```

#### Option B: Using PM2 (Recommended)

```bash
# Install PM2 globally if not installed
npm install -g pm2

# Start application
pm2 start dist/index.js --name todo-app

# Save PM2 configuration
pm2 save

# Set up PM2 to start on system boot
pm2 startup
```

#### Option C: Using Systemd (Linux)

Create `/etc/systemd/system/todo-app.service`:

```ini
[Unit]
Description=Todo App API
After=network.target

[Service]
Type=simple
User=www-data
WorkingDirectory=/var/www/todo-app
ExecStart=/usr/bin/node /var/www/todo-app/dist/index.js
Restart=always
RestartSec=10
Environment=NODE_ENV=production
Environment=PORT=3000
Environment=DATABASE_URL=postgresql://user:password@localhost:5432/todoapp

[Install]
WantedBy=multi-user.target
```

Enable and start:

```bash
sudo systemctl enable todo-app
sudo systemctl start todo-app
sudo systemctl status todo-app
```

### 5. Set Up Reverse Proxy (Nginx)

Configure Nginx to serve your API:

```nginx
server {
    listen 80;
    server_name api.yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Test and reload Nginx:

```bash
sudo nginx -t
sudo systemctl reload nginx
```

### 6. Enable HTTPS (Let's Encrypt)

```bash
sudo certbot --nginx -d api.yourdomain.com
```

---

## Docker Setup

### Building the Docker Image

```bash
docker build -t todo-app-backend .
```

### Running with Docker

```bash
docker run -d \
  --name todo-backend \
  -p 3000:3000 \
  -e DATABASE_URL=postgresql://postgres:postgres@host.docker.internal:5432/todoapp \
  -e PORT=3000 \
  todo-app-backend
```

### Docker Compose Setup

The project includes a `docker-compose.yml` file for full stack deployment:

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f backend

# Stop services
docker-compose down

# Stop and remove volumes (reset database)
docker-compose down -v
```

---

## Database Setup

### Creating Migrations

After modifying `prisma/schema.prisma`:

```bash
npm run prisma:migrate
```

This will:
- Generate SQL migration files
- Apply changes to database
- Update Prisma client

### Using Prisma Studio

Open a visual database editor:

```bash
npm run prisma:studio
```

Visit `http://localhost:5555` to:
- View all data
- Add/edit/delete records
- Run queries

### Database Backups

#### Backup using pg_dump

```bash
# Backup to file
pg_dump -U postgres -d todoapp > backup.sql

# Restore from file
psql -U postgres -d todoapp < backup.sql
```

#### Backup using Docker

```bash
# Backup
docker exec todo-postgres pg_dump -U postgres todoapp > backup.sql

# Restore
docker exec -i todo-postgres psql -U postgres todoapp < backup.sql
```

---

## Environment Configuration

### Development (.env)

```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/todoapp
PORT=3000
NODE_ENV=development
```

### Production (.env)

```env
# Production database URL (use environment variable or secret manager)
DATABASE_URL=postgresql://prod_user:secure_password@prod-db.example.com:5432/todoapp

# Server port
PORT=3000

# Environment
NODE_ENV=production

# CORS origins (comma-separated)
# CORS_ORIGINS=https://your-frontend.com,https://app.yourdomain.com
```

### Environment Variables Reference

| Variable      | Required | Default     | Description                              |
|---------------|----------|-------------|------------------------------------------|
| DATABASE_URL  | Yes      | -           | PostgreSQL connection string              |
| PORT          | No       | 3000        | Server port                              |
| NODE_ENV      | No       | development | Environment mode (development/production) |
| HOST          | No       | 0.0.0.0     | Server host address                      |

---

## Troubleshooting

### Common Issues

#### "Connection refused" when connecting to database

**Solution:**
- Verify PostgreSQL is running: `docker ps` or `systemctl status postgresql`
- Check DATABASE_URL in `.env`
- Ensure database exists: `psql -U postgres -l`

#### "Prisma Client is not generated"

**Solution:**
```bash
npm run prisma:generate
```

#### "Migration failed"

**Solution:**
- Check database connection
- Reset database (WARNING: deletes data):
  ```bash
  npm run prisma:migrate reset
  ```

#### Port 3000 already in use

**Solution:**
- Change PORT in `.env`
- Or kill process using port 3000:
  ```bash
  lsof -ti:3000 | xargs kill -9
  ```

#### TypeScript errors

**Solution:**
```bash
# Clean and rebuild
rm -rf dist node_modules
npm install
npm run build
```

#### Docker build fails

**Solution:**
```bash
# Clean Docker cache
docker system prune -a

# Rebuild without cache
docker build --no-cache -t todo-app-backend .
```

### Getting Help

- Check logs: `docker-compose logs backend` or `pm2 logs todo-app`
- Verify environment variables: `cat .env`
- Test database connection: `psql $DATABASE_URL`

---

## Development Tools

### Useful Scripts

```bash
# Development with hot reload
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Generate Prisma client
npm run prisma:generate

# Create and apply migration
npm run prisma:migrate

# Open Prisma Studio
npm run prisma:studio

# Seed database
npm run prisma:seed

# Type checking
npx tsc --noEmit
```

### Testing the API

```bash
# Health check
curl http://localhost:3000/health

# Get all todos
curl http://localhost:3000/api/v1/todos

# Create todo
curl -X POST http://localhost:3000/api/v1/todos \
  -H "Content-Type: application/json" \
  -d '{"title":"Test todo","priority":1}'

# Update todo
curl -X PATCH http://localhost:3000/api/v1/todos/{id} \
  -H "Content-Type: application/json" \
  -d '{"completed":true}'

# Delete todo
curl -X DELETE http://localhost:3000/api/v1/todos/{id}
```

---

## Next Steps

After setup:

1. Review [API Documentation](API.md) for all endpoints
2. Check [Architecture](ARCHITECTURE.md) for system design
3. Read [User Guide](USER_GUIDE.md) for usage instructions
4. Explore [Contribution Guidelines](CONTRIBUTING.md) if you want to contribute

---

## Security Considerations

- Never commit `.env` files
- Use strong database passwords in production
- Enable SSL/TLS for database connections
- Configure CORS appropriately
- Implement rate limiting for production
- Use environment variable management (e.g., AWS Secrets Manager, Vault)
- Regular security updates for dependencies

---

## Monitoring & Logging

### PM2 Monitoring

```bash
# Monitor application
pm2 monit

# View logs
pm2 logs todo-app

# View error logs
pm2 logs todo-app --err
```

### Docker Monitoring

```bash
# View logs
docker-compose logs -f backend

# View resource usage
docker stats
```

---

## Updating the Application

```bash
# Pull latest changes
git pull origin main

# Install new dependencies
npm install

# Rebuild
npm run build

# Run new migrations
npm run prisma:migrate deploy

# Restart service
pm2 restart todo-app
# or
docker-compose up -d --build backend
```

---

## Uninstallation

### Remove Docker Containers

```bash
docker-compose down -v
```

### Remove Database

```bash
# For Docker
docker volume rm todo-app_postgres_data

# For local PostgreSQL
psql -U postgres -c "DROP DATABASE todoapp;"
```

### Remove Application Files

```bash
rm -rf /path/to/todo-app
```
