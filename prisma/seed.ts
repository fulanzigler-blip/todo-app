import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create sample todos
  const todos = [
    {
      title: 'Buy groceries',
      description: 'Milk, eggs, bread, and vegetables',
      priority: 1,
      dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
    },
    {
      title: 'Complete project documentation',
      description: 'Write API docs and user guide',
      priority: 2,
    },
    {
      title: 'Schedule dentist appointment',
      description: 'Call Dr. Smith\'s office',
      priority: 0,
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 1 week from now
    },
    {
      title: 'Review pull requests',
      description: 'Check pending PRs from team members',
      priority: 2,
      completed: true,
    },
    {
      title: 'Update dependencies',
      description: 'Run npm audit and update packages',
      priority: 1,
    },
  ];

  for (const todo of todos) {
    await prisma.todo.create({ data: todo });
  }

  console.log('Seed data created successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
