# Todo App Backend

[![Node.js](https://img.shields.io/badge/Node.js-20%2B-green.svg)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5%2B-blue.svg)](https://www.typescriptlang.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15%2B-blue.svg)](https://www.postgresql.org/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

A modern, fast REST API for managing todos, built with Node.js, Fastify, Prisma, and PostgreSQL.

---

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Quick Start](#quick-start)
- [Documentation](#documentation)
- [API Overview](#api-overview)
- [Project Structure](#project-structure)
- [Development](#development)
- [Contributing](#contributing)
- [License](#license)

---

## ✨ Features

- ✅ **Full CRUD Operations** - Create, read, update, and delete todos
- 🎯 **Priority System** - Three priority levels (Low, Medium, High)
- 📅 **Due Dates** - Set deadlines for tasks
- ✅ **Input Validation** - Comprehensive validation with Zod
- 🔒 **Type Safety** - Built with TypeScript
- 📚 **API Documentation** - Interactive Swagger UI
- 🚀 **High Performance** - Built with Fastify framework
- 🗄️ **Robust Database** - PostgreSQL with Prisma ORM
- 🔧 **Easy Setup** - Docker support included
- 📖 **Well Documented** - Comprehensive guides and API docs

---

## 🛠 Tech Stack

| Component | Technology | Version |
|-----------|-----------|---------|
| **Runtime** | Node.js | 20+ |
| **Framework** | Fastify | 4+ |
| **Language** | TypeScript | 5+ |
| **ORM** | Prisma | 5+ |
| **Database** | PostgreSQL | 15+ |
| **Validation** | Zod | 3+ |
| **API Docs** | Swagger/OpenAPI | - |

---

## 🚀 Quick Start

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

This will automatically:
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

### 4. Create Your First Todo

```bash
curl -X POST http://localhost:3000/api/v1/todos \
  -H "Content-Type: application/json" \
  -d '{"title":"My first todo","priority":1}'
```

**That's it!** 🎉 Your Todo App backend is now running.

For detailed setup instructions, see the [Setup Guide](SETUP.md).

---

## 📚 Documentation

We have comprehensive documentation to help you get started and make the most of the Todo App.

### Getting Started

- **[Setup Guide](SETUP.md)** - Complete installation and setup instructions
  - Development setup
  - Production deployment
  - Docker configuration
  - Database setup
  - Environment configuration
  - Troubleshooting

### Using the API

- **[API Documentation](API.md)** - Complete API reference
  - All endpoints with examples
  - Request/response schemas
  - Error handling
  - Authentication
  - Interactive Swagger UI

- **[User Guide](USER_GUIDE.md)** - End-user documentation
  - Creating and managing todos
  - Organizing tasks
  - Best practices
  - Tips and tricks

### Understanding the Code

- **[Architecture](ARCHITECTURE.md)** - System design and architecture
  - Tech stack details
  - Database schema
  - API structure
  - Frontend components
  - Design decisions

### Contributing

- **[Contributing Guide](CONTRIBUTING.md)** - How to contribute
  - Development workflow
  - Coding standards
  - Commit guidelines
  - Pull request process
  - Testing guidelines

---

## 📖 API Overview

### Base URL

```
http://localhost:3000/api/v1
```

### Available Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/todos` | Get all todos |
| GET | `/todos/:id` | Get single todo by ID |
| POST | `/todos` | Create new todo |
| PATCH | `/todos/:id` | Update todo |
| DELETE | `/todos/:id` | Delete todo |
| PATCH | `/todos/:id/toggle` | Toggle completed status |
| GET | `/health` | Health check |

### Example: Create Todo

```bash
curl -X POST http://localhost:3000/api/v1/todos \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Buy groceries",
    "description": "Milk, eggs, bread",
    "priority": 1,
    "dueDate": "2026-03-20T00:00:00.000Z"
  }'
```

### Example: Get All Todos

```bash
curl http://localhost:3000/api/v1/todos
```

**Response:**
```json
[
  {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "title": "Buy groceries",
    "description": "Milk, eggs, bread",
    "completed": false,
    "priority": 1,
    "createdAt": "2026-03-16T19:02:00.000Z",
    "updatedAt": "2026-03-16T19:02:00.000Z",
    "dueDate": "2026-03-20T00:00:00.000Z"
  }
]
```

For complete API documentation with all examples, see [API.md](API.md).

### Interactive Documentation

Visit the interactive Swagger UI to explore and test the API:

```
http://localhost:3000/docs
```

---

## 📁 Project Structure

```
backend/
├── src/
│   ├── index.ts              # Fastify app setup and server start
│   ├── routes/
│   │   └── todos.ts          # Todo route definitions
│   ├── services/
│   │   └── todo.service.ts   # Business logic layer
│   ├── schemas/
│   │   └── todo.schema.ts    # Zod validation schemas
│   ├── utils/
│   │   └── errors.ts         # Error handling utilities
│   └── prisma/
│       └── prisma.ts         # Prisma client singleton
├── prisma/
│   ├── schema.prisma         # Database schema definition
│   └── seed.ts               # Database seed script
├── docs/                     # Documentation files
│   ├── API.md
│   ├── SETUP.md
│   ├── USER_GUIDE.md
│   ├── ARCHITECTURE.md
│   └── CONTRIBUTING.md
├── .env.example              # Environment variables template
├── docker-compose.yml        # Docker Compose configuration
├── Dockerfile                # Docker image configuration
├── package.json              # Dependencies and scripts
├── tsconfig.json             # TypeScript configuration
└── README.md                 # This file
```

### Key Components

- **Routes** (`src/routes/`): Define API endpoints and route handlers
- **Services** (`src/services/`): Business logic and data operations
- **Schemas** (`src/schemas/`): Request/response validation with Zod
- **Prisma** (`prisma/`): Database schema and migrations

---

## 💻 Development

### Prerequisites

- Node.js 20+
- PostgreSQL 15+
- npm or yarn

### Local Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/fulanzigler-blip/todo-app.git
   cd todo-app/backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment**
   ```bash
   cp .env.example .env
   # Edit .env with your database credentials
   ```

4. **Initialize database**
   ```bash
   npm run prisma:generate
   npm run prisma:migrate
   npm run prisma:seed  # Optional
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

The server will start at `http://localhost:3000` with hot-reload enabled.

### Available Scripts

```bash
# Development
npm run dev              # Start development server with hot reload

# Building
npm run build            # Build TypeScript to JavaScript
npm start                # Start production server

# Database
npm run prisma:generate  # Generate Prisma client
npm run prisma:migrate    # Run database migrations
npm run prisma:studio    # Open Prisma Studio
npm run prisma:seed      # Seed database with sample data

# Testing (when implemented)
npm test                 # Run tests
npm run test:watch       # Run tests in watch mode
```

### Development Tools

**Prisma Studio**
Visual database editor:
```bash
npm run prisma:studio
# Visit http://localhost:5555
```

**API Documentation**
Interactive Swagger UI:
```bash
# Visit http://localhost:3000/docs
```

---

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for details.

### How to Contribute

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Contribution Guidelines

- Follow the existing code style
- Write tests for new features
- Update documentation
- Use conventional commits
- Ensure all tests pass

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.

---

## 🐛 Database Schema

### Todo Model

```prisma
model Todo {
  id          String   @id @default(uuid())
  title       String   @db.VarChar(255)
  description String?  @db.Text
  completed   Boolean  @default(false)
  priority    Int      @default(0) // 0=low, 1=medium, 2=high
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  dueDate     DateTime?

  @@map("todos")
}
```

### Fields

| Field | Type | Description |
|-------|------|-------------|
| id | string | Unique UUID identifier |
| title | string | Todo title (1-255 characters) |
| description | string | Optional description |
| completed | boolean | Completion status |
| priority | number | Priority: 0=low, 1=medium, 2=high |
| createdAt | datetime | Creation timestamp |
| updatedAt | datetime | Last update timestamp |
| dueDate | datetime | Optional due date |

---

## 📊 API Response Examples

### Success Response

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "title": "Buy groceries",
  "description": "Milk, eggs, bread",
  "completed": false,
  "priority": 1,
  "createdAt": "2026-03-16T19:02:00.000Z",
  "updatedAt": "2026-03-16T19:02:00.000Z",
  "dueDate": "2026-03-20T00:00:00.000Z"
}
```

### Error Response

```json
{
  "error": "Todo not found",
  "statusCode": 404
}
```

---

## 🔒 API Validation

All endpoints use Zod for input validation:

- **title**: Required, 1-255 characters
- **description**: Optional, any length
- **priority**: Optional, must be 0 (low), 1 (medium), or 2 (high)
- **dueDate**: Optional, must be valid ISO 8601 datetime
- **completed**: Optional, boolean

---

## 🚦 HTTP Status Codes

| Status | Description |
|--------|-------------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request (validation error) |
| 404 | Not Found |
| 500 | Internal Server Error |

---

## 🐳 Docker Deployment

### Using Docker Compose (Recommended)

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

### Build Docker Image

```bash
docker build -t todo-app-backend .
```

### Run Container

```bash
docker run -d \
  --name todo-backend \
  -p 3000:3000 \
  -e DATABASE_URL=postgresql://postgres:postgres@host.docker.internal:5432/todoapp \
  todo-app-backend
```

---

## 🌐 Production Deployment

### Environment Variables

```env
DATABASE_URL=postgresql://user:password@prod-db.example.com:5432/todoapp
PORT=3000
NODE_ENV=production
```

### Recommended Setup

1. Use a managed PostgreSQL service (AWS RDS, Google Cloud SQL, etc.)
2. Set up reverse proxy with Nginx
3. Enable HTTPS with Let's Encrypt
4. Use PM2 for process management
5. Set up monitoring and logging
6. Configure CORS for your frontend domain

See [SETUP.md](SETUP.md) for detailed production deployment instructions.

---

## 📖 Learning Resources

### Official Documentation

- [Fastify Documentation](https://www.fastify.io/docs/latest/)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Zod Documentation](https://zod.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

### Related Projects

- [Frontend Repository](https://github.com/fulanzigler-blip/todo-app-frontend)
- [Project Architecture](ARCHITECTURE.md)

---

## 🗺 Roadmap

### Planned Features

- [ ] User authentication and authorization
- [ ] Multi-user support with shared todos
- [ ] Categories and tags
- [ ] Subtasks and nesting
- [ ] Real-time updates via WebSocket
- [ ] Email notifications
- [ ] File attachments
- [ ] Export functionality (JSON, CSV, PDF)
- [ ] Import from other todo apps
- [ ] API rate limiting
- [ ] Pagination for large datasets
- [ ] Advanced filtering and search

---

## 🤝 Support

### Getting Help

- 📖 Check the [Documentation](#documentation)
- 🐛 [Report a bug](https://github.com/fulanzigler-blip/todo-app/issues)
- 💡 [Request a feature](https://github.com/fulanzigler-blip/todo-app/issues)
- 💬 Start a [discussion](https://github.com/fulanzigler-blip/todo-app/discussions)

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Authors

- **Your Name** - Initial work - [fulanzigler-blip](https://github.com/fulanzigler-blip)

See also the list of [contributors](https://github.com/fulanzigler-blip/todo-app/contributors) who participated in this project.

---

## 🙏 Acknowledgments

- Built with [Fastify](https://www.fastify.io/)
- Database managed with [Prisma](https://www.prisma.io/)
- Validated with [Zod](https://zod.dev/)
- Documentation inspired by open-source best practices

---

## ⭐ Star the Project

If you find this project useful, please consider giving it a ⭐ on GitHub!

---

## 📞 Contact

For questions, suggestions, or just to say hi:

- GitHub: [fulanzigler-blip](https://github.com/fulanzigler-blip)
- Issues: [GitHub Issues](https://github.com/fulanzigler-blip/todo-app/issues)
- Discussions: [GitHub Discussions](https://github.com/fulanzigler-blip/todo-app/discussions)

---

Made with ❤️ by [fulanzigler-blip](https://github.com/fulanzigler-blip)
