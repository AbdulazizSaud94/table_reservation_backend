import express, { Request, Response } from 'express';
import { User, UserInterface } from '../../models/User';
import { Sequelize, Op, QueryTypes } from 'sequelize';
import { UserUtil } from '../../utils';

export const usersRouter = express.Router();
const userUtil: UserUtil = new UserUtil();

// Get all users
usersRouter.get('/', async (req: Request, res: Response) => {
  const users = userUtil.getAllUsers();
  res.status(200);
  res.json(users);
});

// Add new user
usersRouter.post('/', (req: Request, res: Response) => {
  const newUser = userUtil.addUser(req.body.name, req.body.password, req.body.role);
  res.status(200);
  res.json(newUser);
});

// Delete user given user id
usersRouter.delete('/:id', (req: Request, res: Response) => {
  res.status(200);
  res.json({ success: 'Hello World' });
});
