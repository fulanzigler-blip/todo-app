import { z } from 'zod';

export const createTodoSchema = z.object({
  title: z.string().min(1, 'Title is required').max(255),
  description: z.string().optional(),
  priority: z.number().int().min(0).max(2).default(0),
  dueDate: z.string().datetime().optional(),
});

export const updateTodoSchema = z.object({
  title: z.string().min(1).max(255).optional(),
  description: z.string().optional(),
  completed: z.boolean().optional(),
  priority: z.number().int().min(0).max(2).optional(),
  dueDate: z.string().datetime().optional(),
});

export const paramsSchema = z.object({
  id: z.string().uuid('Invalid todo ID'),
});

export type CreateTodoInput = z.infer<typeof createTodoSchema>;
export type UpdateTodoInput = z.infer<typeof updateTodoSchema>;
