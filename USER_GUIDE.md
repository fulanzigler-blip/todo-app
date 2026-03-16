# Todo App - User Guide

Learn how to use the Todo App to manage your tasks efficiently.

## Table of Contents

- [Introduction](#introduction)
- [Getting Started](#getting-started)
- [Creating Todos](#creating-todos)
- [Managing Todos](#managing-todos)
- [Organizing Todos](#organizing-todos)
- [Best Practices](#best-practices)
- [Tips & Tricks](#tips--tricks)

---

## Introduction

The Todo App is a simple yet powerful task management application that helps you:

- ✅ Track your daily tasks
- 📅 Set due dates for tasks
- 🔥 Prioritize by importance
- ✨ Mark tasks as complete
- 📊 Monitor your progress

---

## Getting Started

### Accessing the Application

**Web Interface:**
- Frontend: `http://localhost:5173` (development) or your deployed URL
- Backend API: `http://localhost:3000` (development) or your deployed URL

**API Documentation:**
- Interactive docs: `http://localhost:3000/docs`

### Initial Setup

1. Open the Todo App in your browser
2. The app will load with an empty todo list
3. Start adding your first todo!

---

## Creating Todos

### Adding a Simple Todo

1. Click the "Add Todo" button or use the input field
2. Enter your task title (e.g., "Buy groceries")
3. Press Enter or click "Add"

**Example:**
```
Title: Buy groceries
```

### Adding a Detailed Todo

For more complex tasks, you can add additional details:

1. Click "Add Todo"
2. Enter the title (required)
3. Add a description (optional)
4. Set priority level
5. Set due date (optional)
6. Click "Create"

**Example:**
```
Title: Complete project report
Description: Include all Q1 metrics, budget analysis, and recommendations
Priority: High
Due Date: 2026-03-20
```

### Using the API to Create Todos

**cURL:**
```bash
curl -X POST http://localhost:3000/api/v1/todos \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Buy groceries",
    "description": "Milk, eggs, bread, butter",
    "priority": 1,
    "dueDate": "2026-03-20T00:00:00.000Z"
  }'
```

**JavaScript:**
```javascript
fetch('http://localhost:3000/api/v1/todos', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
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

---

## Managing Todos

### Viewing Todos

Your todos are displayed in a list with the following information:

- **Checkbox**: Mark as complete
- **Title**: Task name
- **Description**: Additional details (if provided)
- **Priority Badge**: Color-coded priority level
- **Due Date**: When the task is due (if set)
- **Actions**: Edit and delete buttons

### Marking Todos as Complete

1. Click the checkbox next to the todo
2. The todo will be marked with a strikethrough
3. Move to the "Completed" section (if filtering)

**API Method:**
```bash
# Toggle completion
curl -X PATCH http://localhost:3000/api/v1/todos/{id}/toggle

# Or explicitly set completed status
curl -X PATCH http://localhost:3000/api/v1/todos/{id} \
  -H "Content-Type: application/json" \
  -d '{"completed": true}'
```

### Editing Todos

1. Click the "Edit" button on the todo
2. Modify the fields as needed
3. Click "Save" to update

**You can change:**
- Title
- Description
- Priority
- Due date
- Completion status

**API Method:**
```bash
curl -X PATCH http://localhost:3000/api/v1/todos/{id} \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Updated title",
    "priority": 2
  }'
```

### Deleting Todos

1. Click the "Delete" button on the todo
2. Confirm the deletion
3. The todo is permanently removed

**API Method:**
```bash
curl -X DELETE http://localhost:3000/api/v1/todos/{id}
```

### Viewing a Single Todo

**API Method:**
```bash
curl http://localhost:3000/api/v1/todos/{id}
```

---

## Organizing Todos

### Understanding Priority Levels

The Todo App uses three priority levels:

| Level | Value | Color  | Use Case                      |
|-------|-------|--------|-------------------------------|
| Low   | 0     | Gray   | Nice-to-have tasks            |
| Medium| 1     | Blue   | Regular tasks                 |
| High  | 2     | Red    | Urgent/important tasks        |

**When to use each:**

- **Low**: Tasks that can wait or are flexible
  - Example: "Organize desktop icons"
  - Example: "Read article about productivity"

- **Medium**: Regular daily tasks
  - Example: "Reply to emails"
  - Example: "Review pull requests"

- **High**: Urgent or important tasks
  - Example: "Submit project proposal"
  - Example: "Fix critical bug"

### Setting Due Dates

Due dates help you stay on track with deadlines:

1. Create or edit a todo
2. Click the due date field
3. Select a date from the calendar
4. The date will be displayed next to the todo

**Best practices:**
- Set realistic deadlines
- Allow buffer time for unexpected delays
- Review due dates regularly

### Filtering Todos

Filter your view to focus on specific tasks:

**Available Filters:**
- **All**: Show all todos
- **Active**: Show incomplete todos only
- **Completed**: Show completed todos only

### Sorting Todos

Sort your todos to prioritize your work:

**Available Sort Options:**
- **Priority**: Show high priority first
- **Due Date**: Show earliest due dates first
- **Created Date**: Show newest todos first
- **Title**: Sort alphabetically

### Searching Todos

Quickly find todos using the search bar:

1. Type in the search field
2. Results update in real-time
3. Searches match:
   - Todo titles
   - Descriptions

---

## Best Practices

### Creating Effective Todos

✅ **Do:**
- Be specific and clear
- Break large tasks into smaller ones
- Set realistic due dates
- Use descriptions for context
- Prioritize important tasks

❌ **Don't:**
- Use vague titles (e.g., "Do work")
- Create tasks that are too broad
- Overcommit to unrealistic deadlines
- Ignore priority levels

**Examples:**

❌ Bad:
```
Title: Work on project
```

✅ Good:
```
Title: Implement user authentication API
Description: Add login, registration, and password reset endpoints
Priority: High
Due Date: 2026-03-20
```

### Daily Todo Management

**Morning Routine:**
1. Review all active todos
2. Prioritize for the day
3. Focus on high-priority items
4. Start with 3-5 key tasks

**End of Day:**
1. Update completed todos
2. Review progress
3. Plan tomorrow's tasks
4. Adjust priorities if needed

**Weekly Review:**
1. Review all todos (completed and active)
2. Archive completed tasks (optional)
3. Reassess priorities
4. Add new tasks for the week

### Task Breakdown Strategy

When faced with large projects, break them down:

**Project:** Launch new website

**Break into:**
1. Design mockups (High, Due: Mar 18)
2. Write content copy (Medium, Due: Mar 19)
3. Implement frontend (High, Due: Mar 22)
4. Implement backend (High, Due: Mar 22)
5. Test all features (High, Due: Mar 24)
6. Deploy to production (High, Due: Mar 25)

---

## Tips & Tricks

### Keyboard Shortcuts

The frontend supports these keyboard shortcuts:

- **Enter**: Submit form / Create todo
- **Escape**: Close modal / Cancel editing
- **Tab**: Move between form fields

### Bulk Operations

While the current version doesn't support bulk operations, here's a workaround using the API:

**Mark multiple as complete:**
```bash
todos=("id1" "id2" "id3")
for id in "${todos[@]}"; do
  curl -X PATCH http://localhost:3000/api/v1/todos/$id/toggle
done
```

### Using Tags (Description Hack)

Since tags aren't natively supported yet, use the description field:

```
Title: Review code
Description: #frontend #review #urgent
Priority: High
```

Then search for "#frontend" to find all frontend-related tasks.

### Productivity Techniques

**1. Eat the Frog**
- Start with your hardest, highest-priority task first
- Get it out of the way early in the day

**2. 2-Minute Rule**
- If a task takes less than 2 minutes, do it immediately
- Don't add it to your todo list

**3. Time Blocking**
- Allocate specific time blocks for tasks
- Example: 9-10am: Email, 10-12pm: Deep work

**4. Pomodoro Technique**
- Work for 25 minutes, then take a 5-minute break
- After 4 cycles, take a longer break (15-30 minutes)

### Integration Ideas

**Calendar Integration:**
- Export todos with due dates to your calendar
- Use API to sync with Google Calendar, etc.

**Email Integration:**
- Email a task to your app to create todos automatically
- Example: Email subject "Buy groceries" to todo@yourdomain.com

**Notification System:**
- Set up notifications for:
  - Upcoming due dates
  - Overdue tasks
  - Daily task summary

---

## Progress Tracking

### Understanding Stats

The app shows these statistics:

- **Total**: All todos in the list
- **Active**: Incomplete todos
- **Completed**: Finished todos
- **Progress**: Percentage completed

**Example:**
```
Total: 10 | Active: 6 | Completed: 4
Progress: ████░░░░░░ 40%
```

### Productivity Metrics

Track your productivity over time:

**Daily Completion Rate:**
```
(Todos completed today / Total todos started) × 100
```

**Weekly Trends:**
- Compare completion rates week to week
- Identify patterns in your productivity

---

## Advanced Usage

### Using the API Directly

For power users and developers, the API provides full programmatic access:

**Get all todos:**
```bash
curl http://localhost:3000/api/v1/todos
```

**Create todo from command line:**
```bash
todo-cli create "Complete documentation" --priority high --due-date "2026-03-20"
```

**Export todos to CSV:**
```bash
curl -s http://localhost:3000/api/v1/todos | jq -r '.[] | [.title, .completed, .priority] | @csv' > todos.csv
```

### Custom Workflows

**Daily Planning Workflow:**
1. Morning: Fetch active high-priority todos
2. Create daily schedule based on priorities
3. End of day: Update completion status
4. Generate summary report

**Weekly Review Workflow:**
1. Export all todos (completed and active)
2. Analyze completion patterns
3. Archive old completed todos
4. Plan next week's priorities

---

## Troubleshooting

### Common Issues

**"Todo not saving"**
- Check your internet connection
- Verify backend server is running
- Check browser console for errors

**"Can't edit todo"**
- Ensure you're not in read-only mode
- Try refreshing the page
- Check for JavaScript errors in console

**"Todos not appearing"**
- Clear browser cache
- Check if filters are hiding todos
- Verify API is responding: `curl http://localhost:3000/health`

### Getting Help

If you encounter issues:

1. Check the [Setup Guide](SETUP.md) for installation help
2. Review [API Documentation](API.md) for endpoint details
3. Open an issue on GitHub: [github.com/fulanzigler-blip/todo-app](https://github.com/fulanzigler-blip/todo-app/issues)

---

## Security & Privacy

### Data Safety

- Your todos are stored in your own database
- No data is sent to third-party services
- Regular backups are recommended

### Best Practices

- Use strong passwords for your database
- Keep your application updated
- Use HTTPS in production
- Implement authentication for multi-user setups
- Regular database backups

---

## Conclusion

The Todo App is designed to be simple yet powerful. Start with basic task tracking, then gradually adopt more advanced techniques as you become comfortable.

**Remember:**
- Consistency beats intensity
- Regular reviews keep you on track
- Break down complex tasks
- Prioritize what matters most

Happy task management! 🎉

---

## Additional Resources

- [API Documentation](API.md) - Complete API reference
- [Setup Guide](SETUP.md) - Installation and configuration
- [Architecture](ARCHITECTURE.md) - System design details
- [Contribution Guide](CONTRIBUTING.md) - How to contribute
