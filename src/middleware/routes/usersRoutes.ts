import express, { Request, Response } from 'express';
import { Authinticator } from '../../middleware/Authenticator';
import { UserUtil } from '../../utils';
import { UserValidator } from '../../validators';

export const usersRouter = express.Router();
const userUtil: UserUtil = new UserUtil();
const userValidator: UserValidator = new UserValidator();

// Get all users
usersRouter.get('/', Authinticator.adminAuth, async (req: Request, res: Response) => {
  const users = await userUtil.getAllUsers();
  res.status(200);
  res.json(users);
});

// Add new user
usersRouter.post('/', Authinticator.adminAuth, async (req: any, res: Response) => {
  try {
    userValidator.validateUser(req.body.name, req.body.role, req.body.password);
    const newUser = await userUtil.addUser(req.body.name, req.body.password, req.body.role, req.userData.name);
    res.status(200);
    res.json(newUser);
  } catch (error) {
    res.status(400);
    res.json({ error: error.message });
  }
});

// Delete user given user id
usersRouter.delete('/:id', Authinticator.adminAuth, async (req: any, res: Response) => {
  try {
    const deletedUserNumber = await userUtil.deleteUser(parseInt(req.params.id, 10), req.userData.name);
    res.status(200);
    res.json({ success: `User ${deletedUserNumber} deleted` });
  } catch (error) {
    res.status(400);
    res.json({ error: error.message });
  }
});

// User login
usersRouter.post('/login', async (req: Request, res: Response) => {
  try {
    const token = await userUtil.userLogin(req.body.employeeNumber, req.body.password);
    res.status(200);
    res.json({ bearerToken: token });
  } catch (error) {
    res.status(401);
    res.json({ error: 'authentication failed' });
  }
});
