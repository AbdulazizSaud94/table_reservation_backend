import express, { Request, Response } from 'express';
import { usersRouter } from './usersRoutes';

export const router = express.Router();

router.use('/users', usersRouter);

// Get all users
router.get('/', (req: Request, res: Response) => {
  res.status(200);
  res.json({ success: 'Hello World' });
});

// Add new user
router.post('/', (req: Request, res: Response) => {
  res.status(200);
  res.json({ success: 'Hello World' });
});

// Update user given user id
router.put('/:id', (req: Request, res: Response) => {
  res.status(200);
  res.json({ success: 'Hello World' });
});

// Delete user given user id
router.delete('/:id', (req: Request, res: Response) => {
  res.status(200);
  res.json({ success: 'Hello World' });
});
