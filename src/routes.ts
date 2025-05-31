import { Router, Request, Response } from 'express';
import {
  getTasks,
  addTask,
  deleteTask,
  updateTaskStatus,
} from './services';

const router = Router();

// Get all tasks
router.get('/tasks', (req: Request, res: Response) => {
  try {
    const tasks = getTasks();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create a new task
router.post('/tasks', (req: Request, res: Response) => {
  try {
    const task = addTask(req.body);
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ error: 'Bad request' });
  }
});

// Delete a task
router.delete('/tasks/:id', (req: Request, res: Response) => {
  try {
    deleteTask(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(404).json({ error: 'Task not found' });
  }
});

// Update task status
router.patch('/tasks/:id', (req: Request, res: Response) => {
  try {
    updateTaskStatus(req.params.id, req.body.status);
    res.status(200).send();
  } catch (error) {
    res.status(404).json({ error: 'Task not found' });
  }
});

export default router;