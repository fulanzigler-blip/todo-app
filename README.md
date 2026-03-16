# Todo App Backend

A modern, fast REST API for managing todos, built with Node.js, Fastify, Prisma, and PostgreSQL.

## Features

- ✅ Full CRUD operations for todos
- ✅ Input validation with Zod
- ✅ PostgreSQL database with Prisma ORM
- ✅ Fast and efficient API with Fastify
- ✅ Swagger/OpenAPI documentation
- ✅ CORS enabled
- ✅ TypeScript for type safety

## Tech Stack

- **Runtime**: Node.js 20+
- **Framework**: Fastify 4+
- **ORM**: Prisma 5+
- **Database**: PostgreSQL 15+
- **Validation**: Zod
- **Language**: TypeScript

## API Endpoints

Base URL: `http://localhost:3000/api/v1`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/todos` | Get all todos |
| GET | `/todos/:id` | Get single todo by ID |
| POST | `/todos` | Create new todo |
| PATCH | `/todos/:id` | Update todo |
| DELETE | `/todos/:id` | Delete todo |
| PATCH | `/todos/:id/toggle` | Toggle completed status |

### Request/Response Examples

#### Create Todo
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

#### Get All Todos
```bash
curl http://localhost:3000/api/v1/todos
```

#### Update Todo
```bash
curl -X PATCH http://localhost:3000/api/v1/todos/{id} \
  -H "Content-Type: application/json" \
  -d '{
    "completed": true
  }'
```

#### Toggle Todo
```bash
curl -X PATCH http://localhost:3000/api/v1/todos/{id}/toggle
```

#### Delete Todo
```bash
curl -X DELETE http://localhost:3000/api/v1/todos/{id}
```

## Getting Started

### Prerequisites

- Node.js 20+
- PostgreSQL 15+
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/fulanzigler-blip/todo-app.git
cd todo-app/backend
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` with your database credentials:
```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/todoapp
PORT=3000
NODE_ENV=development
```

4. Generate Prisma client:
```bash
npm run prisma:generate
```

5. Run database migrations:
```bash
npm run prisma:migrate
```

6. (Optional) Seed the database with sample data:
```bash
npm run prisma:seed
```

### Running the Server

Development mode (with hot reload):
```bash
npm run dev
```

Production mode:
```bash
npm run build
npm start
```

The API will be available at `http://localhost:3000`

API documentation (Swagger UI) is available at `http://localhost:3000/docs`

## Database Schema

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
}
```

## Project Structure

```
backend/
├── src/
│   ├── index.ts          # Fastify app setup
│   ├── routes/
│   │   └── todos.ts      # Todo routes
│   ├── services/
│   │   └── todo.service.ts # Business logic
│   ├── schemas/
│   │   └── todo.schema.ts # Zod validation schemas
│   └── prisma/
│       └── prisma.ts     # Prisma client singleton
├── prisma/
│   ├── schema.prisma     # Database schema
│   └── seed.ts           # Seed script
├── package.json
└── tsconfig.json
```

## API Validation

All endpoints use Zod for input validation:

- **title**: Required, 1-255 characters
- **description**: Optional, any length
- **priority**: Optional, must be 0 (low), 1 (medium), or 2 (high)
- **dueDate**: Optional, must be a valid ISO 8601 datetime
- **completed**: Optional, boolean

## Error Responses

All errors follow this format:

```json
{
  "error": "Error message",
  "statusCode": 400
}
```

HTTP Status Codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request (validation error)
- `404` - Not Found
- `500` - Internal Server Error

## Development Tools

### Prisma Studio
Open Prisma Studio to visualize and edit your data:
```bash
npm run prisma:studio
```

### Creating Migrations
After modifying `schema.prisma`:
```bash
npm run prisma:migrate
```

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
