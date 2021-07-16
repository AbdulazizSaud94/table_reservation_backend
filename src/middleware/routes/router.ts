import express, { Request, Response } from 'express';
import { usersRouter } from './usersRoutes';
import { tableRouter } from './tableRoutes';

export const router = express.Router();

router.use('/users', usersRouter);
router.use('/tables', tableRouter);
