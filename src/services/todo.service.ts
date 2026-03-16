import prisma from '../prisma/prisma';
import { CreateTodoInput, UpdateTodoInput } from '../schemas/todo.schema';
import { AppError } from '../utils/errors';

export class TodoService {
  async getAllTodos() {
    return prisma.todo.findMany({
      orderBy: [{ priority: 'desc' }, { createdAt: 'desc' }],
    });
  }

  async getTodoById(id: string) {
    const todo = await prisma.todo.findUnique({
      where: { id },
    });

    if (!todo) {
      throw new AppError('Todo not found', 404);
    }

    return todo;
  }

  async createTodo(data: CreateTodoInput) {
    return prisma.todo.create({
      data: {
        title: data.title,
        description: data.description,
        priority: data.priority,
        dueDate: data.dueDate ? new Date(data.dueDate) : null,
      },
    });
  }

  async updateTodo(id: string, data: UpdateTodoInput) {
    // Check if todo exists
    await this.getTodoById(id);

    return prisma.todo.update({
      where: { id },
      data: {
        ...(data.title !== undefined && { title: data.title }),
        ...(data.description !== undefined && { description: data.description }),
        ...(data.completed !== undefined && { completed: data.completed }),
        ...(data.priority !== undefined && { priority: data.priority }),
        ...(data.dueDate !== undefined && { dueDate: data.dueDate ? new Date(data.dueDate) : null }),
      },
    });
  }

  async deleteTodo(id: string) {
    // Check if todo exists
    await this.getTodoById(id);

    await prisma.todo.delete({
      where: { id },
    });
  }

  async toggleTodo(id: string) {
    const todo = await this.getTodoById(id);

    return prisma.todo.update({
      where: { id },
      data: { completed: !todo.completed },
    });
  }
}

export const todoService = new TodoService();
