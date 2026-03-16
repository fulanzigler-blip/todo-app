import { FastifyInstance } from 'fastify';
import { todoService } from '../services/todo.service';
import {
  createTodoSchema,
  updateTodoSchema,
  paramsSchema,
} from '../schemas/todo.schema';
import { AppError } from '../utils/errors';

export async function todoRoutes(fastify: FastifyInstance) {
  // Get all todos
  fastify.get('/todos', async () => {
    return todoService.getAllTodos();
  });

  // Get single todo
  fastify.get<{
    Params: { id: string };
  }>('/todos/:id', {
    schema: { params: paramsSchema },
  }, async (request, reply) => {
    try {
      return await todoService.getTodoById(request.params.id);
    } catch (error) {
      if (error instanceof AppError) {
        reply.code(error.statusCode);
        return { error: error.message, statusCode: error.statusCode };
      }
      throw error;
    }
  });

  // Create todo
  fastify.post<{
    Body: any;
  }>('/todos', {
    schema: { body: createTodoSchema },
  }, async (request, reply) => {
    try {
      const todo = await todoService.createTodo(request.body);
      reply.code(201);
      return todo;
    } catch (error) {
      if (error instanceof Error) {
        reply.code(400);
        return { error: error.message, statusCode: 400 };
      }
      throw error;
    }
  });

  // Update todo
  fastify.patch<{
    Params: { id: string };
    Body: any;
  }>('/todos/:id', {
    schema: {
      params: paramsSchema,
      body: updateTodoSchema,
    },
  }, async (request, reply) => {
    try {
      return await todoService.updateTodo(request.params.id, request.body);
    } catch (error) {
      if (error instanceof AppError) {
        reply.code(error.statusCode);
        return { error: error.message, statusCode: error.statusCode };
      }
      if (error instanceof Error) {
        reply.code(400);
        return { error: error.message, statusCode: 400 };
      }
      throw error;
    }
  });

  // Delete todo
  fastify.delete<{
    Params: { id: string };
  }>('/todos/:id', {
    schema: { params: paramsSchema },
  }, async (request, reply) => {
    try {
      await todoService.deleteTodo(request.params.id);
      return { success: true, message: 'Todo deleted' };
    } catch (error) {
      if (error instanceof AppError) {
        reply.code(error.statusCode);
        return { error: error.message, statusCode: error.statusCode };
      }
      throw error;
    }
  });

  // Toggle completion
  fastify.patch<{
    Params: { id: string };
  }>('/todos/:id/toggle', {
    schema: { params: paramsSchema },
  }, async (request, reply) => {
    try {
      return await todoService.toggleTodo(request.params.id);
    } catch (error) {
      if (error instanceof AppError) {
        reply.code(error.statusCode);
        return { error: error.message, statusCode: error.statusCode };
      }
      throw error;
    }
  });
}
