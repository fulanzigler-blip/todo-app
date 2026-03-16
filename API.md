# Todo App API Documentation

Complete API reference for the Todo App backend service.

## Base URL

```
http://localhost:3000/api/v1
```

## Authentication

Currently, the API does not require authentication. This is intended for development and personal use.

## Response Format

All responses are in JSON format.

### Success Response

```json
{
  "data": { ... }
}
```

### Error Response

```json
{
  "error": "Error message",
  "statusCode": 400
}
```

## HTTP Status Codes

- `200 OK` - Request succeeded
- `201 Created` - Resource created successfully
- `400 Bad Request` - Invalid request data
- `404 Not Found` - Resource not found
- `500 Internal Server Error` - Server error

---

## Endpoints

### Todos

#### Get All Todos

Retrieve all todos from the database.

```http
GET /api/v1/todos
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

**cURL Example:**

```bash
curl http://localhost:3000/api/v1/todos
```

**JavaScript/Fetch Example:**

```javascript
fetch('http://localhost:3000/api/v1/todos')
  .then(response => response.json())
  .then(data => console.log(data));
```

**JavaScript/Axios Example:**

```javascript
axios.get('http://localhost:3000/api/v1/todos')
  .then(response => console.log(response.data));
```

---

#### Get Single Todo

Retrieve a specific todo by ID.

```http
GET /api/v1/todos/:id
```

**Parameters:**

| Parameter | Type   | Required | Description                |
|-----------|--------|----------|----------------------------|
| id        | string | Yes      | UUID of the todo to retrieve |

**Response:**

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

**Error Response (404):**

```json
{
  "error": "Todo not found",
  "statusCode": 404
}
```

**cURL Example:**

```bash
curl http://localhost:3000/api/v1/todos/550e8400-e29b-41d4-a716-446655440000
```

**JavaScript/Fetch Example:**

```javascript
fetch('http://localhost:3000/api/v1/todos/550e8400-e29b-41d4-a716-446655440000')
  .then(response => response.json())
  .then(data => console.log(data));
```

---

#### Create Todo

Create a new todo.

```http
POST /api/v1/todos
```

**Request Body:**

| Field       | Type    | Required | Description                                    |
|-------------|---------|----------|------------------------------------------------|
| title       | string  | Yes      | Title of the todo (1-255 characters)          |
| description | string  | No       | Optional description                          |
| priority    | number  | No       | Priority level: 0=low, 1=medium, 2=high (default: 0) |
| dueDate     | string  | No       | ISO 8601 datetime string (optional)           |

**Request Example:**

```json
{
  "title": "Buy groceries",
  "description": "Milk, eggs, bread",
  "priority": 1,
  "dueDate": "2026-03-20T00:00:00.000Z"
}
```

**Response (201):**

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

**cURL Example:**

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

**JavaScript/Fetch Example:**

```javascript
fetch('http://localhost:3000/api/v1/todos', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    title: 'Buy groceries',
    description: 'Milk, eggs, bread',
    priority: 1,
    dueDate: '2026-03-20T00:00:00.000Z'
  })
})
  .then(response => response.json())
  .then(data => console.log(data));
```

**JavaScript/Axios Example:**

```javascript
axios.post('http://localhost:3000/api/v1/todos', {
  title: 'Buy groceries',
  description: 'Milk, eggs, bread',
  priority: 1,
  dueDate: '2026-03-20T00:00:00.000Z'
})
  .then(response => console.log(response.data));
```

---

#### Update Todo

Update an existing todo. All fields are optional.

```http
PATCH /api/v1/todos/:id
```

**Parameters:**

| Parameter | Type   | Required | Description               |
|-----------|--------|----------|---------------------------|
| id        | string | Yes      | UUID of the todo to update |

**Request Body:**

| Field       | Type    | Required | Description                                    |
|-------------|---------|----------|------------------------------------------------|
| title       | string  | No       | Updated title (1-255 characters)             |
| description | string  | No       | Updated description                           |
| completed   | boolean | No       | Update completion status                      |
| priority    | number  | No       | Updated priority (0=low, 1=medium, 2=high)    |
| dueDate     | string  | No       | Updated ISO 8601 datetime string              |

**Request Example:**

```json
{
  "completed": true,
  "priority": 2
}
```

**Response:**

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "title": "Buy groceries",
  "description": "Milk, eggs, bread",
  "completed": true,
  "priority": 2,
  "createdAt": "2026-03-16T19:02:00.000Z",
  "updatedAt": "2026-03-16T19:05:00.000Z",
  "dueDate": "2026-03-20T00:00:00.000Z"
}
```

**cURL Example:**

```bash
curl -X PATCH http://localhost:3000/api/v1/todos/550e8400-e29b-41d4-a716-446655440000 \
  -H "Content-Type: application/json" \
  -d '{
    "completed": true,
    "priority": 2
  }'
```

**JavaScript/Fetch Example:**

```javascript
fetch('http://localhost:3000/api/v1/todos/550e8400-e29b-41d4-a716-446655440000', {
  method: 'PATCH',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    completed: true,
    priority: 2
  })
})
  .then(response => response.json())
  .then(data => console.log(data));
```

---

#### Delete Todo

Delete a todo permanently.

```http
DELETE /api/v1/todos/:id
```

**Parameters:**

| Parameter | Type   | Required | Description                |
|-----------|--------|----------|----------------------------|
| id        | string | Yes      | UUID of the todo to delete |

**Response:**

```json
{
  "success": true,
  "message": "Todo deleted"
}
```

**Error Response (404):**

```json
{
  "error": "Todo not found",
  "statusCode": 404
}
```

**cURL Example:**

```bash
curl -X DELETE http://localhost:3000/api/v1/todos/550e8400-e29b-41d4-a716-446655440000
```

**JavaScript/Fetch Example:**

```javascript
fetch('http://localhost:3000/api/v1/todos/550e8400-e29b-41d4-a716-446655440000', {
  method: 'DELETE'
})
  .then(response => response.json())
  .then(data => console.log(data));
```

---

#### Toggle Todo Completion

Toggle the completed status of a todo.

```http
PATCH /api/v1/todos/:id/toggle
```

**Parameters:**

| Parameter | Type   | Required | Description                     |
|-----------|--------|----------|---------------------------------|
| id        | string | Yes      | UUID of the todo to toggle      |

**Response:**

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "title": "Buy groceries",
  "description": "Milk, eggs, bread",
  "completed": true,
  "priority": 1,
  "createdAt": "2026-03-16T19:02:00.000Z",
  "updatedAt": "2026-03-16T19:05:00.000Z",
  "dueDate": "2026-03-20T00:00:00.000Z"
}
```

**cURL Example:**

```bash
curl -X PATCH http://localhost:3000/api/v1/todos/550e8400-e29b-41d4-a716-446655440000/toggle
```

**JavaScript/Fetch Example:**

```javascript
fetch('http://localhost:3000/api/v1/todos/550e8400-e29b-41d4-a716-446655440000/toggle', {
  method: 'PATCH'
})
  .then(response => response.json())
  .then(data => console.log(data));
```

---

### Health Check

Check if the API is running.

```http
GET /health
```

**Response:**

```json
{
  "status": "ok",
  "timestamp": "2026-03-16T19:00:00.000Z"
}
```

**cURL Example:**

```bash
curl http://localhost:3000/health
```

---

## Data Models

### Todo

| Field       | Type    | Description                              |
|-------------|---------|------------------------------------------|
| id          | string  | Unique UUID identifier                  |
| title       | string  | Todo title (1-255 characters)            |
| description | string  | Optional description                     |
| completed   | boolean | Completion status                        |
| priority    | number  | Priority: 0=low, 1=medium, 2=high       |
| createdAt   | string  | ISO 8601 datetime (creation timestamp)   |
| updatedAt   | string  | ISO 8601 datetime (last update timestamp) |
| dueDate     | string  | Optional ISO 8601 datetime                |

---

## Validation Rules

### Create Todo

- `title`: Required, 1-255 characters
- `description`: Optional, any length
- `priority`: Optional, integer between 0-2 (default: 0)
- `dueDate`: Optional, must be valid ISO 8601 datetime

### Update Todo

- `title`: Optional, 1-255 characters (if provided)
- `description`: Optional, any length
- `completed`: Optional, boolean
- `priority`: Optional, integer between 0-2
- `dueDate`: Optional, must be valid ISO 8601 datetime

### ID Parameters

- Must be a valid UUID format

---

## Error Examples

### Validation Error (400)

**Request:**
```json
{
  "title": ""
}
```

**Response:**
```json
{
  "error": "Title is required",
  "statusCode": 400
}
```

### Not Found Error (404)

**Request:**
```
GET /api/v1/todos/invalid-uuid
```

**Response:**
```json
{
  "error": "Invalid todo ID",
  "statusCode": 400
}
```

### Server Error (500)

**Response:**
```json
{
  "error": "Internal server error",
  "statusCode": 500
}
```

---

## Interactive API Documentation

The API includes interactive Swagger UI documentation. Once the server is running, visit:

```
http://localhost:3000/docs
```

This allows you to:
- View all endpoints
- Try out API calls directly from the browser
- View request/response schemas
- Download OpenAPI specification

---

## Rate Limiting

Currently, no rate limiting is implemented. Consider adding rate limiting for production use.

---

## CORS

CORS is enabled for all origins in development. Configure appropriate origins for production deployment.

---

## Pagination

Currently, all todos are returned in a single response. Pagination will be added in future versions for large datasets.

---

## Sorting

Todos are sorted by:
1. Priority (high to low)
2. Creation date (newest first)

---

## Testing the API

### Using cURL

See endpoint examples above for cURL commands.

### Using Postman

1. Import the OpenAPI spec from `http://localhost:3000/docs`
2. Set base URL to `http://localhost:3000/api/v1`
3. Test endpoints

### Using HTTPie

```bash
http GET http://localhost:3000/api/v1/todos
http POST http://localhost:3000/api/v1/todos title="Buy groceries" priority:=1
```

---

## TypeScript Types

The backend exports TypeScript types that can be used with TypeScript clients:

```typescript
// CreateTodoInput
interface CreateTodoInput {
  title: string;
  description?: string;
  priority?: number;
  dueDate?: string;
}

// UpdateTodoInput
interface UpdateTodoInput {
  title?: string;
  description?: string;
  completed?: boolean;
  priority?: number;
  dueDate?: string;
}

// Todo
interface Todo {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: number;
  createdAt: string;
  updatedAt: string;
  dueDate?: string;
}
```

---

## Versioning

The current API version is `v1`. Future versions will be versioned using URL pathing (e.g., `/api/v2/todos`).

---

## Changelog

### v1.0.0 (2026-03-16)
- Initial release
- Full CRUD operations for todos
- Toggle completion endpoint
- Basic validation with Zod
- Swagger documentation
